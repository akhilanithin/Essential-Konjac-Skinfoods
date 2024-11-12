import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';

import { toDecimal } from '~/utils';

// Define types for props
interface Variant {
    size?: { name: string; size: string };
    color?: { name: string; color: string };
    price: number;
    sale_price?: number;
}

interface ProductData {
    name: string;
    slug: string;
    variants: Variant[];
    stock: number;
}

interface Product {
    data: ProductData;
}

interface Props {
    data: { product: Product };
    toggleWishlist: (product: ProductData) => void;
    addToCart: (item: { name: string; qty: number; price: number }) => void;
    wishlist: ProductData[];
    isSticky?: boolean;
    adClass?: string;
}

const DetailRight: React.FC<Props> = (props) => {
    const router = useRouter();
    const { data, toggleWishlist, addToCart, wishlist, isSticky = false, adClass = '' } = props;
    const [curColor, setCurColor] = useState<string>('null');
    const [curSize, setCurSize] = useState<string>('null');
    const [curIndex, setCurIndex] = useState<number>(0);
    const [cartActive, setCartActive] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const product = data && data.product;

    // Decide if the product is wishlisted
    const isWishlisted = wishlist.findIndex(item => item.slug === product.data.slug) > -1;

    // Initialize colors and sizes arrays
    const colors: Array<{ name: string; value: string }> = [];
    const sizes: Array<{ name: string; value: string }> = [];

    if (product.data && product.data.variants.length > 0) {
        if (product.data.variants[0].size) {
            product.data.variants.forEach(item => {
                if (sizes.findIndex(size => size.name === item.size?.name) === -1) {
                    sizes.push({ name: item.size!.name, value: item.size!.size });
                }
            });
        }

        if (product.data.variants[0].color) {
            product.data.variants.forEach(item => {
                if (colors.findIndex(color => color.name === item.color?.name) === -1) {
                    colors.push({ name: item.color!.name, value: item.color!.color });
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
                    (item.size && item.color && item.color.name === curColor && item.size.name === curSize) ||
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

    const setColorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurColor(e.target.value);
    };

    const setSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurSize(e.target.value);
    };

    const addToCartHandler = () => {
        if (product.data.stock > 0 && cartActive) {
            let tmpName = product.data.name;
            tmpName += curColor !== 'null' ? '-' + curColor : '';
            tmpName += curSize !== 'null' ? '-' + curSize : '';

            let tmpPrice: number;
            if (product.data.variants.length > 0) {
                if (product.data.price[0] === product.data.price[1]) {
                    tmpPrice = product.data.price[0];
                } else {
                    tmpPrice = product.data.variants[curIndex]?.sale_price ?? product.data.variants[curIndex]?.price ?? product.data.price[0];
                }
            } else {
                tmpPrice = product.data.price[0];
            }

            addToCart({ ...product.data, name: tmpName, qty: quantity, price: tmpPrice });
        }
    };

    const resetValueHandler = () => {
        setCurColor('null');
        setCurSize('null');
    };

    const isDisabled = (color: string, size: string) => {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product.data.variants.findIndex(item => item.color?.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product.data.variants.findIndex(item => item.size?.name === curSize) === -1;
        }

        return product.data.variants.findIndex(item => item.color?.name === color && item.size?.name === size) === -1;
    };

    const changeQty = (qty: number) => {
        setQuantity(qty);
    };

    return (
        <div className={`product-details mb-4 ${isSticky ? 'p-sticky' : ''} ${adClass}`}>
            {
                product && product.data.variants.length > 0 ? (
                    <>
                        {
                            product.data.variants[0].color && (
                                <div className='product-form product-variations product-color'>
                                    <label>Color:</label>
                                    <div className='select-box'>
                                        <select name='color' className='form-control select-color' onChange={setColorHandler} value={curColor}>
                                            <option value="null">Choose an option</option>
                                            {
                                                colors.map(item => !isDisabled(item.name, curSize) && (
                                                    <option value={item.name} key={`color-${item.name}`}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        }

                        {
                            product.data.variants[0].size && (
                                <div className='product-form product-variations product-size'>
                                    <label>Size:</label>
                                    <div className='product-form-group'>
                                        <div className='select-box'>
                                            <select name='size' className='form-control select-size' onChange={setSizeHandler} value={curSize}>
                                                <option value="null">Choose an option</option>
                                                {
                                                    sizes.map(item => !isDisabled(curColor, item.name) && (
                                                        <option value={item.name} key={`size-${item.name}`}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <Collapse in={curColor !== 'null' || curSize !== 'null'}>
                                            <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                                                <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            )
                        }

                        <div className='product-variation-price'>
                            <Collapse in={cartActive && curIndex > -1}>
                                <div className="card-wrapper">
                                    {
                                        curIndex > -1 && (
                                            <div className="single-product-price">
                                                {
                                                    product.data.variants[curIndex].price ? (
                                                        product.data.variants[curIndex].sale_price ? (
                                                            <div className="product-price mb-0">
                                                                <ins className="new-price">${toDecimal(product.data.variants[curIndex].sale_price)}</ins>
                                                                <del className="old-price">${toDecimal(product.data.variants[curIndex].price)}</del>
                                                            </div>
                                                        ) : (
                                                            <div className="product-price mb-0">
                                                                <ins className="new-price">${toDecimal(product.data.variants[curIndex].price)}</ins>
                                                            </div>
                                                        )
                                                    ) : ""
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </Collapse>
                        </div>
                    </>
                ) : ''
            }

            <hr className="product-divider" />

            <div className="product-form product-qty pb-0">
                <label className="d-none">QTY:</label>
                <div className="product-form-group">
                    <Quantity max={product.data.stock} product={product} onChangeQty={changeQty} />
                    <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${cartActive ? '' : 'disabled'}`} onClick={addToCartHandler}>
                        <i className='d-icon-bag'></i>Add to Cart
                    </button>
                </div>
            </div>

            <hr className="product-divider mb-3" />

            <div className="product-footer">
                <div className="social-links mr-4">
                    <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                    <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                    {/* <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink> */}
                </div>
                <span className="divider d-lg-show"></span>
                <a href="#" className={`btn-product btn-wishlist`} title={isWishlisted ? 'Browse wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                    <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    {isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'}
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data ? state.wishlist.data : []
});

export default connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart
})(DetailRight);
