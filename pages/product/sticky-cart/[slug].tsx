import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';

import MediaOne from '~/components/partials/product/media/media-one';
import DetailOne from '~/components/partials/product/detail/detail-one';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';

import { mainSlider17 } from '~/utils/data/carousel';

interface Product {
    id: string;
    name: string;
    // Add other relevant fields as needed
}

interface QueryData {
    product: {
        data: Product;
        related: Product[];
    };
}

const ProductDefault: React.FC = () => {
    const { query } = useRouter();
    const slug = query.slug as string; // Type assertion to string

    const { data, loading } = useQuery<QueryData>(GET_PRODUCT, { variables: { slug } });

    
    const [loaded, setLoadingState] = useState(false);
    const product = data?.product.data;
    const related = data?.product.related;

    useEffect(() => {
        if (!loading && product) {
            imagesLoaded('main').on('done', () => {
                setLoadingState(true);
            }).on('progress', () => {
                setLoadingState(false);
            });
        } else if (loading) {
            setLoadingState(false);
        }
    }, [loading, product]);

    useEffect(() => {
        const handleScroll = () => {
            const stickyContent = document.querySelector('.product-sticky-content') as HTMLElement | null;
            let height = 0;
            let offsetHeight = 0;

            if (stickyContent) {
                height = stickyContent.offsetHeight;

                if (window.scrollY > 600 && window.innerWidth > 991) {
                    stickyContent.classList.add('fixed');
                    const stickyHeader = document.querySelector('.sticky-header.sticky-content') as HTMLElement | null;

                    offsetHeight = stickyHeader ? stickyHeader.offsetHeight : 88;

                    if (!document.querySelector('.sticky-product-wrapper')) {
                        const stickyWrapper = document.createElement('div');
                        stickyWrapper.className = "sticky-product-wrapper";
                        stickyContent.parentNode?.insertBefore(stickyWrapper, stickyContent);
                        stickyWrapper.appendChild(stickyContent);
                        stickyWrapper.setAttribute("style", `height: ${height}px`);
                    }

                    const wrapper = document.querySelector('.sticky-product-wrapper') as HTMLElement;
                    if (wrapper && !wrapper.getAttribute("style")) {
                        wrapper.setAttribute("style", `height: ${height}px`);
                    }
                    stickyContent.setAttribute('style', `top: ${offsetHeight}px`);
                } else {
                    const wrapper = document.querySelector('.sticky-product-wrapper') as HTMLElement;
                    if (wrapper) {
                        wrapper.setAttribute("style", "");
                    }
                    stickyContent.classList.remove('fixed');
                }
            }
        };

        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, []);

    if (!slug) return null;

    return (
        <main className="main mt-6 single-product">
            <Helmet>
                <title>Riode React eCommerce Template | Product Default</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Product Default</h1>

            {product !== undefined ? (
                <div className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`}>
                    <div className="container skeleton-body vertical">
                        <div className="product product-single row mb-7">
                            <div className="col-md-6 sticky-sidebar-wrapper">
                                <MediaOne product={product} />
                            </div>

                            <div className="col-md-6">
                                <DetailOne data={data} isStickyCart={true} adClass="mt-4 mt-md-0" />
                            </div>
                        </div>

                        <DescOne product={product} isGuide={false} />

                        <RelatedProducts products={related} />
                    </div>
                </div>
            ) : null}

            {loaded && !loading ? null : (
                <div className="skeleton-body container mb-10">
                    <div className="row mb-7">
                        <div className="col-md-6 pg-vertical sticky-sidebar-wrapper">
                            <div className="skel-pro-gallery"></div>
                        </div>

                        <div className="col-md-6">
                            <div className="skel-pro-summary mt-4 mt-md-0"></div>
                        </div>
                    </div>

                    <div className="skel-pro-tabs"></div>

                    <section className="pt-3 mt-4">
                        <h2 className="title justify-content-center">Related Products</h2>

                        <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={mainSlider17}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                            ))}
                        </OwlCarousel>
                    </section>
                </div>
            )}
        </main>
    );
};

export default withApollo({ ssr: typeof window === 'undefined' })(ProductDefault);
