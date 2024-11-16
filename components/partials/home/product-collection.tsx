import Reveal from "react-awesome-reveal";
import { useRef, useEffect, useState } from "react";
import ALink from '~/components/features/custom-link';
import ProductTwo from '~/components/features/product/product-two';
import { fadeIn } from '~/utils/data/keyframes';

interface Product {
    feature: number;
    category?: string | string[];
    [key: string]: any; // Add other product properties as needed
}

interface Category {
    name: string;
}

interface Data {
    data: {
        trending: Product[];
        trendingCategories: Category[];
    };
}

export default function ProductCollection() {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
    const ref = useRef<HTMLDivElement | null>(null);
    const isoRef = useRef<any>(null); // Ref for Isotope instance



    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://essentialkonjacskinfoods.com/api/v1/en/home');
                if (!response.ok) throw new Error('Network response was not ok');
                const result: Data = await response.json();

                setData(result);
                setLoading(false);


                

                // Calculate category counts
                const counts: { [key: string]: number } = { all: 0 };
                result.data.trending.forEach(item => {
                    if (item.feature === 1) {
                        counts.all += 1;
                        const categories = getProductCategory(item);
                        categories.forEach(cat => {
                            counts[cat] = (counts[cat] || 0) + 1;
                        });
                    }
                });
                setCategoryCounts(counts);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

   
    function getProductCategory(product: Product): string[] {
        if (!product.category) return [];
        const categories = Array.isArray(product.category) ? product.category : [product.category];
        return categories.map(cat => (cat as any)?.name);
    }

    function isoFilter(e: React.MouseEvent<HTMLAnchorElement> | null, cat: string) {
        if (e) {
            e.preventDefault();
            const activeFilter = e.currentTarget.closest('.nav-filters')?.querySelector('.active');
            activeFilter?.classList.remove('active');
            e.currentTarget.classList.add('active');
        }

        if (isoRef.current) {
            isoRef.current.arrange({
                filter: (itemElem: Element) => {
                    console.log('Item Element:', itemElem); // Debugging output

                    if (cat === 'all') return true;

                    if (!itemElem || !itemElem.classList) {
                        console.error('Item element or classList is undefined', itemElem);
                        return false;
                    }

                    return itemElem.classList.contains(cat.split(" ")[0]);
                }
            });
        }
    }

    const filteredProducts = data?.data.trending.filter(item => {
        const categories = getProductCategory(item);
        const meetsCategoryFilter = selectedCategory === 'all' || categories.includes(selectedCategory);
        const isFeatured = item.feature === 1;

        return meetsCategoryFilter && isFeatured;
    }) || [];

    return (
        <div className="product-filter-section container pt-10 mt-10 pb-8">
            {error && <div className="alert alert-danger">Failed to load products. Please try again later.</div>}
            <Reveal keyframes={fadeIn} delay={200} duration={300} triggerOnce>
                <div className="title-wrapper mt-1">
                    <h2 className="text-left title with-link">
                        Trending Products
                        <ALink href="/shop">View All Products<i className="d-icon-arrow-right"></i></ALink>
                    </h2>
                    <span className="badge">Featured</span>
                </div>
            </Reveal>
            <div className="row">
                <div className="col-md-3 mb-6 mb-md-0">
                    <div className="nav-filters">
                        <ul className="nav-filters product-filters mr-0">
                            <li>
                                <a href="#" className={`nav-filter ${selectedCategory === 'all' ? 'active' : ''}`} onClick={e => {
                                    e.preventDefault();
                                    setSelectedCategory('all');
                                    isoFilter(e, 'all');
                                }}>
                                    All ({categoryCounts.all || 0})
                                </a>
                            </li>
                            {data?.data.trendingCategories.map((category, index) => (
                                <li key={index}>
                                    <a href="#" className={`nav-filter ${selectedCategory === category.name ? 'active' : ''}`} onClick={e => {
                                        e.preventDefault();
                                        setSelectedCategory(category.name);
                                        isoFilter(e, category.name);
                                    }}>
                                        {category.name} ({categoryCounts[category.name] || 0})
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="row grid" id="products-grid" ref={ref}>
                        {loading ? (
                            [1, 2, 3, 4, 5, 6].map(item => (
                                <div className="grid-item col-md-4 col-6" key={`best-selling-skel-${item}`}>
                                    <div className="product-loading-overlay"></div>
                                </div>
                            ))
                        ) : (
                            filteredProducts.map((item, index) => (
                                <div className={`grid-item col-md-4 col-6 ${getProductCategory(item).join(' ')}`} key={`best-product-${index}`}>
                                    <ProductTwo adClass="shadow-product text-center mb-2" product={item} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
