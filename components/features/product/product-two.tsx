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

interface Product {
    id: string;
    name: string;
    image: string;
    variation: Variation[];
    category?: Category[];
    review?: Review[];
    fresharrival?: number;
    slug?: string;
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

    const isWishlisted = wishlist.some(item => item.name === product.name);




    const showQuickviewHandler = () => {
        openQuickview(product?.id);
    };

    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (toggleWishlist) {
            toggleWishlist(product);
        }
        let currentTarget = e.currentTarget;
        currentTarget.classList.add('load-more-overlay', 'loading');
        setTimeout(() => {
            currentTarget.classList.remove('load-more-overlay', 'loading');
        }, 1000);
    };

    const addToCartHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: basePrice });
    };

    // const renderCategories = () => {
    //     if (!product.category) return null;
    //     const categories = Array.isArray(product.category) ? product.category : [product.category];
    //     return categories.map((item, index) => (
    //         <React.Fragment key={`${item.name}-${index}`}>
    //             <ALink href={{ pathname: '/shop', query: { category: item.name } }}>
    //                 {item.name}
    //                 {index < categories.length - 1 ? ', ' : ""}
    //             </ALink>
    //         </React.Fragment>
    //     ));
    // };


    const [category, setCategory] = useState<null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);



    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.eksfc.com/api/categories?page=1&limit=100&sortField=id&sortOrder=DESC&filterName=status&filterValue=0`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRODUCT_TOKEN}`,
                        'konjac-version': '1.0.1'
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch products');

                const data= await response.json();
                const filteredData = data.data.filter(product => product?.status === 0); // Filter active products
                setCategory(filteredData );
                setLoading(false);                            
            } catch (err) {
                // console.error(err);
                setError(err.message || 'An error occurred while fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



// console.log(product);



const renderCategories = () => {
    if (!product?.c_id) return null; // Ensure `product.c_id` exists
    const categoriesArray = Array.isArray(category) ? category : [category]; 

    const matchedCategory = categoriesArray.find(cat => cat?.id === product?.c_id); 
    const categoryName = matchedCategory ? matchedCategory.name : "Category Not Found";

    // console.log(categoryName.replace(/\+/g, "-").toLowerCase());
    

    // Render category name as a link
    return (
        <React.Fragment key={`category-${product?.c_id}`}>
            {matchedCategory ? (
                <ALink href={{ pathname: '/shop', query: { category: categoryName } }}>
                    {categoryName}
                </ALink>
            ) : (
                "Category Not Found"
            )}
        </React.Fragment>
    );
};




    const calculateAverageRating = () => {
        const reviews = Array.isArray(product.review) ? product.review : [product.review];
        const totalRating = reviews.reduce((sum, review) => sum + review?.star, 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();
    const review = Array.isArray(product.review) ? product.review : [product.review];

    





    return (
        <div 
            className={`product text-left ${adClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className="product-media">
                <ALink href={`/product/default/${product?.id}`}>
                    <LazyLoadImage
                        alt="product"
                        src={`https://admin.essentialkonjacskinfoods.com/assets/img/products/${product?.image}`}
                        threshold={500}
                        effect="opacity"
                        wrapperClassName="product-image"
                    />
                </ALink>

                <div className="product-label-group">
                    {product?.fresharrival === 0 && <label className="product-label label-new">New</label>}
                    {discountValue > 0 && (
                        variations.length === 0
                            ? <label className="product-label label-sale">{discountValue}% OFF</label>
                            : <label className="product-label label-sale">Sale</label>
                    )}
                </div>

                <div className="product-action-vertical">
                    
                    {variations.length > 1 ? (
                        <ALink
                        href={`/product/default/${product.id}`}
                            className="btn-product-icon btn-cart"
                            title="Go to product"
                        >
                            <i className="d-icon-arrow-right"></i>
                        </ALink>
                    ) : (
                        <a
                            href='#'
                            className="btn-product-icon btn-cart"
                            title="Add to cart"
                            onClick={addToCartHandler}
                        >
                            <i className="d-icon-bag"></i>
                        </a>
                    )}

                    <a
                        href='/pages/whishlist'
                        className="btn-product-icon btn-wishlist"
                        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={wishlistHandler}
                    >
                        <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    </a>
                </div>

                <div className="product-action">
                    <ALink
                        href=""
                        className="btn-product btn-quickview"
                        title="Quick View"
                        onClick={showQuickviewHandler}
                    >
                        Quick View
                    </ALink>
                </div>
            </figure>

            <div className="product-details">
                {isCategory && (
                    <div className="product-cat">
                        {renderCategories()}
                    </div>
                )}

                <h3 className="product-name">
                    <ALink href={`/product/default/${product.id}`}>{product.name}</ALink>
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
                            <span className="ratings" style={{ width: 20 * averageRating + '%' }}></span>
                        )}
                        <span className="tooltiptext tooltip-top">{averageRating.toFixed(1)}</span>
                    </div>

                    {review.length > 0 && (
                        <ALink href={`/product/default/${product.id}`} className="rating-reviews">
                            ({review?.length} reviews)
                        </ALink>
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
