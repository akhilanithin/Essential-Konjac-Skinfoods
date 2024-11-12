import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import OwlCarousel from '~/components/features/owl-carousel';
import SmallProduct from '~/components/features/product/product-sm';

import withApollo from '../../../../server/apollo';
import { GET_SHOP_SIDEBAR_DATA } from '../../../../server/queries';

import filterData from '~/utils/data/shop';
import { scrollTopHandler } from '~/utils';

interface SidebarFilterProps {
    type?: string;
    isFeatured?: boolean;
}

interface PriceRange {
    min: number;
    max: number;
}

const SidebarFilterOne: React.FC<SidebarFilterProps> = ({ type = "left", isFeatured = false }) => {
    const router = useRouter();
    const query = router.query;
    const { data, loading } = useQuery(GET_SHOP_SIDEBAR_DATA, { variables: { demo: 1, featured: true } });
    
    const initialPrice: PriceRange = {
        max: query.max_price ? parseInt(query.max_price as string) : 1000,
        min: query.min_price ? parseInt(query.min_price as string) : 0,
    };
    
    const [filterPrice, setPrice] = useState<PriceRange>(initialPrice);
    const [isFirst, setFirst] = useState(true);
    const sidebarData = data?.shopSidebarData;

    useEffect(() => {
        const handleResize = () => hideSidebar();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setPrice(initialPrice);
        if (isFirst) {
            setFirst(false);
        } else {
            scrollTopHandler();
        }
    }, [query]);

    const filterByPrice = (e: React.FormEvent) => {
        e.preventDefault();
        let url = router.pathname.replace('[grid]', query.grid as string);
        const arr = [
            `min_price=${filterPrice.min}`,
            `max_price=${filterPrice.max}`,
            'page=1',
        ];
        for (const key in query) {
            if (!['min_price', 'max_price', 'page', 'grid'].includes(key)) {
                arr.push(`${key}=${query[key]}`);
            }
        }
        url = url + '?' + arr.join('&');
        router.push(url);
    };

    const containsAttrInUrl = (type: string, value: string) => {
        const currentQueries = query[type] ? (query[type] as string).split(',') : [];
        return currentQueries.includes(value);
    };

    const getUrlForAttrs = (type: string, value: string) => {
        let currentQueries = query[type] ? (query[type] as string).split(',') : [];
        currentQueries = containsAttrInUrl(type, value)
            ? currentQueries.filter(item => item !== value)
            : [...currentQueries, value];
        return currentQueries.join(',');
    };

    const onChangePrice = (value: PriceRange) => {
        setPrice(value);
    };

    const toggleSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('body')?.classList.remove(`${type === "left" || type === "off-canvas" ? "sidebar-active" : "right-sidebar-active"}`);
        
        const stickyWrapper = e.currentTarget.closest('.sticky-sidebar-wrapper');
        const mainContent = e.currentTarget.closest('.main-content-wrap');
        if (mainContent && type !== "off-canvas" && query.grid !== '4cols') {
            mainContent.querySelector('.row.product-wrapper')?.classList.toggle('cols-md-4');
        }

        if (mainContent && stickyWrapper) {
            stickyWrapper.classList.toggle('closed');
            if (stickyWrapper.classList.contains('closed')) {
                mainContent.classList.add('overflow-hidden');
            } else {
                setTimeout(() => {
                    mainContent.classList.remove('overflow-hidden');
                }, 500);
            }
        }
    };

    const showSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('body')?.classList.add("sidebar-active");
    };

    const hideSidebar = () => {
        document.querySelector('body')?.classList.remove(`${type === "left" || type === "off-canvas" || type === "boxed" || type === "banner" ? "sidebar-active" : "right-sidebar-active"}`);
    };

    return (
        <aside className={`col-lg-3 shop-sidebar skeleton-body ${type === "off-canvas" ? '' : "sidebar-fixed sticky-sidebar-wrapper"} ${type === "off-canvas" || type === "boxed" ? '' : "sidebar-toggle-remain"} ${type === "left" || type === "off-canvas" || type === "boxed" || type === "banner" ? "sidebar" : "right-sidebar"}`}>
            <div className="sidebar-overlay" onClick={hideSidebar}></div>
            {type === "boxed" || type === "banner" && <a href="#" className="sidebar-toggle" onClick={showSidebar}><i className="fas fa-chevron-right"></i></a>}
            <ALink className="sidebar-close" href="#" onClick={hideSidebar}><i className="d-icon-times"></i></ALink>

            <div className="sidebar-content">
                {!loading && sidebarData ? (
                    <div className="sticky-sidebar">
                        {type !== "boxed" && type !== "banner" && (
                            <div className="filter-actions mb-4">
                                <a href="#" className="sidebar-toggle-btn toggle-remain btn btn-outline btn-primary btn-icon-right btn-rounded" onClick={toggleSidebar}>
                                    Filter
                                    {type === "left" || type === "off-canvas" ? <i className="d-icon-arrow-left"></i> : <i className="d-icon-arrow-right"></i>}
                                </a>
                                <ALink href={{ pathname: router.pathname, query: { grid: query.grid, type: router.query.type || null } }} scroll={false} className="filter-clean">Clean All</ALink>
                            </div>
                        )}

                        <div className="widget widget-collapsible">
                            <Card title="<h3 class='widget-title'>All Categories<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                <ul className="widget-body filter-items search-ul">
                                    {sidebarData.categories.map((item, index) => (
                                        item.children ? (
                                            <li key={`${item.name}-${index}`} className={`with-ul overflow-hidden ${item.slug === query.category || item.children.some(subCat => subCat.slug === query.category) ? 'show' : ''}`}>
                                                <SlideToggle collapsed={true}>
                                                    {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                        <>
                                                            <ALink href={{ pathname: router.pathname, query: { category: item.slug, grid: query.grid, type: router.query.type || null } }} scroll={false}>
                                                                {item.name}
                                                                <i className={`fas fa-chevron-down ${toggleState.toLowerCase()}`} onClick={e => { onToggle(); e.stopPropagation(); e.preventDefault(); }}></i>
                                                            </ALink>
                                                            <div ref={setCollapsibleElement}>
                                                                <div>
                                                                    <ul style={{ display: "block" }}>
                                                                        {item.children.map((subItem, subIndex) => (
                                                                            <li key={`${subItem.name}-${subIndex}`} className={`with-ul ${subItem.slug === query.category ? 'show' : ''}`}>
                                                                                <ALink scroll={false} href={{ pathname: router.pathname, query: { category: subItem.slug, grid: query.grid, type: router.query.type || null } }}>
                                                                                    {subItem.name}
                                                                                </ALink>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </SlideToggle>
                                            </li>
                                        ) : (
                                            <li key={`${item.name}-${index}`} className={query.category === item.slug ? 'show' : ''}>
                                                <ALink href={{ pathname: router.pathname, query: { category: item.slug, grid: query.grid, type: router.query.type || null } }} scroll={false}>
                                                    {item.name}
                                                </ALink>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <div className="widget widget-collapsible">
                            <Card title="<h3 class='widget-title'>Filter by Price<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                <div className="widget-body">
                                    <form action="#">
                                        <div className="filter-price-slider noUi-target noUi-ltr noUi-horizontal shop-input-range">
                                            <InputRange
                                                formatLabel={value => `$${value}`}
                                                maxValue={1000}
                                                minValue={0}
                                                step={50}
                                                value={filterPrice}
                                                onChange={onChangePrice}
                                            />
                                        </div>
                                        <div className="filter-actions">
                                            <div className="filter-price-text mb-4">
                                                Price: ${filterPrice.min} - ${filterPrice.max}
                                                <span className="filter-price-range"></span>
                                            </div>
                                            <button className="btn btn-dark btn-filter btn-rounded" onClick={filterByPrice}>Filter</button>
                                        </div>
                                    </form>
                                </div>
                            </Card>
                        </div>

                        <div className="widget widget-collapsible">
                            <Card title="<h3 class='widget-title'>Size<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                <ul className="widget-body filter-items">
                                    {filterData.sizes.map((item, index) => (
                                        <li key={`${item}-${index}`} className={containsAttrInUrl('sizes', item.slug) ? 'active' : ''}>
                                            <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, sizes: getUrlForAttrs('sizes', item.slug), type: router.query.type || null } }}>
                                                {item.name}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <div className="widget widget-collapsible">
                            <Card title="<h3 class='widget-title'>Color<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                <ul className="widget-body filter-items">
                                    {filterData.colors.map((item, index) => (
                                        <li key={`${item}-${index}`} className={containsAttrInUrl('colors', item.slug) ? 'active' : ''}>
                                            <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, colors: getUrlForAttrs('colors', item.slug), type: router.query.type || null } }}>
                                                {item.name}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <div className="widget widget-collapsible">
                            <Card title="<h3 class='widget-title'>Brand<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                <ul className="widget-body filter-items">
                                    {filterData.brands.map((item, index) => (
                                        <li key={`${item}-${index}`} className={containsAttrInUrl('brands', item.slug) ? 'active' : ''}>
                                            <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, brands: getUrlForAttrs('brands', item.slug), type: router.query.type || null } }}>
                                                {item.name}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        {isFeatured && (
                            <div className="widget widget-products widget-collapsible">
                                <h4 className='widget-title'>Our Featured</h4>
                                <div className="widget-body">
                                    <OwlCarousel adClass="owl-nav-top">
                                        <div className="products-col">
                                            {sidebarData.featured.slice(0, 3).map((item, index) => (
                                                <SmallProduct product={item} key={`${item.name}-${index}`} />
                                            ))}
                                        </div>
                                        <div className="products-col">
                                            {sidebarData.featured.slice(3, 6).map((item, index) => (
                                                <SmallProduct product={item} key={`${item.name}-${index}`} />
                                            ))}
                                        </div>
                                    </OwlCarousel>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="widget-2 mt-10 pt-5"></div>
                )}
            </div>
        </aside>
    );
};

export default withApollo({ ssr: typeof window === 'undefined' })(SidebarFilterOne);
