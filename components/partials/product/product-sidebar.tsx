import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import withApollo from '~/server/apollo';
import { GET_SHOP_SIDEBAR_DATA } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import SmallProduct from '~/components/features/product/product-sm';

import { mainSlider7 } from '~/utils/data/carousel';

interface Picture {
    url: string;
}

interface Product {
    slug: string;
    name: string;
    pictures: Picture[];
}

interface ShopSidebarData {
    featured: Product[];
}

interface ProductsSidebarProps {
    adClass?: string;
    type?: "left" | "right";
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({ adClass = '', type = "right" }) => {
    const { data, loading, error } = useQuery<{ shopSidebarData: ShopSidebarData }>(GET_SHOP_SIDEBAR_DATA, { variables: { featured: true } });
    const featured = data?.shopSidebarData.featured || [];

    const toggleSidebarHandler = () => {
        document.querySelector('body')?.classList.toggle(type === "right" ? 'right-sidebar-active' : 'sidebar-active');
    };

    const hideSidebarHandler = () => {
        document.querySelector('body')?.classList.remove(type === "right" ? 'right-sidebar-active' : 'sidebar-active');
    };

    if (loading) {
        return <aside className={`col-lg-3 sidebar-fixed sticky-sidebar-wrapper ${adClass} ${type === 'left' ? 'sidebar' : 'right-sidebar'}`}>
            <div className="sidebar-overlay" onClick={hideSidebarHandler}>
                <ALink className="sidebar-close" href="#">
                    <i className="d-icon-times"></i>
                </ALink>
            </div>
            <div className="sidebar-content">
                <div className="widget-2"></div>
            </div>
        </aside>;
    }

    return (
        <aside className={`col-lg-3 sidebar-fixed sticky-sidebar-wrapper ${adClass} ${type === 'left' ? 'sidebar' : 'right-sidebar'}`}>
            <div className="sidebar-overlay" onClick={hideSidebarHandler}>
                <ALink className="sidebar-close" href="#">
                    <i className="d-icon-times"></i>
                </ALink>
            </div>

            <div className="sidebar-toggle" onClick={toggleSidebarHandler}>
                <i className={type === "right" ? "fas fa-chevron-left" : "fas fa-chevron-right"}></i>
            </div>

            <div className="sidebar-content">
                <div className="sticky-sidebar">
                    <div className="service-list mb-4">
                        <div className="icon-box icon-box-side icon-box3">
                            <span className="icon-box-icon">
                                <i className="d-icon-secure"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize">Secured Payment</h4>
                                <p>We secure payment!</p>
                            </div>
                        </div>
                        <div className="icon-box icon-box-side icon-box1">
                            <span className="icon-box-icon">
                                <i className="d-icon-truck"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize">Free Shipping</h4>
                                <p>For all orders over $99</p>
                            </div>
                        </div>
                        <div className="icon-box icon-box-side icon-box2">
                            <span className="icon-box-icon">
                                <i className="d-icon-money"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize">Money Back</h4>
                                <p>Any back within 30 days</p>
                            </div>
                        </div>
                    </div>

                    <div className="banner banner-fixed mb-7">
                        <figure>
                            <LazyLoadImage
                                src="./images/product-banner.jpg"
                                alt="banner"
                                width="280"
                                height="320"
                                effect="opacity"
                                style={{ backgroundColor: "#BDD0DE" }}
                            />
                        </figure>

                        <div className="banner-content text-center">
                            <h5 className="banner-subtitle ls-l text-uppercase mb-0">Gucci Shoes</h5>
                            <h3 className="banner-title ls-s text-uppercase mb-0">New Trend 2021</h3>
                        </div>
                    </div>

                    <div className="widget widget-products">
                        <h4 className="widget-title mb-3 lh-1 border-no text-capitalize ">Our Featured</h4>

                        <ul className="widget-body">
                            <OwlCarousel adClass="owl-nav-top" options={mainSlider7}>
                                <div className="products-col">
                                    {featured.slice(0, 3).map((product, index) => (
                                        <SmallProduct product={product} key={`small-product-${index}`} />
                                    ))}
                                </div>

                                <div className="products-col">
                                    {featured.slice(0, 3).map((product, index) => (
                                        <SmallProduct product={product} key={`small-product-${index}`} />
                                    ))}
                                </div>
                            </OwlCarousel>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default withApollo({ ssr: typeof window === "undefined" })(ProductsSidebar);
