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
    const { product, adClass, toggleWishlist, wishlist, addToCart, openQuickview, isLazy = false, isOriginal = false } = props;



    const addToCartHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: product.price[0] });
    };



    const variations = Array.isArray(product.variation) ? product.variation : [product.variation];
    const getDiscounts = () => variations.flatMap(variation => variation?.offers || []);
    const discounts = getDiscounts();
    const discount = discounts.length > 0 ? discounts[0] : null;

    const discountValue = discount ? discount.discount : 0;
    const discountPrice = discount ? discount.price : null;

    // const basePrice = variations[0]?.price || 0;

    const basePrice = product?.price || variations[0]?.price || 0;

    const showDiscountedPrice = discountPrice && discountPrice < basePrice;



    // console.log(product);


    const calculateAverageRating = () => {
        const reviews = Array.isArray(product.review) ? product.review : [product.review];
        const totalRating = reviews.reduce((sum, review) => sum + (review?.star || 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();

    console.log(product);


    const stripHtmlTags = (html) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || "";
      };
      


    return (
        <div className={`product product-list ${adClass} ${product?.variation?.length > 0 ? 'product-variable' : ''}`}>


            {/* Figure */}

            <figure className="product-media">


                {isLazy ? (
                    <ALink href={`/aesthetics/${product?.id}`}>
                        <LazyLoadImage
                            src={`${product?.clinic?.logo}`}
                            alt="post image"
                            // width={isOriginal ? 380 : product?.picture[0].width}
                            // height={isOriginal ? 230 : product?.picture[0].height}
                            effect="opacity; transform"
                            style={{ backgroundColor: "#DEE6E8" }}
                        />
                    </ALink>
                ) : (
                    <ALink href={`/aesthetics/${product?.id}`}>
                        <img
                            src={`${product?.imageUrls}`}
                            alt="post image"
                        // width={isOriginal ? 380 : product?.picture[0]?.width}
                        // height={isOriginal ? 230 : product?.picture[0]?.height}
                        />
                    </ALink>
                )}




            </figure>





            <div className="product-details">

           

                <h3 className="product-name">
                    <ALink href={`/aesthetics/${product?.id}`}>{product?.name}</ALink>
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
 

                <p className="product-short-desc">  {stripHtmlTags(product?.description) || "No description available."}</p>



                <div className="product-action">

                    {product?.variation?.length > 0 ? (
                        <ALink href={`/aesthetics/${product?.id}`} className="btn-product btn-cart" title="Go to product">
                            <span>Select Options</span>
                        </ALink>
                    ) : (
                        <a href="#" className="btn-product btn-cart" title="Add to cart"
                        //  onClick={addToCartHandler}
                         
                         >
                            <i className="d-icon-bag"></i>
                            <span>Add to cart</span>
                        </a>
                    )}
          
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
