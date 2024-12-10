import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import withApollo from '~/server/apollo';
import Breadcrumb from '~/components/features/breadcrumb';
import PostEight from '~/components/features/post/post-eight';
import axios from 'axios';
import { useRouter } from 'next/router';
import ToolBox from '../aesthetics/toolbox';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface PostsResponse {
    data: Post[];
    count: number;
}

function BlogPosts({ itemsPerRow = 3, type = "left" }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN!;
    const router = useRouter();
    const { query } = router;
    const gridType = query?.type || 'grid';

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const gridClasses: Record<number, string> = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
    };

    const fetchPosts = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const response = await axios.get<PostsResponse>(
                `https://api.eksfc.com/api/blogs/?page=${page}&limit=${limit}&sortField=title&sortOrder=DESC`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'konjac-version': '1.0.1',
                    },
                }
            );
            setPosts(response?.data?.data);
            setTotalPosts(response.data.count);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage, postsPerPage);
    }, [currentPage, postsPerPage]);

    const handlePostsPerPageChange = (perPage: number) => {
        setPostsPerPage(perPage);
        setCurrentPage(1); // Reset to the first page
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
                <title>Riode React eCommerce Template | Blog</title>
            </Helmet>
            <h1 className="d-none">Riode React eCommerce Template - Blog</h1>
            <Breadcrumb title="Blog" parentUrl="/elements" />

            <div className="page-content">
                <section className="pt-10 pb-10">
                    <div className="container mt-4">
                        <ToolBox
                            type={type}
                            postsPerPage={postsPerPage}
                            onPostsPerPageChange={handlePostsPerPageChange}
                        />

                        {gridType === 'grid' ? (
                            posts.length ? (
                                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                                    {posts.map((post, index) => (
                                        <div className="product-wrap" key={post.id || index}>
                                            <PostEight post={post} isOriginal={true} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="info-box with-icon">
                                    <p className="mt-4">No blogs were found matching your selection.</p>
                                </div>
                            )
                        ) : (
                            posts.map((post, index) => (
                                <React.Fragment key={post?.id || index}>
                                    <div className="blog-post">
                                        <PostEight post={post} isOriginal={true} />
                                    </div>
                                </React.Fragment>
                            ))
                        )}


{/* Pagination */}
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

export default withApollo({ ssr: typeof window === "undefined" })(BlogPosts);
