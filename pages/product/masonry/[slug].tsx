import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';

import MediaThree from '~/components/partials/product/media/media-three';
import DetailThree from '~/components/partials/product/detail/detail-three';
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

const ProductMasonry: React.FC = () => {
    const router = useRouter();
    const { slug } = router.query;

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

    if (!slug) return null;

    return (
        <main className="main mt-6 single-product product-layout-masonry">
            <Helmet>
                <title>Product Description</title>
            </Helmet>

            <h1 className="d-none">Product Description</h1>

            {product !== undefined ? (
                <div className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`}>
                    <div className="container skeleton-body">
                        <div className="product product-single row mb-2">
                            <div className="col-md-6">
                                <MediaThree product={product} />
                            </div>

                            <div className="col-md-6">
                                <DetailThree data={data} isSticky={true} isDesc={true} />
                            </div>
                        </div>

                        <RelatedProducts products={related} />
                    </div>
                </div>
            ) : null}

            {loaded && !loading ? null : (
                <div className="skeleton-body container mb-10">
                    <div className="row mb-2">
                        <div className="col-md-6 product-masonry-type">
                            <div className="skel-pro-gallery"></div>
                        </div>

                        <div className="col-md-6">
                            <div className="skel-pro-summary mt-4 mt-md-0"></div>
                            <div className="skel-pro-tabs"></div>
                        </div>
                    </div>

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

export default withApollo({ ssr: typeof window === 'undefined' })(ProductMasonry);
