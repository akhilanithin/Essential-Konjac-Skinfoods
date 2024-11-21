import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Collapse from 'react-bootstrap/Collapse';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';

import ProductNav from '~/components/partials/product/product-nav';
import DescTwo from '~/components/partials/product/desc/desc-two';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';
import { log } from 'console';


interface ProductVariant {
    price?: number;
    sale_price?: number;
}

interface Product {
    data: {
        name: string;
        sku: string;
        category: { name: string; slug: string }[];
        variation: ProductVariant[];
        price: number[];
        status: number;
        ratings: number;
        reviews: number;
        description: string;
        discount?: number;
        categories: { name: string; slug: string }[];

    };
}

interface Props {
    data: { product: Product };
    isSticky?: boolean;
    isDesc?: boolean;
    adClass?: string;
    toggleWishlist: (product: Product['data']) => void;
    addToCart: (item: { name: string; qty: number; price: number }) => void;
    wishlist: { slug: string }[];
    category: { name: string; slug: string }[];
    categories: { name: string; slug: string }[];


}

const DetailOne: React.FC<ProductProps> = (props) => {






    const router = useRouter();
    const { data, isSticky = false, isDesc = false, adClass = '' } = props;

    const { toggleWishlist, addToCart, wishlist } = props;

    const [curColor, setCurColor] = useState<string>('null');
    const [curSize, setCurSize] = useState<string>('null');
    const [curIndex, setCurIndex] = useState<number>(0);
    const [cartActive, setCartActive] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

 

    const product=data?.data?.product


 
    const isWishlisted = wishlist?.some(item => item?.name === product?.name);

    const colors: { name: string; value: string }[] = [];
    const sizes: { name: string; value: string }[] = [];

    if (product?.data?.variants) {
        product.data.variants.forEach(item => {
            if (item.size && !sizes.some(size => size.name === item.size.name)) {
                sizes.push({ name: item.size.name, value: item.size.size });
            }
            if (item.color && !colors.some(color => color.name === item.color.name)) {
                colors.push({ name: item.color.name, value: item.color.color });
            }
        });
    }

    useEffect(() => {
        setCurIndex(-1);
        resetValueHandler();
    }, [product]);


    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (toggleWishlist && !isWishlisted) {
            const currentTarget = e.currentTarget as HTMLElement;
            currentTarget.classList.add('load-more-overlay', 'loading');
            toggleWishlist(product);

            setTimeout(() => {
                currentTarget.classList.remove('load-more-overlay', 'loading');
            }, 1000);
        } else {
            router.push('/pages/wishlist');
        }
    };



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

    const isDisabled = (color: string, size: string) => {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product?.data.variants.findIndex(item => item.color?.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product?.data.variants.findIndex(item => item.size?.name === curSize) === -1;
        }

        return product?.data.variants.findIndex(item => item.color?.name === color && item.size?.name === size) === -1;
    };

    const changeQty = (qty: number) => {
        setQuantity(qty);
    };





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



    // console.log(product?.variation[0]?.stock);
    


    return (
        <div className={`product-details ${isSticky ? 'sticky' : ''} ${adClass}`}>

            {/* Navigations */}
            <div className="product-navigation">
                <ul className="breadcrumb breadcrumb-lg">
                    <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                    <li><ALink href="#" className="active">Products</ALink></li>
                    <li>Detail</li>
                </ul>

            {/* Navigation next  */}
                {/* <ProductNav product={product} /> */}

            </div>
            {/* Product Name  */}

            <h2 className="product-name">{product?.name}</h2>

            <div className='product-meta'>

                SKU: <span className='product-sku'>{product?.data?.sku}</span>



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

            <div className="product-price">
                {showDiscountedPrice ? (
                    <>
                    
                    <ins className="new-price"> AED {toDecimal(discountPrice)}</ins>
                    <del className="old-price"> AED {toDecimal(basePrice)}</del>     
                    </>
                ) : (
                    <ins className="new-price">AED {toDecimal(basePrice)}</ins>
                )}
            </div>



            

            {basePrice!== discountPrice && product?.variation?.length === 0 && <Countdown type={2} />} 




            {/* Rating container */}

            <div className="ratings-container">
                    <div className="ratings-full">

                        {review.length > 0 && (
                            <span className="ratings" style={{ width: `${20 * averageRating}%` }}></span>
                        )}
                        <span className="tooltiptext tooltip-top">{averageRating.toFixed(1)}</span>
                    </div>
                    {review?.length > 0 && (
                        <ALink href='#' className="rating-reviews">
                            ({review?.length} {review?.length > 1 ? 'reviews' : 'review'})
                        </ALink>
                    )}


                </div>
{/* description */}

            <p className="product-short-desc">{product?.description}</p>


{/* Size & Color */}


{/* 
            {
                product && product.data.variants.length > 0 ?
                    <>
                        {
                            product.data.variants[0].color ?
                                <div className='product-form product-color'>
                                    <label>Color:</label>

                                    <div className="product-variations">
                                        {
                                            colors.map(item =>
                                                <ALink href="#" className={`color ${curColor === item.name ? 'active' : ''} ${isDisabled(item.name, curSize) ? 'disabled' : ''}`} key={"color-" + item.name} style={{ backgroundColor: `${item.value}` }} onClick={(e) => toggleColorHandler(item)}></ALink>)
                                        }
                                    </div>
                                </div> : ''
                        }

                        {
                            product.data.variants[0].size ?
                                <div className='product-form product-size mb-0 pb-2'>
                                    <label>Size:</label>

                                    <div className="product-form-group">
                                        <div className="product-variations">
                                            {
                                                sizes.map(item =>
                                                    <ALink href="#" className={`size ${curSize === item.name ? 'active' : ''} ${isDisabled(curColor, item.name) ? 'disabled' : ''}`} key={"size-" + item.name} onClick={(e) => toggleSizeHandler(item)}>{item.value}</ALink>)
                                            }
                                        </div>

                                        <Collapse in={'null' !== curColor || 'null' !== curSize}>
                                            <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                                                <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div> : ''
                        }

                        <div className='product-variation-price'>
                            <Collapse in={cartActive && curIndex > -1}>
                                <div className="card-wrapper">
                                    {
                                        curIndex > -1 ?
                                            <div className="single-product-price">
                                                {
                                                    product.data.variants[curIndex].price ?
                                                        product.data.variants[curIndex].sale_price ?
                                                            <div className="product-price mb-0">
                                                                <ins className="new-price">${toDecimal(product.data.variants[curIndex].sale_price)}</ins>
                                                                <del className="old-price">${toDecimal(product.data.variants[curIndex].price)}</del>
                                                            </div>
                                                            : <div className="product-price mb-0">
                                                                <ins className="new-price">${toDecimal(product.data.variants[curIndex].price)}</ins>
                                                            </div>
                                                        : ""
                                                }
                                            </div> : ''
                                    }
                                </div>
                            </Collapse>
                        </div>

                    </>
                    : ''
            } */}
























            <hr className="product-divider" />

            {/* +/- symbol */}

            <div className="product-form product-qty pb-0">
                <label className="d-none">QTY:</label>
                <div className="product-form-group">
                    <Quantity max={product?.variation[0]?.stock} product={product} onChangeQty={changeQty} />

                    {/* Add to cart */}
                    <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold $`} onClick={addToCartHandler}>
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
                    {/* <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink> */}
                </div>

                {/* wishlist  */}


                <span className="divider d-lg-show"></span>

                <a href="#" className={`btn-product btn-wishlist`} title={isWishlisted ? 'Browse wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                    <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    {isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'}
                </a>


            </div>

            {isDesc && <DescTwo product={data} adClass={adClass} />}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        wishlist: state.wishlist.data || []
    };
};

export default connect(mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart })(DetailOne);
