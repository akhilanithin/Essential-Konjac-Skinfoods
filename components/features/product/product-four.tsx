import { useEffect } from 'react';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect, ConnectedProps } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

import { toDecimal } from '~/utils';

interface Product {
    slug: string;
    name: string;
    pictures: { url: string }[];
    price: number[];
    categories: { name: string; slug: string }[];
    ratings: number;
    reviews: number;
    is_new?: boolean;
    is_top?: boolean;
    discount?: number;
    variants: { price?: number }[];
}

interface ProductFourProps {
    product: Product;
    adClass?: string;
    toggleWishlist?: (product: Product) => void;
    wishlist: Product[];
    addToCart: (product: Product) => void;
    openQuickview: (slug: string) => void;
}

const ProductFour: React.FC<ProductFourProps> = (props) => {
    const { product, adClass, toggleWishlist, wishlist, addToCart, openQuickview } = props;

    // Decide if the product is wishlisted
    const isWishlisted = wishlist.some(item => item.slug === product.slug);

    useEffect(() => {
        const items = document.querySelectorAll('.product-slideup-content');

        const mouseOverHandler = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            const height = target.querySelector('.product-hide-details')!.offsetHeight;
            target.querySelector('.product-details')!.setAttribute('style', `transform: translateY(-${height}px)`);
            target.querySelector('.product-hide-details')!.setAttribute('style', `transform: translateY(-${height}px)`);
        };

        const mouseLeaveHandler = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            target.querySelector('.product-details')!.setAttribute('style', '');
            target.querySelector('.product-hide-details')!.setAttribute('style', '');
        };

        items.forEach(item => {
            item.addEventListener('mouseenter', mouseOverHandler, false);
            item.addEventListener('touchstart', mouseOverHandler, false);
            item.addEventListener('mouseleave', mouseLeaveHandler, false);
            item.addEventListener('touchleave', mouseLeaveHandler, false);
        });

        return () => {
            items.forEach(item => {
                item.removeEventListener('mouseenter', mouseOverHandler);
                item.removeEventListener('touchstart', mouseOverHandler);
                item.removeEventListener('mouseleave', mouseLeaveHandler);
                item.removeEventListener('touchleave', mouseLeaveHandler);
            });
        };
    }, []);

    const showQuickviewHandler = () => {
        openQuickview(product.slug);
    };

    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (toggleWishlist) {
            toggleWishlist(product);
        }

        const currentTarget = e.currentTarget;
        currentTarget.classList.add('load-more-overlay', 'loading');

        setTimeout(() => {
            currentTarget.classList.remove('load-more-overlay', 'loading');
        }, 1000);
    };

    const addToCartHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: product.price[0] });
    };

    return (
        <div className={`product product-slideup-content text-center ${adClass} ${product.variants.length > 0 ? 'product-variable' : ''}`}>
            <figure className="product-media">
                <ALink href={`/product/default/${product.slug}`}>
                    <LazyLoadImage
                        alt="product"
                        src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[0].url}`}
                        threshold={500}
                        effect="opacity"
                        width="300"
                        height="338"
                    />
                    {product.pictures.length >= 2 && (
                        <LazyLoadImage
                            alt="product"
                            src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[1].url}`}
                            threshold={500}
                            width="300"
                            height="338"
                            effect="opacity"
                            wrapperClassName="product-image-hover"
                        />
                    )}
                </ALink>

                <div className="product-label-group">
                    {product.is_new && <label className="product-label label-new">New</label>}
                    {product.is_top && <label className="product-label label-top">Top</label>}
                    {product.discount > 0 && (
                        <label className="product-label label-sale">
                            {product.variants.length === 0 ? `${product.discount}% OFF` : 'Sale'}
                        </label>
                    )}
                </div>
            </figure>

            <div className="product-details">
                <div className="product-cat">
                    {product.categories?.map((item, index) => (
                        <React.Fragment key={`${item.name}-${index}`}>
                            <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                {item.name}
                                {index < product.categories.length - 1 ? ', ' : ''}
                            </ALink>
                        </React.Fragment>
                    ))}
                </div>

                <h3 className="product-name">
                    <ALink href={`/product/default/${product.slug}`}>{product.name}</ALink>
                </h3>

                <div className="product-price">
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
            </div>

            <div className="product-hide-details">
                <div className="ratings-container">
                    <div className="ratings-full">
                        <span className="ratings" style={{ width: 20 * product.ratings + '%' }}></span>
                        <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                    </div>

                    <ALink href={`/product/default/${product.slug}`} className="rating-reviews">
                        ( {product.reviews} reviews )
                    </ALink>
                </div>

                <div className="product-action">
                    <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={wishlistHandler}
                    >
                        <i className={isWishlisted ? 'd-icon-heart-full' : 'd-icon-heart'}></i>
                    </a>
                    {product.variants.length > 0 ? (
                        <ALink href={`/product/default/${product.slug}`} className="btn-product btn-cart" title="Go to product">
                            <span>Select Options</span>
                        </ALink>
                    ) : (
                        <a href="#" className="btn-product btn-cart" title="Add to cart" onClick={addToCartHandler}>
                            <i className="d-icon-bag"></i>
                            <span>Add to cart</span>
                        </a>
                    )}
                    <ALink href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={showQuickviewHandler}>
                        <i className="d-icon-search"></i>
                    </ALink>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || [],
});

const connector = connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart,
    ...modalActions,
});

export default connector(ProductFour);
