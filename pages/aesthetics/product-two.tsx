import React, {useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect, ConnectedProps } from 'react-redux';
import ALink from '~/components/features/custom-link';
import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';
import { toDecimal } from '~/utils';
import { useRouter } from 'next/router';





// Define the types for the product and props
interface Variation {
    price: number;
    offers?: { discount: number; price: number }[];
}

interface Category {
    name: string;
}

interface Review {
    star: number;
}

interface Picture {
    url: string;
    width: number;
    height: number;
    title: string;
}


interface Product {
    id: string;
    name: string;
    image: string;
    variation: Variation[];
    category?: Category[];
    review?: Review[];
    fresharrival?: number;
    slug?: string;
    picture: Picture[];
}

interface ProductTwoProps {
    product: Product;
    adClass?: string;
    toggleWishlist: (product: Product) => void;
    wishlist: Product[];
    addToCart: (product: Product & { qty: number; price: number }) => void;
    openQuickview: (id?: number) => void;
    isCategory?: boolean;
}

// Define the component
const ProductTwo: React.FC<ProductTwoProps> = ({
    product,
    adClass = 'text-center',
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
    isLazy = false,
    isOriginal = false
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const router = useRouter();

    const variations = Array.isArray(product.variation) ? product.variation : [product.variation];
    const getDiscounts = () => variations.flatMap(variation => variation?.offers || []);
    const discounts = getDiscounts();
    const discount = discounts.length > 0 ? discounts[0] : null;

    const discountValue = discount ? discount.discount : 0;
    const discountPrice = discount ? discount.price : null;

    // const basePrice = variations[0]?.price || 0;

    const basePrice = product?.price || variations[0]?.price || 0;

    const showDiscountedPrice = discountPrice && discountPrice < basePrice;







    
    const handleClick = (e) => {
        e.preventDefault(); 
        router.push(`/aesthetics/${product?.id}`); // Navigate to the URL
    };


    return (
        <div 
            className={`product text-left ${adClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
               {
                <figure className="post-media" >
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


{/* add to cart */}

                    <div  className="product-action-vertical">
                    
                        {/* <a
                            href='#'
                            className="btn-product-icon btn-cart"
                            title="Add to cart"
                            // onClick={addToCartHandler}
                        >
                            <i className="d-icon-bag"></i>
                        </a> */}

                        <a
                            href={`/aesthetics/${product?.id}`}
                            className="btn-product-icon btn-cart"
                            title="Add to cart"
                            onClick={handleClick}
                        >
                            <i className="d-icon-bag"></i>
                        </a>



                    </div>

                </figure>
            }




            <div className="product-details" >


            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',marginBottom: '-1.5rem' }}>
                    <img
                        src={`${product?.clinic?.logo}`}
                        alt=""
                        style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
                    />
    
                    <h3 className="product-name">
                        <ALink href={`/aesthetics/${product?.id}`}>{product.name}</ALink>
                    </h3>
    
            </div>


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

                
            </div>
        </div>
    );
};

// Map Redux state to component props
const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || []
});

// Connect the component to Redux store
const connector = connect(mapStateToProps, { 
    toggleWishlist: wishlistActions.toggleWishlist, 
    addToCart: cartActions.addToCart, 
    ...modalActions 
});

export default connector(ProductTwo);
