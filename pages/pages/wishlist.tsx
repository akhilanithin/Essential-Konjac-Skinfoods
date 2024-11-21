import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';
import { cartActions } from '~/store/cart';
import { wishlistActions } from '~/store/wishlist';
import { toDecimal } from '~/utils';

interface ProductVariation {
    price: number;
    offers: { price: number; discount: number }[];
}

interface WishlistItem {
    name: string;
    slug: string;
    image: string;
    variation: ProductVariation[];
    stock: number;
    salePrice: number;
    price: number[];
    variants: any[]; // You may want to specify this further based on your data
}

interface Props {
    wishlist: WishlistItem[];
    addToCart: (item: WishlistItem) => void;
    removeFromWishlist: (item: WishlistItem) => void;
    
}






const Wishlist: React.FC<Props> = ({ wishlist, addToCart, removeFromWishlist }) => {




    
    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    const moveToCart = (e: React.MouseEvent<HTMLAnchorElement>, item: WishlistItem) => {
        e.preventDefault();
        addToCart({ ...item, qty: 1, price: item.price[0] });
        removeFromWishlist(item);
    };

    // function getOfferPrice(productData: WishlistItem): number[] {
    //     if (productData && productData.variation) {
    //         return productData.variation.map(variation => {
    //             if (variation.offers && variation.offers.length > 0) {
    //                 return variation.offers[0].price;
    //             }
    //             return 0; // or any default value
    //         });
    //     }
    //     return [];
    // }




    const calculateDiscountedPrice = (item: WishlistItem): number => {
        const variations = Array.isArray(item.variation) ? item.variation : [item.variation];

        const discounts = variations.flatMap(variation => 
            variation && Array.isArray(variation.offers) ? variation.offers : []
        );

        const discount = discounts.length > 0 ? discounts[0] : null;
        const basePrice = variations[0]?.price || 0;
        const discountPrice = discount ? discount.price : null;

        return discountPrice && discountPrice < basePrice ? discountPrice : basePrice; // Final price logic
    };

    return (
        <main className="main">
            <Helmet>
                <title>Riode React eCommerce Template | Wishlist</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Wishlist</h1>
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Wishlist</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content pt-10 pb-10 mb-2">
                <div className="container">
                    {wishlist.length > 0 ? (
                        <>
                            <table className="shop-table wishlist-table mt-2 mb-4">

                                {/* table Headings */}
                                <thead>
                                    <tr>
                                        <th className="product-name"><span>Product</span></th>
                                        <th></th>
                                        <th className="product-price"><span>Price</span></th>
                                        <th className="product-stock-status"><span>Stock status</span></th>
                                        <th className="product-add-to-cart"></th>
                                        <th className="product-remove"></th>
                                    </tr>
                                </thead>

                                {/* table body  */}

                                <tbody className="wishlist-items-wrapper">
                                    {wishlist.map((item) => (

                                        // console.log(item?.variation[0]?.stock),


                                        <tr key={'wishlist-' + item?.name}>

                                        {/* Product Image */}
                                        <td className="product-thumbnail">
                                            <ALink href={'/product/default/' + item?.slug}>
                                                <figure>
                                                    <img src={`${PRODUCT_IMAGE_BASEURL}/products/${item?.image}`} width="100" height="100" alt="product" />
                                                </figure>
                                            </ALink>
                                        </td>

                                        {/* Product Name */}
                                        <td className="product-name">
                                            <ALink href={'/product/default/' + item?.slug}>{item?.name}</ALink>
                                        </td>

                                        {/* Product Price  */}

                                        {/* <td className="product-price">
                                            {item?.variation[0].price !== getOfferPrice(item)[0] ? (
                                                <span className="amount">AED {toDecimal(item?.variation[0].price)}</span>
                                            ) : item?.variation[0].offers[0].discount > 0 && item?.variation.length > 0 ? (
                                                <>
                                                    <span className="amount">AED {toDecimal(item.salePrice)}</span>
                                                    <span className="amount">AED {toDecimal(item.price)}</span>
                                                </>
                                            ) : (
                                                <span className="amount">AED {toDecimal(item?.variation[0].price)}</span>
                                            )}
                                        </td> */}




                                            <td className="product-price">
                                                <span className="amount">AED {toDecimal(calculateDiscountedPrice(item))}</span>
                                            </td>



                                        {/* Product Stock status */}
                                        <td className="product-stock-status">
                                            <span className={item?.variation[0]?.stock > 0 ? 'wishlist-in-stock' : 'wishlist-out-stock'}>
                                                {item?.variation[0]?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>

                                        {/* Select Opton */}
                                        <td className="product-add-to-cart">
                                            {item?.variation[0]?.stock > 0 ? (
                                                item?.variation.length > 0 ? (
                                                    <ALink href={'/product/default/' + item?.id} className="btn-product btn-primary"><span>Select options</span></ALink>
                                                ) : (
                                                    <a href="#" className="btn-product btn-primary" onClick={(e) => moveToCart(e, item)}><span>Add to Cart</span></a>
                                                )
                                            ) : ""}
                                        </td>

                                        {/* Delete */}
                                        <td className="product-remove">
                                            <div>
                                                <ALink href="#" className="remove" title="Remove this product">
                                                    <i className="fas fa-times" onClick={() => removeFromWishlist(item)}></i>
                                                </ALink>
                                            </div>
                                        </td>
                                    </tr>
                                   
                                    ))}
                                </tbody>
                            </table>

                            {/* Social sites  */}
                            <div className="social-links share-on">
                                <h5 className="text-uppercase font-weight-bold mb-0 mr-4 ls-s">Share on:</h5>

                                <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-icon social-facebook" title="Facebook"><i className="fab fa-facebook-f"></i></ALink>

                                <ALink href="https://twitter.com/KonjacSkin" className="social-link social-icon social-twitter" title="Twitter"><i className="fab fa-twitter"></i></ALink>

                                <ALink href="https://www.instagram.com/konjacskinfood/" className="social-link social-icon social-instagram" title="Instagram"><i className="fab fa-instagram"></i></ALink>

                                <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-icon social-pinterest" title="Linkdin"><i className="fab fa-linkedin-in"></i></ALink>


                                {/* <ALink href="#" className="social-link social-icon social-pinterest" title="Pinterest"><i className="fab fa-pinterest-p"></i></ALink> */}

                                {/* <ALink href="#" className="social-link social-icon social-email" title="Email"><i className="far fa-envelope"></i></ALink> */}
{/* 
                                <ALink href="#" className="social-link social-icon social-whatsapp" title="Whatsapp"><i className="fab fa-whatsapp"></i></ALink> */}
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart text-center">
                            <i className="cart-empty d-icon-heart"></i>
                            <p>No products added to the wishlist.</p>
                            <p className="return-to-shop mb-0">
                                <ALink className="button wc-backward btn btn-dark btn-md" href="/shop">
                                    Return to shop
                                </ALink>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data ? state.wishlist.data : []
});

export default connect(mapStateToProps, {
    addToCart: cartActions.addToCart,
    removeFromWishlist: wishlistActions.removeFromWishlist
})(Wishlist);
