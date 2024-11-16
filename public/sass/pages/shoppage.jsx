import { useState, useEffect } from 'react';
import ProductTwo from '~/components/features/product/product-two';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://eksfc.com/shop');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setProducts(result.products || []);
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container pt-10 mt-10 pb-8">
            <h2 className="text-left title">All Products</h2>
            <div className="row">
                {products.map((product, index) => (
                    <div className={`col-md-4 col-6`} key={`product-${index}`}>
                        <ProductTwo product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
