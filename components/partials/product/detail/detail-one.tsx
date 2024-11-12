import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Collapse from 'react-bootstrap/Collapse';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';
import ProductNav from '~/components/partials/product/product-nav';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

// Define types for props
interface Category {
    name: string;
    slug: string;
}

interface Variant {
    color?: { name: string; color: string };
    size?: { name: string; size: string };
    price: number;
    sale_price?: number;
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
    pictures: { url: string }[];
    variants: Variant[];
}

interface Product {
    data: ProductData;
}

interface Props {
    data: { product: Product };
    isStickyCart?: boolean;
    adClass?: string;
    isNav?: boolean;
    toggleWishlist: (product: ProductData) => void;
    addToCart: (product: { name: string; qty: number; price: number }) => void;
    wishlist: ProductData[];
}

const DetailOne: React.FC<Props> = ({
    data,
    isStickyCart = false,
    adClass = '',
    isNav = true,
    toggleWishlist,
    addToCart,
    wishlist,
}) => {
    const router = useRouter();
    const [curColor, setCurColor] = useState<string>('null');
    const [curSize, setCurSize] = useState<string>('null');
    const [curIndex, setCurIndex] = useState<number>(0);
    const [cartActive, setCartActive] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);


 const product=data?.data?.product

    console.log(product);
    

    // Check if the product is wishlisted


    // const isWishlisted = wishlist.findIndex(item => item.slug === product.data.slug) > -1;

    // Initialize colors and sizes arrays
    const colors: Array<{ name: string; value: string }> = [];
    const sizes: Array<{ name: string; value: string }> = [];




    // if (product?.data?.variants ) {
    //     product.data.variants.forEach(item => {
    //         if (item.size && !sizes.some(size => size.name === item.size.name)) {
    //             sizes.push({ name: item.size.name, value: item.size.size });
    //         }
    //         if (item.color && !colors.some(color => color.name === item.color.name)) {
    //             colors.push({ name: item.color.name, value: item.color.color });
    //         }
    //     });
    // }



    useEffect(() => {
        setCurIndex(-1);
        resetValueHandler();
    }, [product]);



    // useEffect(() => {
    //     if (product.data.variants.length > 0) {
    //         if (
    //             (curSize !== 'null' && curColor !== 'null') ||
    //             (curSize === 'null' && product.data.variants[0].size === null && curColor !== 'null') ||
    //             (curColor === 'null' && product.data.variants[0].color === null && curSize !== 'null')
    //         ) {
    //             setCartActive(true);
    //             setCurIndex(
    //                 product.data.variants.findIndex(item =>
    //                     (item.size && item.color && item.color.name === curColor && item.size.name === curSize) ||
    //                     (item.size === null && item.color.name === curColor) ||
    //                     (item.color === null && item.size.name === curSize)
    //                 )
    //             );
    //         } else {
    //             setCartActive(false);
    //         }
    //     } else {
    //         setCartActive(true);
    //     }

    //     if (product.stock === 0) {
    //         setCartActive(false);
    //     }
    // }, [curColor, curSize, product]);




    // const wishlistHandler = (e: React.MouseEvent) => {
    //     e.preventDefault();

    //     if (toggleWishlist && !isWishlisted) {
    //         const currentTarget = e.currentTarget as HTMLAnchorElement;
    //         currentTarget.classList.add('load-more-overlay', 'loading');
    //         toggleWishlist(product.data);

    //         setTimeout(() => {
    //             currentTarget.classList.remove('load-more-overlay', 'loading');
    //         }, 1000);
    //     } else {
    //         router.push('/pages/wishlist');
    //     }
    // };



    const setColorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurColor(e.target.value);
    };

    const setSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurSize(e.target.value);
    };

    // const addToCartHandler = () => {
    //     if (product.data.stock > 0 && cartActive) {
    //         let tmpName = product.data.name;
    //         if (curColor !== 'null') tmpName += '-' + curColor;
    //         if (curSize !== 'null') tmpName += '-' + curSize;

    //         let tmpPrice = product.data.price[0];
    //         if (product.data.price[0] !== product.data.price[1]) {
    //             tmpPrice = product.data.variants[curIndex]?.sale_price ?? product.data.variants[curIndex]?.price ?? product.data.price[0];
    //         }

    //         addToCart({ ...product.data, name: tmpName, qty: quantity, price: tmpPrice });
    //     }
    // };


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

    const addToCartHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: getPrice() });
    };





    const resetValueHandler = () => {
        setCurColor('null');
        setCurSize('null');
    };

    function isDisabled(color: string, size: string) {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product.data.variants.findIndex(item => item.color.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product.data.variants.findIndex(item => item.size.name === curSize) === -1;
        }

        return product.data.variants.findIndex(item => item.color.name === color && item.size.name === size) === -1;
    }

    function changeQty(qty: number) {
        setQuantity(qty);
    }


    const variations = Array.isArray(product?.variation) ? product?.variation : [product?.variation];
    const discounts = variations.flatMap(variation => variation?.offers || []);
    const discount = discounts?.length > 0 ? discounts[0] : null;
    const discountValue = discount ? discount?.discount : 0;
    const discountPrice = discount ? discount?.price : null;
    const basePrice = variations[0]?.price || 0;
    const showDiscountedPrice = discountPrice && discountPrice < basePrice;


    const review = Array.isArray(product?.review) ? product.review : [product?.review];
    
    const calculateAverageRating = () => {
        const reviews = Array.isArray(product?.review) ? product?.review : [product?.review];
        const totalRating = reviews.reduce((sum, review) => sum + (review?.star || 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();







    return (



        <div className={`product-details ${adClass}`}>


            {/* Navigations */}

            {isNav && (
                <div className="product-navigation">
                    <ul className="breadcrumb breadcrumb-lg">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li><ALink href="#" className="active">Products</ALink></li>
                        <li>Detail</li>
                    </ul>
                        {/* Navigation next  */}
                    <ProductNav product={product} />
                </div>
            )}

   {/* Product Name  */}
            <h2 className="product-name">{product?.name}</h2>

            <div className='product-meta'>
                {/* SKU: <span className='product-sku'>{product.data.sku}</span> */}


{/* Categories */}


                CATEGORIES: <span className='product-brand'>


                <React.Fragment key={`${product?.category?.name}`}>
                            <ALink href={{ pathname: '/shop', query: { category: product?.category?.name } }}>
                                {product?.category?.name}
                            </ALink>
                            {product?.category?.id < product?.category?.length - 1 ? ', ' : ''}
                        </React.Fragment>

                </span>
            </div>



{/* Product price   */}


            <div className="product-price mb-2">
            {showDiscountedPrice ? (
                    <>
                    
                    <ins className="new-price"> AED {toDecimal(discountPrice)}</ins>
                    <del className="old-price"> AED {toDecimal(basePrice)}</del>     
                    </>
                ) : (
                    <ins className="new-price">AED {toDecimal(basePrice)}</ins>
                )}
            </div> 



            {basePrice!== discountPrice && product?.variation?.length === 0 &&<Countdown type={2} />}



            {/* Rating container */}

            <div className="ratings-container">
                <div className="ratings-full">


                {review.length > 0 && (
                            <span className="ratings" style={{ width: `${20 * averageRating}%` }}></span>
                        )}
                        <span className="tooltiptext tooltip-top">{averageRating.toFixed(1)}</span>
                    </div>
                    {review?.length > 0 && (
                        <ALink href={`/product/${product?.id}`} className="rating-reviews">
                            ({review?.length} {review?.length > 1 ? 'reviews' : 'review'})
                        </ALink>
                    )}



            </div> 

{/* description */}


<p className="product-short-desc">{product?.description}</p>


{/* Color */}

            {product && product?.variation?.length > 0 && (
                <>
                    {/* {product?.variation[0]?.colors && (
                        <div className='product-form product-variations product-color'>
                            <label>Color:</label>
                            <div className='select-box'>
                                <select name='color' className='form-control select-color' onChange={setColorHandler} value={curColor}>
                                    <option value="null">Choose an option</option>
                                    {product?.variation[0]?.colors?.map(item => !isDisabled(item?.name, curSize) && (
                                        <option value={item?.name} key={`color-${item?.name}`}>{item?.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )} */}

         
{/* 
                    <div className='product-variation-price'>
                        <Collapse in={cartActive && curIndex > -1}>
                            <div className="card-wrapper">
                                {curIndex > -1 && (
                                    <div className="single-product-price">
                                        {product.data.variants[curIndex].price ? (
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
                                        ) : ""}
                                    </div>
                                )}
                            </div>
                        </Collapse>
                    </div> */}


                </>
            )} 




            <hr className="product-divider" />
           {/* (
                <div className="sticky-content fix-top product-sticky-content">
                    <div className="container">
                        <div className="sticky-product-details">
                            <figure className="product-image">
                                <ALink href={`/product/default/${product.data.slug}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.data.pictures[0].url}`} width="90" height="90" alt="Product" />
                                </ALink>
                            </figure>
                            <div>
                                <h4 className="product-title"><ALink href={`/product/default/${product.data.slug}`}>{product.data.name}</ALink></h4>
                                <div className="product-info">
                                    <div className="product-price mb-0">
                                        {product.data.price[0] !== product.data.price[1] ? (
                                            product.data.variants.length === 0 ? (
                                                <>
                                                    <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                                                    <del className="old-price">${toDecimal(product.data.price[1])}</del>
                                                </>
                                            ) : (
                                                <del className="new-price">${toDecimal(product.data.price[0])} – ${toDecimal(product.data.price[1])}</del>
                                            )
                                        ) : (
                                            <ins className="new-price">${toDecimal(product.data.price[0])}</ins>
                                        )}
                                    </div>
                                    <div className="ratings-container mb-0">
                                        <div className="ratings-full">
                                            <span className="ratings" style={{ width: 20 * product.data.ratings + '%' }}></span>
                                            <span className="tooltiptext tooltip-top">{toDecimal(product.data.ratings)}</span>
                                        </div>
                                        <ALink href="#" className="rating-reviews">( {product.data.reviews} reviews )</ALink>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="product-form product-qty pb-0">
                            <label className="d-none">QTY:</label>
                            <div className="product-form-group">
                                <Quantity max={product.data.stock} product={product} onChangeQty={changeQty} />
                                <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${cartActive ? '' : 'disabled'}`} onClick={addToCartHandler}>
                                    <i className='d-icon-bag'></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )  ( */}





       {/* +/- symbol */}

                <div className="product-form product-qty pb-0">
                    <label className="d-none">QTY:</label>
                    <div className="product-form-group">
                        <Quantity max={product?.variation[0]?.stock} product={product} onChangeQty={changeQty} />

                          {/* Add to cart */}
                        <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${cartActive ? 'disabled' : ''}`} onClick={addToCartHandler}>
                            <i className='d-icon-bag'></i>Add to Cart
                        </button>
                    </div>
                </div>
            
            <hr className="product-divider mb-3" />

{/* links */}

            <div className="product-footer">
                <div className="social-links mr-4">
                    <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                    <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                    <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink>
                </div>


                <span className="divider d-lg-show"></span>
{/*                 
                <a href="#" className={`btn-product btn-wishlist`} title={isWishlisted ? 'Browse wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                    <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    {isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'}
                </a> */}

            </div> 


        </div>

        
    );
};

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || []
});

export default connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart
})(DetailOne);
