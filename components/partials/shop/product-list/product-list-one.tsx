import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';
import Pagination from '~/components/features/pagination';
import withApollo from '~/server/apollo';

interface Product {
    slug: string;
    title: string;
    price: number;
    // Add other relevant properties here
}

interface ProductsResponse {
    data: Product[];
    total: number;
}

interface ProductListProps {
    itemsPerRow?: number;
    type?: string;
    isToolbox?: boolean;
}

const ProductListOne: React.FC<ProductListProps> = ({ itemsPerRow = 3, type = "left", isToolbox = true }) => {
    const router = useRouter();
    const { query } = router;

    const [products, setProducts] = useState<ProductsResponse>({ data: [], total: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);





    // Determine items per page based on filterId
    const filterId = query.per_page ? parseInt(query.per_page as string, 10) : null;

    
    const perPage = filterId === 24 ? 24 : filterId === 36 ? 36 : 12;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    // console.log(perPage);
  
   

   
   


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.eksfc.com/api/products?page=${page}&limit=${perPage}&sortField=id&sortOrder=DESC&search=${query.search || ''}&filterName=status&filterValue=0`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRODUCT_TOKEN}`,
                        'konjac-version': '1.0.1'
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch products');

                const data: ProductsResponse = await response.json();
                const filteredData = data.data.filter(product => product.status === 0); // Filter active products

                // setProducts(data);


                
                

                setProducts({ data: filteredData, total: data.total });
                setLoading(false);



               
                
            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred while fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, perPage, query.search, query.filterId]);





    
    const totalPage = Math.ceil(products.total / perPage) || 1;



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
            {loading ? (
                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                    {[...Array(perPage)].map((_, index) => (
                        <div className="product-loading-overlay" key={`popup-skel-${index + 1}`} />
                    ))}
                </div>
            ) : (
                <>
                    {gridType === 'grid' ? (
                        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                            {products.data.map(item => (
                                <div className="product-wrap" key={`shop-${item?.name}`}>
                                    <ProductTwo product={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="product-lists product-wrapper">
                            {products.data.map(item => (
                              
                                
                                <ProductEight product={item} key={`shop-list-${item?.name}`} />
                            ))}
                        </div>
                    )}
                    {products.data.length === 0 && !loading &&  (
                        <p className="ml-1">No products were found matching your selection.</p>
                    )}
                    {products.total > 0 && (
                        <div className="toolbox toolbox-pagination">
                            <p className="show-info">
                                Showing <span>{perPage * (page - 1) + 1} - {Math.min(perPage * page, products.total)} of {products.total}</span> Products
                            </p>
                            <Pagination totalPage={totalPage} />
                        </div>
                    )}
                </>
            )}
            {error && <p className="ml-1">{error}</p>}
        </>
    );
};

export default ProductListOne;
