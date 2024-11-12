import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import filterData from '~/utils/data/shop';
import { scrollTopHandler } from '~/utils';

interface PriceRange {
    min: string;
    max: string;
}

const SidebarFilterThree: React.FC = () => {
    const router = useRouter();
    const [isFirst, setFirst] = useState<boolean>(true);
    const query = router.query;

    const prices: PriceRange[] = [
        { min: '0', max: '50' },
        { min: '50', max: '100' },
        { min: '100', max: '200' },
        { min: '200', max: '' }
    ];

    useEffect(() => {
        const handleResize = () => resizeHandler();
        window.addEventListener('resize', handleResize, false);
        document.querySelector("body")?.addEventListener("click", onBodyClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.querySelector("body")?.removeEventListener("click", onBodyClick);
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
        }
        return currentQueries.includes(value);
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

    const selectOptionHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        e.currentTarget.closest('.toolbox-item.select-menu')?.classList.toggle('opened');
    };

    const onBodyClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.select-menu.opened')) {
            document.querySelector('.select-menu.opened')?.classList.remove('opened');
        }
    };

    const hideSidebar = () => {
        document.querySelector('body')?.classList.remove("sidebar-active");
    };

    const resizeHandler = () => {
        document.querySelector('body')?.classList.remove("sidebar-active");
    };

    const selectFilterHandler = (e: React.MouseEvent) => {
        setTimeout(() => {
            const selectItems = document.querySelector('.select-items');
            if (selectItems && selectItems.children.length > 1) {
                selectItems.setAttribute('style', 'visibility: visible; opacity: 1; height: auto; margin-top: 2px; margin-bottom: 1.8rem');
            } else {
                selectItems?.setAttribute('style', '');
            }
        }, 100);
    };

    return (
        <aside className="sidebar shop-sidebar sidebar-fixed">
            <div className="sidebar-overlay" onClick={hideSidebar}></div>
            <ALink className="sidebar-close" href="#" onClick={hideSidebar}><i className="d-icon-times"></i></ALink>

            <div className="sidebar-content toolbox-left">
                <div className="toolbox-item select-menu">
                    <a className="select-menu-toggle" href="#" onClick={selectOptionHandler}>Select Size</a>
                    <ul className="filter-items">
                        {filterData.sizes.map((item, index) => (
                            <li
                                className={containsAttrInUrl('sizes', item.slug) ? 'active' : ''}
                                key={`${item.slug}-${index}`}
                                onClick={selectFilterHandler}
                            >
                                <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, sizes: getUrlForAttrs('sizes', item.slug) } }} scroll={false}>
                                    {item.name}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="toolbox-item select-menu">
                    <a className="select-menu-toggle" href="#" onClick={selectOptionHandler}>Select Color</a>
                    <ul className="filter-items">
                        {filterData.colors.map((item, index) => (
                            <li
                                className={containsAttrInUrl('colors', item.slug) ? 'active' : ''}
                                key={`${item.slug}-${index}`}
                                onClick={selectFilterHandler}
                            >
                                <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, colors: getUrlForAttrs('colors', item.slug) } }} scroll={false}>
                                    {item.name}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="toolbox-item select-menu price-with-count">
                    <a className="select-menu-toggle" href="#" onClick={selectOptionHandler}>Select Price</a>
                    <ul className="filter-items filter-price">
                        {prices.map((price, index) => (
                            <li
                                className={containsAttrInUrl('min_price', price.min) && containsAttrInUrl('max_price', price.max) ? 'active' : ''}
                                key={`price-filter-${index}`}
                                onClick={selectFilterHandler}
                            >
                                <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, min_price: getUrlForAttrs('min_price', price.min), max_price: getUrlForAttrs('max_price', price.max) } }} scroll={false}>
                                    {price.min === '' && price.max === '' ? 'All' :
                                        price.max === '' ? `$${price.min}.00 +` :
                                            `$${price.min}.00 - $${price.max}.00`}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilterThree;
