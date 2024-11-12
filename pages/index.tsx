import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

// Import Home Components
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


import axiosInstance, { setAuthToken } from '~/pages/axiosClient';


interface HomeData {
    data: {
        trending: any; // Replace 'any' with the specific type based on your API response
        // Add other fields as needed
    };
}

const HomePage: React.FC = () => {
    const [data, setData] = useState<HomeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://essentialkonjacskinfoods.com/api/v1/en/home');
                if (!res.ok) throw new Error('Network response was not ok');
                const result = await res.json();
                setData(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="main home">
            <Helmet>
                <title>EKSFC - Home</title>
            </Helmet>

            <h1 className="d-none">Essential Konjac Skin Food - Home</h1>

            <div className="page-content overflow-hidden">
                <IntroSection />
                <ProductCollection data={data} loading={loading} />
                <ServiceBox />
                <BrandSection products={data} loading={loading} />
                <BannerSectionOne />
                <BannerSectionTwo />
                <FeaturedCollection products={data} loading={loading} />
                <BlogSection />
                <Instagram />
               
            </div>

            <NewsletterModal />
        </div>
    );
};

export default withApollo({ ssr: typeof window === 'undefined' })(HomePage);
