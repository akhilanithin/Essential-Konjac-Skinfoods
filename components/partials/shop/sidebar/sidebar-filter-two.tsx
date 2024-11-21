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


    const [category, setCategory] = useState<null>(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://api.eksfc.com/api/categories?page=1&limit=100&sortField=id&sortOrder=DESC&filterName=status&filterValue=0`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRODUCT_TOKEN}`,
                        'konjac-version': '1.0.1'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategory(data.data.filter(category => category?.status === 0)); // Filter active categories
            } catch (error) {
                // console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);
    


    const [brand, setBrand] = useState<null>(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://api.eksfc.com/api/brands?page=1&limit=100&sortField=id&sortOrder=DESC`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRODUCT_TOKEN}`,
                        'konjac-version': '1.0.1'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch Brands');
                const data = await response.json();
                setBrand(data.data.filter(brand => brand?.status === 0)); 
            } catch (error) {
                // console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);
    



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

                        {/* Category  */}



                        <div className="widget">
                            <h3 className="widget-title border-no">Category</h3>

                            <ul className="widget-body filter-items">
                                {
                                    category?.map((item, index) =>
                                        <li
                                            className={containsAttrInUrl('category', item?.name) ? 'active' : ''}
                                            key={item + ' - ' + index}
                                        >
                                            <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, category: getUrlForAttrs('category', item?.name), type: router.query.type ? router.query.type : null } }} scroll={false}>{item?.name}
                                            </ALink>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>



          



{/* Price */}

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





                        {/* <div className="widget">
                            <h3 className="widget-title border-no">Brand</h3>
                            <ul className="widget-body filter-items">
                                {brand?.map((item, index) => (
                                    <li className={containsAttrInUrl('colors', item?.name) ? 'active' : ''} key={`${item?.name}-${index}`}>
                                        <ALink href={{ pathname: router.pathname, query: { ...query, page: 1, colors: getUrlForAttrs('colors', item.name), type: router.query.type || null } }} scroll={false}>{item.name}</ALink>
                                    </li>
                                ))}
                            </ul>
                        </div>
 */}





{/* Brand */}

                        <div className="widget">
                            <h3 className="widget-title border-no">Brand</h3>
                            <ul className="widget-body filter-items" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',

                            }}>
                                {brand?.map((item, index) => (
                                    <li
                                        className={containsAttrInUrl('colors', item?.name) ? 'active' : ''}
                                        key={`${item?.name}-${index}`}
                                    >
                                        <ALink
                                            href={{
                                                pathname: router.pathname,
                                                query: {
                                                    ...query,
                                                    page: 1,
                                                    colors: getUrlForAttrs('colors', item.name),
                                                    type: router.query.type || null
                                                }
                                            }}
                                            scroll={false}
                                        >
                                            {item.name}
                                        </ALink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilterTwo;
