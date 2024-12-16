import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Breadcrumb from '~/components/features/breadcrumb';
import ProductTwo from './aesthetics/product-two';
import ToolBox from './aesthetics/toolbox';

import { useRouter } from 'next/router';

import ProductEight from './aesthetics/product-eight';
import ALink from '~/components/features/custom-link';

interface Post {
    id: string;
    title: string;
    price: number; // Assuming price exists for sorting
}



interface Aesthetics {
 
    type?: string;
 
}
function Aesthetics({ type = "left",itemsPerRow = 3,}): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [sortBy, setSortBy] = useState<string>('default');
    const router = useRouter();
    const { query } = router;
    const gridType = query.type || 'grid';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_CLINIC_URL as string, {
                    headers: {
                        
                        'konjac-version': '1.0.1',
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setPosts(data.data || []);
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (sortKey: string) => {
        setSortBy(sortKey);
    };

    const handlePostsPerPageChange = (perPage: number) => {
        setPostsPerPage(perPage);
        setCurrentPage(1);
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === 'default') return b.price - a.price; // Price high to low
        if (sortBy === 'popularity') return a.price - b.price; // Price low to high
        return 0;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const gridClasses: Record<number, string> = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
    };



    

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <main className="main skeleton-body">
            <Helmet>
                <title>Aesthetics</title>
            </Helmet>

            <Breadcrumb title="Aesthetics" parentUrl="/elements" />

            <div className="page-content">

                <section className="mt-10 pt-4 pb-10">

                    <div className="container">
                        
                        <ToolBox
                            type={type}
                            sortBy={sortBy}
                            postsPerPage={postsPerPage}
                            onSortChange={handleSortChange}
                            onPostsPerPageChange={handlePostsPerPageChange}
                           
                        />

{/* 

                        <div className="row">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post) => (
                                    <div key={post.id} className="col-lg-4 col-md-6 mb-4">
                                        <ProductTwo product={post} isOriginal={true} adClass="text-center" />
                                    </div>
                                ))
                            ) : (
                                <div className="info-box with-icon">
                                    <p className="mt-4">No blogs were found matching your selection.</p>
                                </div>
                            )}
                        </div> */}




                        {gridType === 'grid' ? (
                        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                            {currentPosts?.map(item => (
                                <div className="product-wrap" key={`shop-${item?.name}`}>
                                    <ProductTwo product={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="product-lists product-wrapper">
                            {currentPosts?.map(item => (
                              
                                
                                <ProductEight product={item} key={`shop-list-${item?.name}`} />
                            ))}
                        </div>
                    )}


                        <div className="pagination-wrapper">
                            <ul className="pagination">

                                <li className="page-item">
                                    <span
                                        className="page-link"
                                        onClick={handlePreviousPage}
                                        aria-disabled={currentPage === 1 ? 'true' : 'false'}
                                 
                                    >
                                       <i className="d-icon-arrow-left"></i>Prev
                                    </span>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className="page-item">
                                    <span
                                        className="page-link"
                                        onClick={handleNextPage}
                                        aria-disabled={currentPage === totalPages ? 'true' : 'false'}
                                      
                                    >
                                      Next<i className="d-icon-arrow-right"></i>
                                    </span>
                                </li>


                            </ul>
                        </div>


                    </div>
                </section>
            </div>
        </main>
    );
}

export default Aesthetics;
