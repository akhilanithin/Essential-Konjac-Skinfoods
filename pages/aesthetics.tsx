import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import withApollo from '~/server/apollo';
import { mainSlider13 } from '~/utils/data/carousel';
import OwlCarousel from '~/components/features/owl-carousel';
import Breadcrumb from '~/components/features/breadcrumb';
import PostFour from '~/pages/aesthetics/post-four';

interface Post {
    id: string;
    title: string;
    // Add other fields as necessary
}

interface PostsData {
    posts: {
        data: Post[];
    };
}

function Aesthetics(): JSX.Element {
    const [data, setData] = useState<PostsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12); // 3 rows * 4 columns = 12 posts per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_CLINIC_URL as string, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLINIC_TOKEN}`,
                        'konjac-version': '1.0.1',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
                // console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const posts = data?.data || [];

    // Calculate the indices for the posts to display on the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Pagination handler
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <main className="main skeleton-body">
            <Helmet>
                <title>Riode React eCommerce Template | Blog</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Blog</h1>

            <Breadcrumb title="Aesthetics" parentUrl="/elements" />

            <div className="page-content">
                <section className="mt-10 pt-4 pb-10">
                    <div className="container">
                        <div className="row">
                            {/* Render the posts in a grid */}
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post, index) => (
                                    <div key={post.id} className="col-lg-4 col-md-6 mb-4">
                                        <PostFour post={post} isOriginal={true} adClass="text-center" />
                                    </div>
                                ))
                            ) : (
                                <div className="info-box with-icon">
                                    <p className="mt-4">No blogs were found matching your selection.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-wrapper">
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default withApollo({ ssr: typeof window === "undefined" })(Aesthetics);
