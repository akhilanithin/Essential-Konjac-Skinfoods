import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';
import Pagination from '~/components/features/pagination';

import withApollo from '~/server/apollo';

type Product = {
    slug: string;
    [key: string]: any;
};

type ProductListOneProps = {
    itemsPerRow?: number;
    type?: string;
    isToolbox?: boolean;
};

function ProductListOne({ itemsPerRow = 3, type = "left", isToolbox = true }: ProductListOneProps) {
    const router = useRouter();
    const { query } = router;

   
  
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0); // Total product count
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const filterId = query.per_page ? parseInt(query.per_page as string, 10) : null;
    const perPage = filterId === 24 ? 24 : filterId === 36 ? 36 : 12;
    const totalPages = Math.ceil(totalProducts / perPage);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://essentialkonjacskinfoods.com/api/v1/en/shop/0/0/${page}/0/5000/false/false/true/${query?.search || 'undefined'}/`
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data?.data?.products || []);
                setTotalProducts(data?.data?.prodCount || 0);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page,query.search, query.filterId]); 

    // const handlePageChange = (newPage: number) => {
    //     setPage(newPage);
    // };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const gridType = query.type || 'grid';
    const gridClasses: Record<number, string> = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
    };



    return (
        <>
            {isToolbox && <ToolBox type={type} />}

            {gridType === 'grid' ? (
                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                    {products?.map(item => (
                        <div className="product-wrap" key={`shop-${item.slug}`}>
                            <ProductTwo product={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="product-lists product-wrapper">
                    {products?.map(item => (
                        <ProductEight product={item} key={`shop-list-${item.slug}`} />
                    ))}
                </div>
            )}

            {products?.length === 0 && !loading && (
                <p className="ml-1">No products were found matching your selection.</p>
            )}

            <div className="toolbox toolbox-pagination">
                <p className="show-info">
                    Showing <span>{perPage * (page - 1) + 1} - {Math.min(perPage * page, totalProducts)} of {totalProducts}</span> Products
                </p>
                <Pagination
                    totalPage={totalPages}
                 
                
                />
            </div>
        </>
    );
}

export default withApollo({ ssr: typeof window === 'undefined' })(ProductListOne);
