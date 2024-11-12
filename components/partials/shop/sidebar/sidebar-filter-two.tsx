import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import filterData from '~/utils/data/shop';
import { scrollTopHandler } from '~/utils';

interface PriceRange {
    min: string;
    max: string;
}

const SidebarFilterTwo: React.FC = () => {
    const router = useRouter();
    const [isFirst, setFirst] = useState<boolean>(true);
    const query = router.query;
    let timerId: NodeJS.Timeout;

    const prices: PriceRange[] = [
        { min: '', max: '' },
        { min: '0', max: '100' },
        { min: '100', max: '200' },
        { min: '200', max: '' }
    ];

    useEffect(() => {
        const handleResize = () => resizeHandler();
        window.addEventListener('resize', handleResize, false);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isFirst) {
            setFirst(false);
        } else {
            scrollTopHandler();
        }
    }, [query]);

    const containsAttrInUrl = (type: string, value: string) => {
        const currentQueries = query[type] ? (query[type] as string).split(',') : [];
        if (type === 'min_price' || type === 'max_price') {
            return (value === '' && currentQueries.length === 0) || currentQueries.includes(value);
        } else {
            return currentQueries.includes(value);
        }
    };

    const getUrlForAttrs = (type: string, value: string) => {
        let currentQueries = query[type] ? (query[type] as string).split(',') : [];
        if (type === 'min_price' || type === 'max_price') {
            currentQueries = currentQueries.length > 0 && currentQueries.includes(value) ? [] : [value];
        } else {
            currentQueries = containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
        }
        return currentQueries.join(',');
    };

    const toggleSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('body')?.classList.remove("sidebar-active");

        const stickyWrapper = e.currentTarget.closest('.sticky-sidebar-wrapper');
        const mainContent = e.currentTarget.closest('.main-content-wrap');
        
        if (mainContent) {
            mainContent.querySelector('.product-wrapper')?.classList.toggle('cols-md-4');
        }

        if (stickyWrapper) {
            stickyWrapper.classList.toggle('closed');

            if (stickyWrapper.classList.contains('closed')) {
                mainContent?.classList.add('overflow-hidden');
                clearTimeout(timerId);
            } else {
                timerId = setTimeout(() => {
                    mainContent?.classList.remove('overflow-hidden');
                }, 500);
            }
        }
    };

    const hideSidebar = () => {
        document.querySelector('body')?.classList.remove("sidebar-active");
    };

    const resizeHandler = () => {
        document.querySelector('body')?.classList.remove("sidebar-active");
    };

    return (
        <aside className="sidebar shop-sidebar sidebar-fixed">
            <div className="sidebar-overlay" onClick={hideSidebar}></div>
            <ALink className="sidebar-close" href="#" onClick={hideSidebar}><i className="d-icon-times"></i></ALink>

            <div className="sidebar-content pb-0 pb-lg-4">
                <div>
                    <div className="filter-actions">
                        <a href="#" className="sidebar-toggle-btn toggle-remain btn btn-sm btn-outline btn-rounded btn-primary" onClick={toggleSidebar}>
                            Filter<i className="d-icon-arrow-left"></i>
                        </a>
                        <ALink href={{ pathname: router.pathname, query: { type: router.query.type || null } }} className="filter-clean" scroll={false}>Clean All</ALink>
                    </div>
                    <div className="row cols-lg-4">
                        <div className="widget">
                            <h3 className="widget-title border-no">Size</h3>
                            <ul className="widget-body filter-items">
                                {filterData.sizes.map((item, index) => (
                                    <li className={containsAttrInUrl('sizes', item.slug) ? 'active' : ''} key={`${item.slug}-${index}`}>
                                        <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, sizes: getUrlForAttrs('sizes', item.slug), type: router.query.type || null } }} scroll={false}>{item.name}</ALink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="widget">
                            <h3 className="widget-title border-no">Color</h3>
                            <ul className="widget-body filter-items">
                                {filterData.colors.map((item, index) => (
                                    <li className={containsAttrInUrl('colors', item.slug) ? 'active' : ''} key={`${item.slug}-${index}`}>
                                        <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, colors: getUrlForAttrs('colors', item.slug), type: router.query.type || null } }} scroll={false}>{item.name}</ALink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="widget price-with-count">
                            <h3 className="widget-title border-no">Price</h3>
                            <ul className="widget-body filter-items filter-price">
                                {prices.map((price, index) => (
                                    <li className={containsAttrInUrl('min_price', price.min) && containsAttrInUrl('max_price', price.max) ? 'active' : ''} key={`price-filter-${index}`}>
                                        <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, min_price: getUrlForAttrs('min_price', price.min), max_price: getUrlForAttrs('max_price', price.max), type: router.query.type || null } }} scroll={false}>
                                            {price.min === '' && price.max === '' ? 'All' :
                                                price.max === '' ? `$${price.min}.00 +` :
                                                    `$${price.min}.00 - $${price.max}.00`}
                                        </ALink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="widget">
                            <h3 className="widget-title border-no">Tags</h3>
                            <div className="widget-body pt-2">
                                {filterData.tag.map((item, index) => (
                                    <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, tag: getUrlForAttrs('tag', item.slug), type: router.query.type || null } }} className={`${containsAttrInUrl('tag', item.slug) ? 'active' : ''} tag`} key={`tag-${index}`}>
                                        {item.name}
                                    </ALink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilterTwo;
