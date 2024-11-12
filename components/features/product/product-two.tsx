import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect, ConnectedProps } from 'react-redux';

import ALink from '~/components/features/custom-link';
import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { toDecimal } from '~/utils';

interface Product {
    id: string;
    name: string;
    image: string;
    category: { name: string }[] | { name: string };
    variation: {
        price: number;
        offers: { discount: number; price: number }[];
    }[];
    fresharrival?: number;
    review?: { star: number }[];
}

interface Props {
    product: Product;
    adClass?: string;
    toggleWishlist?: (product: Product) => void;
    wishlist: Product[];
    addToCart: (product: Product & { qty: number; price: number }) => void;
    openQuickview: (id: string) => void;
    isCategory?: boolean;
}

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || []
});

const connector = connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart,
    ...modalActions
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const ProductTwo: React.FC<Props & PropsFromRedux> = (props) => {
    const { product, adClass = 'text-center', toggleWishlist, wishlist, addToCart, openQuickview, isCategory = true } = props;


    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    const getPrice = () => {
        // Check if product has variations
        if (product.variation && product.variation.length > 0) {
            const variation = product.variation[0];
            // Check if the variation has offers
            if (variation.offers && variation.offers.length > 0) {
                return variation.offers[0].price;
            }
            return variation.price;
        }
        return 0; // or another default value
    };

    const categories = Array.isArray(product.category) ? product.category : [product.category];

    const isWishlisted = wishlist.some(item => item?.id === product.id);

    const showQuickviewHandler = () => {
        openQuickview( product?.id );
    }


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
        addToCart({ ...product, qty: 1, price: getPrice() });
    };


    // Calculate the average star rating
    const averageStarRating = () => {
        const ratings = Array.isArray(product.review) ? product.review : [product.review];
        const totalStars = ratings.reduce((sum, review) => sum + (review.star || 0), 0);
        return (totalStars / ratings.length).toFixed(2);
    };

    
    const variations = Array.isArray(product?.variation) ? product?.variation : [product?.variation];
    const discounts = variations.flatMap(variation => variation?.offers || []);
    const discount = discounts?.length > 0 ? discounts[0] : null;
    const discountValue = discount ? discount?.discount : 0;

    const discountPrice = discount ? discount.price : null;
    const basePrice = variations[0]?.price || 0;
    const showDiscountedPrice = discountPrice && discountPrice < basePrice;



    const review = Array.isArray(product.review) ? product.review : [product.review];


    const calculateAverageRating = () => {
        const reviews = Array.isArray(product.review) ? product.review : [product.review];
        const totalRating = reviews.reduce((sum, review) => sum + (review?.star || 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();

    


    // console.log(product?.slug?.replace(/-\d+$/, '').toLowerCase());


    // console.log(product);
    
    

    return (

        <div className={`product text-left ${adClass}`}>
            {/* image Field */}
            <figure className="product-media">
                <ALink href={`/product/default/${product?.id}`}>
                    <LazyLoadImage
                        alt="product"
                        src={`${PRODUCT_IMAGE_BASEURL}/products/${product.image}`}
                        threshold={500}
                        effect="opacity"
                        width='300'
                        height="338"
                    />


  
                    {/* <video
                        loop
                        muted
                        autoPlay
                        playsInline
                        className="video-tag"
                        poster=""
                        width='300'
                        height="338"

                    >
                        <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}












                              
                    {/* {product.variation.length >= 2 && (
                        <video
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="video-tag"
                            poster=""
                            width='300'
                            height="338"

                        >
                            <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}   */}


                


                </ALink>


                {/* Label New & Sales */}
{/* 
                <div className="product-label-group">
                    {product.fresharrival === 0 ? <label className="product-label label-new">New</label> : ''}
                    {
                        product?.variation ?
                            <div>
                                {product?.variation.map((item, index) => (


                                    item?.offers?.length > 0 && item?.offers ?
                                        product?.variation?.length === 0 ?

                                            <label className="product-label label-sale">{item?.offers[0]?.discount} % OFF</label>
                                            : <label className="product-label label-sale">Sale</label>
                                        : ''
                                ))}
                            </div>

                            : ""
                    }                
                </div>
 */}



                <div className="product-label-group">
                    {product?.fresharrival === 0 && <label className="product-label label-new">New</label>}
                    {discountValue > 0 && (
                        variations.length === 0
                            ? <label className="product-label label-sale">{discountValue}% OFF</label>
                            : <label className="product-label label-sale">Sale</label>
                    )}
                </div>


                {/* Addto cart & Wishlisted */}

                <div className="product-action-vertical">

                    {/* Add to cart */}


                    {/* correct  logic */}

                    {product?.variation?.length > 1 ? (
                        <ALink href={`/product/default/${product.id}`} className="btn-product-icon btn-cart" title="Go to product">
                            <i className="d-icon-arrow-right"></i>
                        </ALink>
                    ) : (
                        <a href="#" className="btn-product-icon btn-cart" title="Add to cart" onClick={addToCartHandler}>
                            <i className="d-icon-bag"></i>
                        </a>
                    )}



                    {/* wishlist */}


                    <a href="#" className="btn-product-icon btn-wishlist" title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                        <i className={isWishlisted ? "d-icon-heart-full " : "d-icon-heart"}></i>
                    </a>
                </div>

                {/* Quick View */}

                <div className="product-action">
                    <ALink href="#" className="btn-product btn-quickview" title="Quick View" onClick={ showQuickviewHandler }>Quick View</ALink>
                </div>

                
            </figure>


            {/* Product Details */}

            <div className="product-details">


                {/* Category */}


                {isCategory && (
                    <div className="product-cat">
                        {categories?.map((item, index) => (
                            <React.Fragment key={index}>
                                <ALink href={{ pathname: '/shop', query: { category: item?.name.toLowerCase().replace(/\s+/g, '-') } }}>
                                    {item?.name}
                                </ALink>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                
                {/* Product Name */}


                <h3 className="product-name">
                    <ALink href={`/product/default/${product.id}`}>{product.name}</ALink>
                </h3>



                {/* Product Price  */}

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



                {/* ratings */}
{/*                 
                <div className="ratings-container">
                    {product.review && (
                        <>
                            <div className="ratings-full">
                                {averageStarRating() > 0 && (
                                <>
                                        <span className="ratings" style={{ width: `${20 * averageStarRating()}%` }}></span>
                                        <span className="tooltiptext tooltip-top">{ toDecimal(averageStarRating()) }</span>
                                </>
                                )}
                            </div>
                            {product.review.length > 0 && (
                                <ALink href={`/product/default/${product.id}`} className="rating-reviews">( {product.review.length} reviews )</ALink>
                            )}
                        </>
                    )}
                </div> */}





                <div className="ratings-container">
                    <div className="ratings-full">
                        {review.length > 0 && (
                            <span className="ratings" style={{ width: `${20 * averageRating}%` }}></span>
                        )}
                        {/* <span className="tooltiptext tooltip-top">{averageRating.toFixed(1)}</span> */}

                             <span className="tooltiptext tooltip-top"> {averageRating ? toDecimal(averageRating) : 0}</span>
                    </div>
                    {/* {review.length > 0 && (
                        <ALink href={`/product/${product.id}`} className="rating-reviews">
                            ({review.length} {review.length > 1 ? 'reviews' : ''})
                        </ALink>
                    )} */}

                </div>




                
            </div>
        </div>
    );
};

export default connector(ProductTwo);
