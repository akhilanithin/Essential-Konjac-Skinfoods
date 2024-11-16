import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProductTwo from '~/components/features/product/product-two';
import Reveal from 'react-awesome-reveal';
import { fadeIn } from '~/utils/data/keyframes';

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!category) return;
            try {
                const response = await fetch('https://essentialkonjacskinfoods.com/api/v1/en/home');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const products = data?.data?.products || [];
    const filteredProducts = products.filter(product =>
        category === '' || product.categories.some(cat => cat.slug === category)
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data found</div>;

    return (
        <div className="product-filter-section container pt-10 mt-10 pb-8">
            <Reveal keyframes={fadeIn} delay={200} duration={300} triggerOnce>
                <div className="title-wrapper mt-1">
                    <h2 className="text-left title">Category: {category}</h2>
                </div>
            </Reveal>
            <div className="row">
                <div className="col-md-12">
                    <div className="row grid">
                        {filteredProducts.map((item) => (
                            <div className={`grid-item col-md-4 col-6 ${item.categories.map(cat => cat.slug).join(' ')}`} key={item.slug}>
                                <ProductTwo product={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
