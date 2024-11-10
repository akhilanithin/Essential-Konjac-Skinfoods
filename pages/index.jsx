import React from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ProductCollection from '~/components/partials/home/product-collection';
import ServiceBox from '~/components/partials/home/service-section';
import BrandSection from '~/components/partials/home/brand-section';
import BannerSectionOne from '~/components/partials/home/banner-section-one';
import BannerSectionTwo from '~/components/partials/home/banner-section-two';
import FeaturedCollection from '~/components/partials/home/featured-collection';
import BlogSection from '~/components/partials/home/blog-section';
import Instagram from '~/components/partials/home/instagram';

function HomePage() {
    const { data, loading, error } = useQuery(GET_HOME_DATA, { variables: { productsCount: 6 } });
    const featured = data && data.specialProducts.featured;
    const posts = data && data.posts.data;
    const products = data && data.products.data;
    

    return (
        <div className="main home">
            <Helmet>
                <title>EKSFC - Home</title>
            </Helmet>


            <h1 className="d-none">Essential Konjac Skin Food - Home</h1>

            <div className="page-content overflow-hidden">
                <IntroSection />

                <ProductCollection products={products} loading={loading} />

                <ServiceBox />

                <BrandSection />

                <BannerSectionOne />

                <BannerSectionTwo />

                <FeaturedCollection products={featured} loading={loading} />

                <BlogSection posts={posts} />

                <Instagram />

            </div>

            <NewsletterModal />
        </div>
    )
}

export default withApollo({ ssr: typeof window === 'undefined' })(HomePage);