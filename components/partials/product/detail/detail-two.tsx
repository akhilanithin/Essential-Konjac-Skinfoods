import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';

import ProductNav from '~/components/partials/product/product-nav';
import DescTwo from '~/components/partials/product/desc/desc-two';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

interface Variant {
    color: { name: string; color: string } | null;
    size: { name: string; size: string } | null;
    price?: number;
    sale_price?: number;
}

interface Product {
    data: {
        slug: string;
        name: string;
        sku: string;
        categories: { name: string; slug: string }[];
        price: number[];
        stock: number;
        ratings: number;
        reviews: number;
        short_description: string;
        variants: Variant[];
        discount: number;
    };
}

interface Props {
    data: { product: Product };
    isSticky?: boolean;
    isDesc?: boolean;
    adClass?: string;
    toggleWishlist: (product: Product) => void;
    addToCart: (item: any) => void;
    wishlist: any[];
}

const DetailOne: React.FC<Props> = (props) => {
    const router = useRouter();
    const { data, isSticky = false, isDesc = false, adClass = '' } = props;
    const { toggleWishlist, addToCart, wishlist } = props;

    const [curColor, setCurColor] = useState<string>('null');
    const [curSize, setCurSize] = useState<string>('null');
    const [curIndex, setCurIndex] = useState<number>(0);
    const product = data?.product;

    // Decide if the product is wishlisted
    const isWishlisted = wishlist.some(item => item.slug === product.data.slug);
    const colors: { name: string; value: string }[] = [];
    const sizes: { name: string; value: string }[] = [];

    if (product.data && product.data.variants.length > 0) {
        if (product.data.variants[0].size) {
            product.data.variants.forEach(item => {
                if (!sizes.some(size => size.name === item.size.name)) {
                    sizes.push({ name: item.size.name, value: item.size.size });
                }
            });
        }

        if (product.data.variants[0].color) {
            product.data.variants.forEach(item => {
                if (!colors.some(color => color.name === item.color.name)) {
                    colors.push({ name: item.color.name, value: item.color.color });
                }
            });
        }
    }

    useEffect(() => {
        const btnCart = document.querySelector('.product-form .btn-cart') as HTMLButtonElement;
        if (btnCart) {
            if (product.data.variants.length > 0) {
                btnCart.setAttribute('disabled', 'disabled');
            } else {
                btnCart.removeAttribute('disabled');
            }
        }

        return () => {
            resetValueHandler();

            const resetButton = document.querySelector('.reset-value-button') as HTMLElement;
            if (resetButton) resetButton.style.display = "none";

            const priceElement = document.querySelector('.single-product-price') as HTMLElement;
            if (priceElement) priceElement.style.display = "none";
        };
    }, [product]);

    useEffect(() => {
        const btnCart = document.querySelector('.product-form .btn-cart') as HTMLButtonElement;
        if (product.data.variants.length > 0) {
            if ((curSize !== 'null' && curColor !== 'null') || (curSize === 'null' && !product.data.variants[0].size && curColor !== 'null') || (curColor === 'null' && !product.data.variants[0].color && curSize !== 'null')) {
                btnCart.removeAttribute('disabled');

                const priceElement = document.querySelector('.single-product-price') as HTMLElement;
                if (priceElement && priceElement.classList.contains('COLLAPSED')) {
                    document.querySelector('.show-price')?.click();
                }

                setCurIndex(product.data.variants.findIndex(item => 
                    (item.size !== null && item.color !== null && item.color.name === curColor && item.size.name === curSize) || 
                    (item.size === null && item.color.name === curColor) || 
                    (item.color === null && item.size.name === curSize)
                ));
            } else {
                btnCart.setAttribute('disabled', 'disabled');

                const priceElement = document.querySelector('.single-product-price') as HTMLElement;
                if (priceElement && priceElement.classList.contains('EXPANDED')) {
                    document.querySelector('.show-price')?.click();
                }
            }

            if (curSize !== 'null' || curColor !== 'null') {
                const resetButton = document.querySelector('.reset-value-button') as HTMLElement;
                if (resetButton && resetButton.classList.contains('COLLAPSED')) {
                    document.querySelector('.show-reset-button')?.click();
                }
            } else {
                const resetButton = document.querySelector('.reset-value-button') as HTMLElement;
                if (resetButton && resetButton.classList.contains('EXPANDED')) {
                    document.querySelector('.show-reset-button')?.click();
                }
            }
        } else {
            btnCart.removeAttribute('disabled');
        }

        if (product.stock === 0) {
            btnCart.setAttribute('disabled', 'disabled');
        }
    }, [curColor, curSize]);

    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (toggleWishlist && !isWishlisted) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.add('load-more-overlay', 'loading');
            toggleWishlist(product.data);

            setTimeout(() => {
                currentTarget.classList.remove('load-more-overlay', 'loading');
            }, 1000);
        } else {
            router.push('/pages/wishlist');
        }
    };

    const toggleColorHandler = (color: { name: string }) => {
        if (!isDisabled(color.name, curSize)) {
            setCurColor(curColor === color.name ? 'null' : color.name);
        }
    };

    const toggleSizeHandler = (size: { name: string }) => {
        if (!isDisabled(curColor, size.name)) {
            setCurSize(curSize === size.name ? 'null' : size.name);
        }
    };

    const addToCartHandler = () => {
        if (product.data.stock > 0) {
            const qty = (document.querySelector('.product-form-group .quantity') as HTMLInputElement).value;

            if (product.data.variants.length > 0) {
                let tmpName = product.data.name;
                if (curColor !== 'null') tmpName += '-' + curColor;
                if (curSize !== 'null') tmpName += '-' + curSize;

                const tmpPrice = product.data.variants[curIndex]?.sale_price || product.data.variants[curIndex]?.price || product.data.price[0];

                addToCart({ ...product.data, name: tmpName, qty, price: tmpPrice });
            } else {
                addToCart({ ...product.data, qty, price: product.data.price[0] });
            }
        }
    };

    const resetValueHandler = () => {
        setCurColor('null');
        setCurSize('null');
    };

    function isDisabled(color: string, size: string): boolean {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product.data.variants.findIndex(item => item.color.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product.data.variants.findIndex(item => item.size.name === curSize) === -1;
        }

        return product.data.variants.findIndex(item => item.color.name === color && item.size.name === size) === -1;
    }

    return (
        <div className={`product-details ${isSticky ? 'sticky' : ''} ${adClass}`}>
            <div className="product-navigation">
                <ul className="breadcrumb breadcrumb-lg">
                    <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                    <li><ALink href="#" className="active">Products</ALink></li>
                    <li>Detail</li>
                </ul>

                <ProductNav product={product} />
            </div>

            <h2 className="product-name">{product.data.name}</h2>

            <div className='product-meta'>
                SKU: <span className='product-sku'>{product.data.sku}</span>
                CATEGORIES: <span className='product-brand'>
                    {
                        product.data.categories.map((item, index) => (
                            <React.Fragment key={`${item.name}-${index}`}>
                                <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                    {item.name}
                                </ALink>
                                {index < product.data.categories.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))
                    }
                </span>
            </div>

            <div className="product-price">
                {
                    product.data.price[0] !== product.data.price[1] ?
                        product.data.variants.length === 0 || (product.data.variants.length > 0 && !product.data.variants[0].price) ? (
                            <>
                                <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                                <del className="old-price">${toDecimal(product.data.price[1])}</del>
                            </>
                        ) : (
                            <del className="new-price">${toDecimal(product.data.price[0])} – ${toDecimal(product.data.price[1])}</del>
                        ) :
                        <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                }
            </div>

            {product.data.price[0] !== product.data.price[1] && product.data.variants.length === 0 && <Countdown type={2} />}

            <div className="ratings-container">
                <div className="ratings-full">
                    <span className="ratings" style={{ width: 20 * product.data.ratings + '%' }}></span>
                    <span className="tooltiptext tooltip-top">{toDecimal(product.data.ratings)}</span>
                </div>

                <ALink href="#" className="rating-reviews">( {product.data.reviews} reviews )</ALink>
            </div>

            <p className="product-short-desc">{product.data.short_description}</p>

            {product && product.data.variants.length > 0 && (
                <>
                    {product.data.variants[0].color && (
                        <div className='product-form product-color'>
                            <label>Color:</label>

                            <div className="product-variations">
                                {colors.map(item => (
                                    <ALink
                                        href="#"
                                        className={`color ${curColor === item.name ? 'active' : ''} ${isDisabled(item.name, curSize) ? 'disabled' : ''}`}
                                        key={`color-${item.name}`}
                                        style={{ backgroundColor: item.value }}
                                        onClick={(e) => toggleColorHandler(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {product.data.variants[0].size && (
                        <div className='product-form product-size'>
                            <label>Size:</label>

                            <div className="product-form-group">
                                <div className="product-variations">
                                    {sizes.map(item => (
                                        <ALink
                                            href="#"
                                            className={`size ${curSize === item.name ? 'active' : ''} ${isDisabled(curColor, item.name) ? 'disabled' : ''}`}
                                            key={`size-${item.name}`}
                                            onClick={(e) => toggleSizeHandler(item)}
                                        >
                                            {item.value}
                                        </ALink>
                                    ))}
                                </div>

                                {/* SlideToggle logic can be extracted to a separate component */}
                                <div>
                                    {/* Implement SlideToggle here */}
                                    <button onClick={() => resetValueHandler()} className='show-reset-button d-none'>Click</button>
                                    <div className={`overflow-hidden reset-value-button w-100`}>
                                        <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='product-variation-price'>
                        {/* SlideToggle logic can be extracted to a separate component */}
                        <div>
                            {/* Implement SlideToggle here */}
                            <button className='show-price d-none'>Click</button>
                            <div className={`overflow-hidden single-product-price`}>
                                {product.data.variants[curIndex]?.price ? (
                                    product.data.variants[curIndex]?.sale_price ? (
                                        <div className="product-price">
                                            <ins className="new-price">${toDecimal(product.data.variants[curIndex].sale_price)}</ins>
                                            <del className="old-price">${toDecimal(product.data.variants[curIndex].price)}</del>
                                        </div>
                                    ) : (
                                        <div className="product-price">
                                            <ins className="new-price">${toDecimal(product.data.variants[curIndex].price)}</ins>
                                        </div>
                                    )
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </>
            )}

            <hr className="product-divider" />

            <div className="product-form product-qty pb-0">
                <label className="d-none">QTY:</label>
                <div className="product-form-group">
                    <Quantity max={product.data.stock} product={product} />
                    <button className='btn-product btn-cart text-normal ls-normal font-weight-semi-bold' onClick={addToCartHandler}>
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

            {isDesc && <DescTwo product={product.data} adClass={adClass} />}
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || []
});

export default connect(mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart })(DetailOne);
