import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Collapse from 'react-bootstrap/Collapse';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

// Define the structure of product data
interface ProductVariant {
    size?: { name: string; size: string };
    color?: { name: string; color: string };
    price?: number;
    sale_price?: number;
}

interface Category {
    name: string;
    slug: string;
}

interface ProductData {
    name: string;
    sku: string;
    categories: Category[];
    price: number[];
    stock: number;
    ratings: number;
    reviews: number;
    short_description: string;
    variants: ProductVariant[];
}

interface Product {
    data: ProductData;
}

interface Props {
    data: { product: Product };
    isSticky?: boolean;
    isDesc?: boolean;
    toggleWishlist: (product: ProductData) => void;
    addToCart: (item: any) => void;
    wishlist: { slug: string }[];
}

const DetailFour: React.FC<Props> = (props) => {
    const router = useRouter();
    const { data, isSticky = false, isDesc = false } = props;
    const { toggleWishlist, addToCart, wishlist } = props;

    const [curColor, setCurColor] = useState<string | null>('null');
    const [curSize, setCurSize] = useState<string | null>('null');
    const [curIndex, setCurIndex] = useState<number>(0);
    const [cartActive, setCartActive] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const product = data && data.product;

    // Decide if the product is wishlisted
    const isWishlisted = wishlist.findIndex(item => item.slug === product.data.slug) > -1;

    const colors: { name: string; value: string }[] = [];
    const sizes: { name: string; value: string }[] = [];

    if (product.data && product.data.variants.length > 0) {
        if (product.data.variants[0].size) {
            product.data.variants.forEach(item => {
                if (sizes.findIndex(size => size.name === item.size.name) === -1) {
                    sizes.push({ name: item.size.name, value: item.size.size });
                }
            });
        }

        if (product.data.variants[0].color) {
            product.data.variants.forEach(item => {
                if (colors.findIndex(color => color.name === item.color.name) === -1) {
                    colors.push({ name: item.color.name, value: item.color.color });
                }
            });
        }
    }

    useEffect(() => {
        setCurIndex(-1);
        resetValueHandler();
    }, [product]);

    useEffect(() => {
        if (product.data.variants.length > 0) {
            if (
                (curSize !== 'null' && curColor !== 'null') ||
                (curSize === 'null' && product.data.variants[0].size === null && curColor !== 'null') ||
                (curColor === 'null' && product.data.variants[0].color === null && curSize !== 'null')
            ) {
                setCartActive(true);
                setCurIndex(product.data.variants.findIndex(item =>
                    (item.size !== null && item.color !== null && item.color.name === curColor && item.size.name === curSize) ||
                    (item.size === null && item.color.name === curColor) ||
                    (item.color === null && item.size.name === curSize)
                ));
            } else {
                setCartActive(false);
            }
        } else {
            setCartActive(true);
        }

        if (product.stock === 0) {
            setCartActive(false);
        }
    }, [curColor, curSize, product]);

    const wishlistHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        if (toggleWishlist && !isWishlisted) {
            const currentTarget = e.currentTarget as HTMLAnchorElement;
            currentTarget.classList.add('load-more-overlay', 'loading');
            toggleWishlist(product.data);

            setTimeout(() => {
                currentTarget.classList.remove('load-more-overlay', 'loading');
            }, 1000);
        } else {
            router.push('/pages/wishlist');
        }
    };

    const toggleColorHandler = (color: { name: string; value: string }) => {
        if (!isDisabled(color.name, curSize)) {
            setCurColor(curColor === color.name ? 'null' : color.name);
        }
    };

    const toggleSizeHandler = (size: { name: string; value: string }) => {
        if (!isDisabled(curColor, size.name)) {
            setCurSize(curSize === size.name ? 'null' : size.name);
        }
    };

    const addToCartHandler = () => {
        if (product.data.stock > 0 && cartActive) {
            let tmpName = product.data.name;
            tmpName += curColor !== 'null' ? `-${curColor}` : '';
            tmpName += curSize !== 'null' ? `-${curSize}` : '';

            let tmpPrice: number;
            if (product.data.price[0] === product.data.price[1]) {
                tmpPrice = product.data.price[0];
            } else if (!product.data.variants[0].price && product.data.discount > 0) {
                tmpPrice = product.data.price[0];
            } else {
                tmpPrice = product.data.variants[curIndex]?.sale_price || product.data.variants[curIndex]?.price || product.data.price[0];
            }

            addToCart({ ...product.data, name: tmpName, qty: quantity, price: tmpPrice });
        } else {
            addToCart({ ...product.data, qty: quantity, price: product.data.price[0] });
        }
    };

    const resetValueHandler = () => {
        setCurColor('null');
        setCurSize('null');
    };

    function isDisabled(color: string | null, size: string | null) {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product.data.variants.findIndex(item => item.color?.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product.data.variants.findIndex(item => item.size?.name === curSize) === -1;
        }

        return product.data.variants.findIndex(item => item.color?.name === color && item.size?.name === size) === -1;
    }

    function changeQty(qty: number) {
        setQuantity(qty);
    }

    return (
        <div className="product-details row pl-0">
            <div className="col-md-6">
                <h2 className="product-name mt-3">{product.data.name}</h2>

                <div className='product-meta'>
                    SKU: <span className='product-sku'>{product.data.sku}</span>
                    CATEGORIES: <span className='product-brand'>
                        {product.data.categories.map((item, index) =>
                            <React.Fragment key={item.name + '-' + index}>
                                <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                    {item.name}
                                </ALink>
                                {index < product.data.categories.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        )}
                    </span>
                </div>

                <div className="ratings-container">
                    <div className="ratings-full">
                        <span className="ratings" style={{ width: 20 * product.data.ratings + '%' }}></span>
                        <span className="tooltiptext tooltip-top">{toDecimal(product.data.ratings)}</span>
                    </div>

                    <ALink href="#" className="rating-reviews">( {product.data.reviews} reviews )</ALink>
                </div>

                <p className="product-short-desc">{product.data.short_description}</p>

                <ul className="product-status mt-4 mb-4 list-type-check list-style-none pl-0">
                    <li>Praesent id enim sit amet.</li>
                    <li>Tdio vulputate eleifend in in tortor. ellus massa.Dristique sitiismonec.</li>
                    <li>Massa ristique sit amet condim vel, facilisis quimequistiqutiqu amet condim.</li>
                </ul>
            </div>

            <div className="col-md-6 pl-2">
                <div className="product-price">
                    {product.data.price[0] !== product.data.price[1] ?
                        product.data.variants.length === 0 || (product.data.variants.length > 0 && !product.data.variants[0].price) ?
                            <>
                                <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                                <del className="old-price">${toDecimal(product.data.price[1])}</del>
                            </>
                            :
                            <del className="new-price">${toDecimal(product.data.price[0])} – ${toDecimal(product.data.price[1])}</del>
                        : <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                    }
                </div>

                {product.data.price[0] !== product.data.price[1] && product.data.variants.length === 0 ? <Countdown type={2} /> : ''}

                {product && product.data.variants.length > 0 ? (
                    <>
                        {product.data.variants[0].color && (
                            <div className='product-form product-color'>
                                <label>Color:</label>
                                <div className="product-variations">
                                    {colors.map(item =>
                                        <ALink href="#" className={`color ${curColor === item.name ? 'active' : ''} ${isDisabled(item.name, curSize) ? 'disabled' : ''}`} key={"color-" + item.name} style={{ backgroundColor: `${item.value}` }} onClick={(e) => toggleColorHandler(item)}></ALink>
                                    )}
                                </div>
                            </div>
                        )}

                        {product.data.variants[0].size && (
                            <div className='product-form product-size'>
                                <label>Size:</label>
                                <div className="product-form-group">
                                    <div className="product-variations">
                                        {sizes.map(item =>
                                            <ALink href="#" className={`size ${curSize === item.name ? 'active' : ''} ${isDisabled(curColor, item.name) ? 'disabled' : ''}`} key={"size-" + item.name} onClick={(e) => toggleSizeHandler(item)}>{item.value}</ALink>
                                        )}
                                    </div>

                                    <Collapse in={curColor !== 'null' || curSize !== 'null'}>
                                        <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                                            <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        )}

                        <div className='product-variation-price'>
                            <Collapse in={cartActive && curIndex > -1}>
                                <div className="card-wrapper">
                                    {curIndex > -1 && (
                                        <div className="single-product-price">
                                            {product.data.variants[curIndex]?.price && (
                                                <>
                                                    <ins className="new-price">${toDecimal(product.data.variants[curIndex].sale_price)}</ins>
                                                    <del className="old-price">${toDecimal(product.data.variants[curIndex].price)}</del>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Collapse>
                        </div>

                    </>
                ) : ''}
                
                <hr className="product-divider" />

                <div className="product-form product-qty">
                    <label className="d-none">QTY:</label>
                    <div className="product-form-group mr-2">
                        <Quantity max={product.data.stock} product={product} onChangeQty={changeQty} />
                        <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${cartActive ? '' : 'disabled'}`} onClick={addToCartHandler}><i className='d-icon-bag'></i>Add to Cart</button>
                    </div>
                </div>

                <hr className="product-divider mb-3" />

                <div className="product-footer">
                    <div className="social-links mr-4">
                        <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                        <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                        {/* <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink> */}
                    </div>

                    <div className="product-action">
                        <a href="#" className={`btn-product btn-wishlist mr-6`} title={isWishlisted ? 'Browse wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                            <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                            {isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data ? state.wishlist.data : []
});

export default connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart,
})(DetailFour);
