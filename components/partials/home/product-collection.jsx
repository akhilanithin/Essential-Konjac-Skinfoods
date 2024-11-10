import Reveal from "react-awesome-reveal";
import { useRef, useEffect } from "react";

// import Custom Components
import ALink from '~/components/features/custom-link';
import ProductTwo from '~/components/features/product/product-two';

import { fadeIn } from '~/utils/data/keyframes'

export default function ProductCollection(props) {
    const { products, loading } = props;
    const ref = useRef();
    let iso;

    useEffect(() => {
        if (products && products.length > 0) {
            createIso();
        }
    }, [products])

    async function createIso() {
        await isotopeLoad();
        isoFilter(null, 'body');
    }

    async function isotopeLoad() {
        const Isotope = (await import('isotope-layout')).default;
        iso = new Isotope(ref.current, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: ''
            }
        });
    }

    function getProductCategory(product) {
        return product.categories.reduce((acc, cur) => {
            return acc + " " + cur.slug;
        }, "");
    }

    function isoFilter(e, cat) {
        if (e) {
            e.preventDefault();
            e.currentTarget.closest('.nav-filters').querySelector('.active').classList.remove('active');
            e.currentTarget.classList.add('active');
        }
        iso.arrange({
            filter: function (index, itemElem) {
                if (cat == '') return true;
                return itemElem.classList.contains(cat);
            }
        });
    }

    return (
        <div className="product-filter-section container pt-10 mt-10 pb-8">
            <Reveal keyframes={fadeIn} delay={200} duration={300} triggerOnce>
                <div className="title-wrapper mt-1">
                    <h2 className="text-left title with-link">Top Categories<ALink href="/shop">View All
                                Products<i className="d-icon-arrow-right"></i></ALink></h2>
                    <span className="badge">Featured</span>
                </div>
            </Reveal>
            <div className="row">
                <div className="col-md-3 mb-6 mb-md-0">
                    <div className="nav-filters">
                        <ul className="nav-filters product-filters mr-0">
                            <li><a href="#" className="nav-filter active" onClick={e => isoFilter(e, 'body')}>Body</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'cosmetiawera')}>CosmetiaWERA</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'feeling-like-cosmetia')}>Feeling like Cosmetia</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'fragrance')}>Fragrance</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'makeup')}>Makeup</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'save-on-sets')}>Save on Sets</a></li>
                            <li><a href="#" className="nav-filter" onClick={e => isoFilter(e, 'skincare')}>Skincare</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row grid" id="products-grid" ref={ref}>
                        {
                            loading ?
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    <div className="grid-item col-md-4 col-6">
                                        <div className="product-loading-overlay" key={'best-selling-skel-' + item}></div>
                                    </div>
                                }
                                )
                                :
                                products && products.map((item, index) =>
                                    <div className={`grid-item col-md-4 col-6 ${getProductCategory(item)} `} key={`best-product-${index}`}>
                                        <ProductTwo
                                            adClass="shadow-product text-center mb-2"
                                            product={item} />
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}