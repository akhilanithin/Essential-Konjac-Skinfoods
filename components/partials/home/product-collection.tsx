import Reveal from "react-awesome-reveal";
import { useRef, useEffect } from "react";
import OwlCarousel from '~/components/features/owl-carousel';
import { productSlider2 } from '~/utils/data/carousel';
import ALink from '~/components/features/custom-link';
import ProductTwo from '~/components/features/product/product-two';
import { fadeIn } from '~/utils/data/keyframes';

// Define types for props
interface ProductCategory {
    name: string;
}

interface Product {
    feature: boolean;
    category: Record<string, any>; // You can define a more specific type if you know the structure
}

interface Data {
    trendingCategories: ProductCategory[];
    trending: Product[];
}

interface Props {
    data: { data: Data };
    loading: boolean;
}

const ProductCollection: React.FC<Props> = ({ data, loading }) => {
    const ref = useRef<HTMLDivElement>(null);
    let iso: any;

    useEffect(() => {
        if (data?.data.trendingCategories) {
            createIso();
        }
    }, [data?.data.trendingCategories]);

    async function createIso() {
        await isotopeLoad();
        isoFilter(null, 'all'); // Default to showing all items
    }

    async function isotopeLoad() {
        const Isotope = (await import('isotope-layout')).default;
        iso = new Isotope(ref.current!, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: ''
            }
        });
    }

    function isoFilter(e: React.MouseEvent<HTMLAnchorElement> | null, cat: string) {
        if (e) {
            e.preventDefault();
            const activeElement = e.currentTarget.closest('.nav-filters')?.querySelector('.active');
            if (activeElement) {
                activeElement.classList.remove('active');
            }
            e.currentTarget.classList.add('active');
        }
        if (iso) {
            iso.arrange({
                filter: (index: number, itemElem: HTMLElement) => {
                    if (cat === 'all') return true;
                    return itemElem.classList.contains(cat.split(' ')[0]);
                }
            });
        }
    }

    function getProductCategory(product: Product): string { 
        const formattedArray = Object.entries(product.category).map(([key, value]) => ({ key, value }));
        const createdOnEntry = formattedArray.find(item => item.key === "name");
        return createdOnEntry ? createdOnEntry.value : "other";
    }

    function getProductCount(categoryName: string): number {
        return data?.data.trending.filter((product) => {
            // Check if the category matches and the product's feature is 1 (or true)
            return getProductCategory(product) === categoryName && product?.feature === 1;
        }).length || 0; // Default to 0 if no matching products
    }


    function getTotalFeaturedProducts(): number {
        return data?.data.trendingCategories.reduce((sum, category) => {
            return sum + getProductCount(category.name);
        }, 0) || 0;
    }




    
    return (
        <div className="product-filter-section container pt-10 mt-10 pb-8">
            <Reveal keyframes={fadeIn} delay={200} duration={300} triggerOnce>
                <div className="title-wrapper mt-1">
                    <h2 className="text-left title with-link">
                        Trending products
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
                                <a href="#" className="nav-filter active" onClick={e => isoFilter(e, 'all')}>
                                    All ({getTotalFeaturedProducts()})
                                </a>
                            </li>
                            {data?.data.trendingCategories.map((category, index) => (
                                <li key={index}>
                                    <a href="#" className="nav-filter" onClick={e => isoFilter(e, category.name)}>
                                        {category.name} ({getProductCount(category.name)})
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
                                <div className="grid-item col-md-4 col-6" key={'loading-' + item}>
                                    <div className="product-loading-overlay"></div>
                                </div>
                            ))
                        ) : (
                            data?.data.trending && data.data.trending.map((item, index) => (
                                item?.feature ? (
                                    <div className={`grid-item col-md-4 col-6 ${getProductCategory(item)}`} key={`product-${index}`}>
                                        <ProductTwo adClass="shadow-product text-center mb-2" product={item} />
                                    </div>
                                ) : null
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCollection;
