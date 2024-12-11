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
    short_description: string;
    is_new?: boolean;
    is_top?: boolean;
    discount?: number;
    variants: { price?: number }[];
}

interface ProductEightProps {
    product: Product;
    adClass?: string;
    toggleWishlist?: (product: Product) => void;
    wishlist: Product[];
    addToCart: (product: Product) => void;
    openQuickview: (slug: string) => void;
}

const ProductEight: React.FC<ProductEightProps> = (props) => {
    const { product, adClass, toggleWishlist, wishlist, addToCart, openQuickview } = props;

    // decide if the product is wishlisted
    const isWishlisted = wishlist.some(item => item.slug === product.slug);

    const showQuickviewHandler = () => {
        openQuickview(product?.id);
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


    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;


    const variations = Array.isArray(product?.variation) ? product?.variation : [product?.variation];
    const discounts = variations.flatMap(variation => variation?.offers || []);
    const discount = discounts?.length > 0 ? discounts[0] : null;
    const discountValue = discount ? discount?.discount : 0;

    const discountPrice = discount ? discount.price : null;
    const basePrice = variations[0]?.price || 0;
    const showDiscountedPrice = discountPrice && discountPrice < basePrice;




    const categories = Array.isArray(product.category) ? product.category : [product.category];
    

    const review = Array.isArray(product.review) ? product.review : [product.review];


// console.log(product);

    
    const calculateAverageRating = () => {
        const reviews = Array.isArray(product.review) ? product.review : [product.review];
        const totalRating = reviews.reduce((sum, review) => sum + (review?.star || 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();


    return (
        <div className={`product product-list ${adClass} ${product?.variation?.length > 0 ? 'product-variable' : ''}`}>


{/* Figure */}

            <figure className="product-media">
                <ALink href={`/product/${product?.id}`}>
                    <LazyLoadImage
                        alt="product"
                        src={`${PRODUCT_IMAGE_BASEURL}/products/${product?.image}`}
                        threshold={500}
                        effect="opacity"
                        width="300"
                        height="338"
                    />

                    {/* {product.pictures.length >= 2 && (
                        <LazyLoadImage
                            alt="product"
                            src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[1].url}`}
                            threshold={500}
                            width="300"
                            height="338"
                            effect="opacity"
                            wrapperClassName="product-image-hover"
                        />
                    )} */}


                </ALink>

                <div className="product-label-group">
                    {product?.fresharrival === 0 && <label className="product-label label-new">New</label>}
                    {/* {product.is_top && <label className="product-label label-top">Top</label>} */}

                    {discountValue > 0 && (
                        variations.length === 0
                            ? <label className="product-label label-sale">{discountValue}% OFF</label>
                            : <label className="product-label label-sale">Sale</label>
                    )}
                </div>


            </figure>



            <div className="product-details">

                <div className="product-cat">
                {categories?.map((item, index) => (
                            <React.Fragment key={index}>
                                <ALink href={{ pathname: '/shop', query: { category: item?.name.toLowerCase().replace(/\s+/g, '-') } }}>
                                    {item?.name}
                                </ALink>
                            </React.Fragment>
                        ))}
                </div>

                <h3 className="product-name">
                    <ALink href={`/product/${product?.id}`}>{product?.name}</ALink>
                </h3>

                <div className="product-price">
                {showDiscountedPrice ? (
                        <>
                            <del className="old-price"> AED {toDecimal(basePrice)}</del>
                            <ins className="new-price"> AED {toDecimal(discountPrice)}</ins>
                        </>
                    ) : (
                        <ins className="new-price">AED {toDecimal(basePrice)}</ins>
                    )}
                </div>

                <div className="ratings-container">
                <div className="ratings-full">
                        {review.length > 0 && (
                            <span className="ratings" style={{ width: `${20 * averageRating}%` }}></span>
                        )}
                        {/* <span className="tooltiptext tooltip-top">{averageRating.toFixed(1)}</span> */}

                             <span className="tooltiptext tooltip-top"> {averageRating ? toDecimal(averageRating) : 0}</span>
                    </div>
                    
                    {/* {review?.length > 0 && (
                        <ALink href={`/product/${product?.id}`} className="rating-reviews">
                            ({review?.length} {review.length > 1 ? '' : ''})
                        </ALink>
                    )} */}
                </div>

                <p className="product-short-desc">{product?.description}</p>

                <div className="product-action">
                    {product?.variation?.length > 0 ? (
                        <ALink href={`/product/${product?.id}`} className="btn-product btn-cart" title="Go to product">
                            <span>Select Options</span>
                        </ALink>
                    ) : (
                        <a href="#" className="btn-product btn-cart" title="Add to cart" onClick={addToCartHandler}>
                            <i className="d-icon-bag"></i>
                            <span>Add to cart</span>
                        </a>
                    )}
                    <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={wishlistHandler}
                    >
                        <i className={isWishlisted ? 'd-icon-heart-full' : 'd-icon-heart'}></i>
                    </a>

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

export default connector(ProductEight);
