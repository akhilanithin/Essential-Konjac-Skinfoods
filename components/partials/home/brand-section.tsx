import React from 'react';
import Reveal from 'react-awesome-reveal';
import OwlCarousel from '~/components/features/owl-carousel';
import { brandSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Define the types for the props
interface Brand {
    img: string; // Adjust based on your API's brand structure
}

interface Products {
    data: {
        brands: Brand[];
    };
}

interface BrandSectionProps {
    products: Products | null;
    loading: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = ({ products, loading }) => {
    return (
        <Reveal keyframes={fadeIn} duration={1200} delay={300} triggerOnce>
            <section className="brand-section pb-10">
                <h2 className="title d-none">Our Brand</h2>

                <div className='image-container'>
                    <OwlCarousel adClass="owl-theme brand-carousel" options={brandSlider}>
                        {products?.data.brands && products.data.brands.map((item, index) => (
                            <figure className="brand" key={`brand-${index}`}>
                                <LazyLoadImage
                                    src={`https://admin.essentialkonjacskinfoods.com/assets/img/brands/${item.img}`}
                                    alt="Brand"
                                    effect="blur"
                                />
                            </figure>
                        ))}
                    </OwlCarousel>
                </div>
            </section>
        </Reveal>
    );
};

export default React.memo(BrandSection);
