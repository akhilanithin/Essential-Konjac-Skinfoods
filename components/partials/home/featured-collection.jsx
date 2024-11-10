import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import ProductTwo from '~/components/features/product/product-two';

import { productSlider2 } from '~/utils/data/carousel';
import { fadeIn, fadeInUpShorter } from '~/utils/data/keyframes';

function FeaturedCollection(props) {
    const { products, loading } = props;

    return (
        <Reveal keyframes={fadeInUpShorter} delay={300} duration={1000} triggerOnce>
            <section className="container product-collection pt-10 mt-10">
                <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                    <div className="title-wrapper mt-1 mb-6">
                        <h2 className="text-left title with-link">Beauty Inspired</h2>
                        <span className="badge">Featured</span>
                    </div>
                </Reveal>
                {
                    loading ?
                        <OwlCarousel adClass="owl-theme owl-shadow-carousel" options={productSlider2}>
                            {
                                [1, 2, 3, 4, 5].map((item) =>
                                    <div className="product-loading-overlay" key={'featured-skel-' + item}></div>
                                )
                            }
                        </OwlCarousel>
                        :
                        <OwlCarousel adClass="owl-theme" options={productSlider2}>
                            {
                                products && products.map((item, index) =>
                                    <ProductTwo
                                        adClass="shadow-product text-center mb-4"
                                        product={item}
                                        key={`featured-product-${index}`} />
                                )
                            }
                        </OwlCarousel>
                }
            </section>
        </Reveal>
    )
}

export default React.memo(FeaturedCollection);
