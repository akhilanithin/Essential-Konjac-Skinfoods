import React from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import ProductTwo from '~/components/features/product/product-two';
import { mainSlider17 } from '~/utils/data/carousel';

interface Product {
    // Define the properties of your product object based on your data structure
    id: string; // Example property
    name: string; // Example property
    // Add other relevant properties as needed
}

interface RelatedProductsProps {
    products: Product[];
    adClass?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, adClass = "pt-3 mt-10" }) => {
    return (
        products.length > 0 ? (
            <section className={`${adClass}`}>
                <h2 className="title justify-content-center">Related Products</h2>

                <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={mainSlider17}>
                    {
                        products.slice(0, 5).map((item, index) => (
                            <ProductTwo product={item} key={`product-two-${index}`} adClass='text-center shadow-media' />
                        ))
                    }
                </OwlCarousel>
            </section>
        ) : null
    );
};

export default RelatedProducts;
