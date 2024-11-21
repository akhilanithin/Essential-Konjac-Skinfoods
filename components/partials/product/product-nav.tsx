import ALink from '~/components/features/custom-link';
import { useRouter } from 'next/router';
import React from 'react';


interface Picture {
    url: string;
}

interface Product {
    prev?: {
        slug: string;
        name: string;
        pictures: Picture[];

    };
    next?: {
        slug: string;
        name: string;
        pictures: Picture[];
    };
}

interface ProductNavProps {
    product: Product;
}



const ProductNav: React.FC<ProductNavProps> = ({ product }) => {
    const router = useRouter();

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

  
    return (


        <ul className="product-nav">
        {/* Loop through product variations */}
        {product?.variation?.map((item, index) => (
            <React.Fragment key={index}>
                {/* Prev Navigation: Show if a previous variation exists */}
                {index > 0 && (
                    <li className={ `product-nav-${ product?.variation>1 ? 'prev' : 'next no-next' }` }>
                        <ALink
                            href={{
                                pathname: router.pathname,
                                query: { slug: product.variation[index - 1]?.id }
                            }}
                            scroll={false}
                        >
                            <i className="d-icon-arrow-left"></i> Prev
                            <span className="product-nav-popup">
                                <img
                                    src={`${PRODUCT_IMAGE_BASEURL}/products/${product.variation[index - 1]?.images?.[0]?.image}`}
                                    alt="Previous product thumbnail"
                                    width="110"
                                    height="123"
                                />
                                <span className="product-name">
                                    {product.variation[index - 1]?.name}
                                </span>
                            </span>
                        </ALink>
                    </li>
                )}
    
                {/* Next Navigation: Show if a next variation exists */}
                {index < product.variation.length - 1 && (
                    <li className="product-nav-next">
                        <ALink
                            href={{
                                pathname: router.pathname,
                                query: { slug: product.variation[index + 1]?.id }
                            }}
                            scroll={false}
                        >
                            Next <i className="d-icon-arrow-right"></i>
                            <span className="product-nav-popup">
                                <img
                                    src={`${PRODUCT_IMAGE_BASEURL}/products/${product.variation[index + 1]?.images?.[0]?.image}`}
                                    alt="Next product thumbnail"
                                    width="110"
                                    height="123"
                                />
                                <span className="product-name">
                                    {product.variation[index + 1]?.name}
                                </span>
                            </span>
                        </ALink>
                    </li>
                )}
            </React.Fragment>
        ))}
    </ul>
    


    );
};

export default ProductNav;
