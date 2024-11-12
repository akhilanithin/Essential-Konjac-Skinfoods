import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';
import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';
import { toDecimal } from '~/utils';

const SlideToggle = dynamic(() => import('react-slide-toggle').then(module => module.SlideToggle), {
    ssr: false,
});

// Define TypeScript interfaces for props and product structure
interface Variant {
    size?: { name: string; size: string };
    color?: { name: string; color: string };
    price: number;
    sale_price?: number;
}

interface Product {
    name: string;
    sku: string;
    categories: { name: string; slug: string }[];
    price: number[];
    variants: Variant[];
    stock: number;
    ratings: number;
    reviews: number;
    short_description: string;
    pictures: { url: string }[];
}

interface Props {
    product: Product;
    isStickyCart?: boolean;
    adClass?: string;
    isNav?: boolean;
    toggleWishlist: (product: Product) => void;
    addToCart: (item: any) => void;
    wishlist: Array<{ name: string }>;
}

function DetailSeven(props: Props) {
    const { product, isStickyCart = false, adClass = '', toggleWishlist, addToCart, wishlist } = props;
    const [curColor, setCurColor] = useState<string>('null');
    const [curSize, setCurSize] = useState<string>('null');
    const [curIndex, setCurIndex] = useState<number>(0);

    // Check if the product is wishlisted
    const isWishlisted = wishlist.some(item => item.name === product.name);

    // Arrays to hold colors and sizes
    const colors: Array<{ name: string; value: string }> = [];
    const sizes: Array<{ name: string; value: string }> = [];

    if (product && product.variants.length > 0) {
        if (product.variants[0].size) {
            product.variants.forEach(item => {
                if (!sizes.some(size => size.name === item.size?.name)) {
                    sizes.push({ name: item.size!.name, value: item.size!.size });
                }
            });
        }

        if (product.variants[0].color) {
            product.variants.forEach(item => {
                if (!colors.some(color => color.name === item.color?.name)) {
                    colors.push({ name: item.color!.name, value: item.color!.color });
                }
            });
        }
    }

    useEffect(() => {
        const cartButton = document.querySelector('.product-form .btn-cart') as HTMLButtonElement;

        if (cartButton) {
            if (product.variants.length > 0) {
                cartButton.setAttribute('disabled', 'disabled');
            } else {
                cartButton.removeAttribute('disabled');
            }
        }

        return () => {
            resetValueHandler();
        };
    }, [product]);

    useEffect(() => {
        const cartButton = document.querySelector('.product-form .btn-cart') as HTMLButtonElement;

        if (product.variants.length > 0) {
            if ((curSize !== 'null' && curColor !== 'null') || 
                (curSize === 'null' && product.variants[0].size === null && curColor !== 'null') || 
                (curColor === 'null' && product.variants[0].color === null && curSize !== 'null')) {
                cartButton.removeAttribute('disabled');
                setCurIndex(product.variants.findIndex(item => 
                    (item.size !== null && item.color !== null && item.color.name === curColor && item.size.name === curSize) || 
                    (item.size === null && item.color.name === curColor) || 
                    (item.color === null && item.size.name === curSize)
                ));
            } else {
                cartButton.setAttribute('disabled', 'disabled');
            }
        } else {
            cartButton.removeAttribute('disabled');
        }

        if (product.stock === 0) {
            cartButton.setAttribute('disabled', 'disabled');
        }
    }, [curColor, curSize]);

    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (toggleWishlist && !isWishlisted) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.add('load-more-overlay', 'loading');
            toggleWishlist(product);

            setTimeout(() => {
                currentTarget.classList.remove('load-more-overlay', 'loading');
            }, 1000);
        } else {
            // Redirect to wishlist page
            // router.push('/pages/wishlist');
        }
    };

    const setColorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurColor(e.target.value);
    };

    const setSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurSize(e.target.value);
    };

    const addToCartHandler = () => {
        const qty = (document.querySelector('.product-form-group .quantity') as HTMLInputElement).value;

        if (product.variants.length > 0) {
            let tmpName = product.name;
            if (curColor !== 'null') tmpName += '-' + curColor;
            if (curSize !== 'null') tmpName += '-' + curSize;

            const tmpPrice = product.variants[curIndex].sale_price || product.variants[curIndex].price;

            addToCart({ ...product, name: tmpName, qty, price: tmpPrice });
        } else {
            addToCart({ ...product, qty, price: product.price[0] });
        }
    };

    const resetValueHandler = () => {
        setCurColor('null');
        setCurSize('null');

        const colorSelect = document.querySelector('.select-color') as HTMLSelectElement;
        const sizeSelect = document.querySelector('.select-size') as HTMLSelectElement;

        if (colorSelect) colorSelect.value = 'null';
        if (sizeSelect) sizeSelect.value = 'null';
    };

    const isDisabled = (color: string, size: string) => {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return !product.variants.some(item => item.color.name === curColor);
        }

        if (colors.length === 0) {
            return !product.variants.some(item => item.size.name === curSize);
        }

        return !product.variants.some(item => item.color.name === color && item.size.name === size);
    };

    return (
        <div className={`product-details ${adClass}`}>
            <h1 className="product-name">{product.name}</h1>

            <div className='product-meta'>
                SKU: <span className='product-sku'>{product.sku}</span>
                CATEGORIES: <span className='product-brand'>
                    {product.categories.map((item, index) => (
                        <React.Fragment key={`${item.name}-${index}`}>
                            <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                {item.name}
                            </ALink>
                            {index < product.categories.length - 1 ? ', ' : ''}
                        </React.Fragment>
                    ))}
                </span>
            </div>

            <div className="product-price mb-2">
                {product.price[0] !== product.price[1] ? (
                    product.variants.length === 0 || (product.variants.length > 0 && !product.variants[0].price) ? (
                        <>
                            <ins className="new-price">${toDecimal(product.price[0])}</ins>
                            <del className="old-price">${toDecimal(product.price[1])}</del>
                        </>
                    ) : (
                        <del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                    )
                ) : (
                    <ins className="new-price">${toDecimal(product.price[0])}</ins>
                )}
            </div>

            {product.price[0] !== product.price[1] && product.variants.length === 0 && <Countdown type={2} />}

            <div className="ratings-container">
                <div className="ratings-full">
                    <span className="ratings" style={{ width: `${20 * product.ratings}%` }}></span>
                    <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                </div>
                <ALink href="#" className="rating-reviews">( {product.reviews} reviews )</ALink>
            </div>

            <p className="product-short-desc">{product.short_description}</p>

            {product.variants.length > 0 && (
                <>
                    {product.variants[0].color && (
                        <div className='product-form product-variations product-color'>
                            <label>Color:</label>
                            <div className='select-box'>
                                <select name='color' className='form-control select-color' onChange={setColorHandler} defaultValue={curColor}>
                                    <option value="null">Choose an option</option>
                                    {colors.map(item => !isDisabled(item.name, curSize) && (
                                        <option value={item.name} key={`color-${item.name}`}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {product.variants[0].size && (
                        <div className='product-form product-variations product-size mb-0 pb-2'>
                            <label>Size:</label>
                            <div className='product-form-group'>
                                <div className='select-box'>
                                    <select name='size' className='form-control select-size' onChange={setSizeHandler} defaultValue={curSize}>
                                        <option value="null">Choose an option</option>
                                        {sizes.map(item => !isDisabled(curColor, item.name) && (
                                            <option value={item.name} key={`size-${item.name}`}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <SlideToggle collapsed={curColor === 'null' || curSize === 'null'}>
                                    {({ onToggle, setCollapsibleElement, toggleState }) => (
                                        <>
                                            <button onClick={onToggle} className='show-reset-button d-none'>Click</button>
                                            <div ref={setCollapsibleElement} className={`overflow-hidden reset-value-button w-100 mb-0 ${toggleState}`}>
                                                <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                            </div>
                                        </>
                                    )}
                                </SlideToggle>
                            </div>
                        </div>
                    )}

                    <div className='product-variation-price'>
                        <SlideToggle collapsed={curColor === 'null' || curSize === 'null'}>
                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                <>
                                    <button onClick={onToggle} className='show-price d-none'>Click</button>
                                    <div ref={setCollapsibleElement} className={`overflow-hidden single-product-price ${toggleState}`}>
                                        {product.variants[curIndex].price && (
                                            product.variants[curIndex].sale_price ? (
                                                <div className="product-price mb-0">
                                                    <ins className="new-price">${toDecimal(product.variants[curIndex].sale_price)}</ins>
                                                    <del className="old-price">${toDecimal(product.variants[curIndex].price)}</del>
                                                </div>
                                            ) : (
                                                <div className="product-price mb-0">
                                                    <ins className="new-price">${toDecimal(product.variants[curIndex].price)}</ins>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </SlideToggle>
                    </div>
                </>
            )}

            <hr className="product-divider" />

            {isStickyCart ? (
                <div className="sticky-content fix-top product-sticky-content">
                    <div className="container">
                        <div className="sticky-product-details">
                            <figure className="product-image">
                                <ALink href={`/product/default/${product.slug}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[0].url}`} width="90" height="90" alt="Product" />
                                </ALink>
                            </figure>
                            <div>
                                <h4 className="product-title">
                                    <ALink href={`/product/default/${product.slug}`}>{product.name}</ALink>
                                </h4>
                                <div className="product-info">
                                    <div className="product-price mb-0">
                                        {product.price[0] !== product.price[1] ? (
                                            product.variants.length === 0 ? (
                                                <>
                                                    <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                                    <del className="old-price">${toDecimal(product.price[1])}</del>
                                                </>
                                            ) : (
                                                <del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                                            )
                                        ) : (
                                            <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                        )}
                                    </div>
                                    <div className="ratings-container mb-0">
                                        <div className="ratings-full">
                                            <span className="ratings" style={{ width: `${20 * product.ratings}%` }}></span>
                                            <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                                        </div>
                                        <ALink href="#" className="rating-reviews">( {product.reviews} reviews )</ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-form product-qty pb-0">
                            <label className="d-none">QTY:</label>
                            <div className="product-form-group">
                                <Quantity max={product.stock} product={product} />
                                <button className='btn-product btn-cart text-normal ls-normal font-weight-semi-bold' onClick={addToCartHandler}>
                                    <i className='d-icon-bag'></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="product-form product-qty pb-0">
                    <label className="d-none">QTY:</label>
                    <div className="product-form-group">
                        <Quantity max={product.stock} product={product} />
                        <button className='btn-product btn-cart text-normal ls-normal font-weight-semi-bold' onClick={addToCartHandler}>
                            <i className='d-icon-bag'></i>Add to Cart
                        </button>
                    </div>
                </div>
            )}

            <hr className="product-divider mb-3" />

            <div className="product-footer">
                <div className="social-links mr-4">
                    <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                    <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                    {/* <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink> */}
                </div>
                <span className="divider d-lg-show"></span>
                <a href="#" className={`btn-product btn-wishlist`} title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                    <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    {isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'}
                </a>
            </div>
        </div>
    );
}

function mapStateToProps(state: any) {
    return {
        wishlist: state.wishlist.data || []
    };
}

export default connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart
})(DetailSeven);
