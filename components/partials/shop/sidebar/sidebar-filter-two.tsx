import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
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
    { min: '0', max: '1000' },
    { min: '1000', max: '2000' },
    { min: '2000', max: '3000' },
    { min: '3000', max: '' },
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

  const getUrlForAttrs = (type: string, value: string, id?: string) => {
    let currentQueries = query[type] ? (query[type] as string).split(',') : [];

    // Combine value and id if both are provided
    const attribute = id ? `${value}:${id}` : value;

    if (type === 'min_price' || type === 'max_price') {
      currentQueries = currentQueries.length > 0 && currentQueries.includes(attribute) ? [] : [attribute];
    } else {
      currentQueries = containsAttrInUrl(type, attribute)
        ? currentQueries.filter(item => item !== attribute)
        : [...currentQueries, attribute];
    }

    return currentQueries.join(',');
  };

  const toggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('body')?.classList.remove('sidebar-active');

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
    document.querySelector('body')?.classList.remove('sidebar-active');
  };

  const resizeHandler = () => {
    document.querySelector('body')?.classList.remove('sidebar-active');
  };

  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://essentialkonjacskinfoods.com/api/v1/en/shop/0/0/0/0/5000/false/false/true/${query?.search || 'undefined'}/`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCategory(data?.data?.categories || []);
        setBrand(data?.data?.brands || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="sidebar shop-sidebar sidebar-fixed">
      <div className="sidebar-overlay" onClick={hideSidebar}></div>
      <ALink className="sidebar-close" href="#" onClick={hideSidebar}>
        <i className="d-icon-times"></i>
      </ALink>
      <div className="sidebar-content pb-0 pb-lg-4">
        <div>
          <div className="filter-actions">
            <a
              href="#"
              className="sidebar-toggle-btn toggle-remain btn btn-sm btn-outline btn-rounded btn-primary"
              onClick={toggleSidebar}
            >
              Filter<i className="d-icon-arrow-left"></i>
            </a>
            <ALink
              href={{ pathname: router.pathname, query: { type: router.query.type || null } }}
              className="filter-clean"
              scroll={false}
            >
              Clean All
            </ALink>
          </div>

          <div className="row cols-lg-4">
            {/* Category */}
            <div className="widget">
              <h3 className="widget-title border-no">Category</h3>

              <ul
                className="widget-body filter-items"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              >
                {/* "All" category selection */}
                <li className={!query?.category ? 'active' : ''}>
                  <ALink
                    href={{
                      pathname: router.pathname,
                      query: {
                        ...query,
                        page: 1,
                        category: null, // Clear the category filter to show all items
                        categoryId: '', // Set categoryId to '' to show all items
                        type: router.query.type || null,
                      },
                    }}
                    scroll={false}
                  >
                    All
                  </ALink>
                </li>

                {/* Render categories dynamically */}
                {category?.map((item, index) => {
                  const isSelected = query?.category === item?.name; // Check if the current category is selected
                  const isAnySelected = !!query?.category; // Check if any category is selected

                  return (
                    <li
                      key={`${item?.name}-${index}`}
                      className={isSelected ? 'active' : isAnySelected ? 'disabled' : ''} // Only the active category gets the "active" class
                    >
                      <ALink
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            category: isSelected ? null : item?.name, // Toggle the active category on click
                            categoryId: isSelected ? '' : item?.id.toString(), // Toggle categoryId to '' when deselected
                            type: router.query.type || null,
                          },
                        }}
                        scroll={false}
                      >
                        {item?.name}
                      </ALink>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price */}
            <div className="widget price-with-count">
              <h3 className="widget-title border-no">Price</h3>
              <ul className="widget-body filter-items filter-price">
                {prices.map((price, index) => (
                  <li
                    className={
                      containsAttrInUrl('min_price', price.min) && containsAttrInUrl('max_price', price.max)
                        ? 'active'
                        : ''
                    }
                    key={`price-filter-${index}`}
                  >
                    <ALink
                      href={{
                        pathname: router.pathname,
                        query: {
                          ...query,
                          page: 1,
                          min_price: getUrlForAttrs('min_price', price.min),
                          max_price: getUrlForAttrs('max_price', price.max),
                          type: router.query.type || null,
                        },
                      }}
                      scroll={false}
                    >
                      {price.min === '' && price.max === '' ? 'All' : price.max === '' ? `AED ${price.min}.00 +` : `AED ${price.min}.00 - AED ${price.max}.00`}
                    </ALink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div className="widget">
              <h3 className="widget-title border-no">Brand</h3>
              <ul
                className="widget-body filter-items"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              >
                {/* "All" selection */}
                <li key="all-brands" className={!query.brand ? 'active' : ''}>
                  <ALink
                    href={{
                      pathname: router.pathname,
                      query: {
                        ...query,
                        page: 1,
                        brand: undefined, // Clear the brand filter
                        brandID: '', // Clear the brandID filter
                        type: router.query.type || null,
                      },
                    }}
                    scroll={false}
                  >
                    All
                  </ALink>
                </li>

                {/* Brands list */}
                {brand?.map((item, index) => {
                  const isSelected = query.brand === item.name; // Check if the current brand is selected

                  return (
                    <li key={`${item.name}-${index}`} className={isSelected ? 'active' : ''}>
                      <ALink
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            brand: isSelected ? null : item.name, // Toggle the selected brand
                            brandID: isSelected ? '' : item.id.toString(), // Toggle brandID to '' when deselected
                            type: router.query.type || null,
                          },
                        }}
                        scroll={false}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilterTwo;
