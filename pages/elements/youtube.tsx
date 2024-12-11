// pages/about.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import ALink from '~/components/features/custom-link';
import Reveal from 'react-awesome-reveal';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRouter } from 'next/router';

import ProductTwo from './Youtube/product-two';
import ToolBox from '~/pages/elements/Youtube/toolbox';

interface VideoItem {
    snippet: {
        title: string;
        thumbnails: {
            standard: { url: string };
        };
        resourceId: { videoId: string };
        publishedAt: string;
    };
}

const youtube = ({ itemsPerRow = 3, isToolbox = true, type = "left" }) => {
    const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL!;
    const VIDEOS_PLAYLIST_ID = process.env.NEXT_PUBLIC_VIDEOS_PLAYLIST_ID!;
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

    const [videos, setVideos] = useState<VideoItem[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(6); // Default to 12
    const [currentPage, setCurrentPage] = useState(1);
    const [playingVideoId, setPlayingVideoId] = useState(null);

    useEffect(() => {
        const noOfItems = 10000;
        setLoading(true);

        axios({
            method: "get",
            url: `${YOUTUBE_URL}?part=snippet&maxResults=${noOfItems}&playlistId=${VIDEOS_PLAYLIST_ID}&key=${GOOGLE_API_KEY}`,
        }).then((resp) => {
            setTotalPosts(resp?.data?.items?.length);
            setVideos(
                resp.data.items.filter((item: any) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video")
            );
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handlePlayClick = (videoId) => {
        setPlayingVideoId(videoId);
    };

    const router = useRouter();
    const { query } = router;
    const gridType = query.type || 'grid';
    const gridClasses: Record<number, string> = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
    };

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const handlePostsPerPageChange = (perPage: number) => {
        setPostsPerPage(perPage);
        setCurrentPage(1); // Reset to the first page
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

    const paginatedVideos = videos?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);


    

    return (
        <main className="main about-us">
            <Helmet>
                <title>Riode React eCommerce Template | About Us</title>
            </Helmet>
            <h1 className="d-none">Riode React eCommerce Template - About Us</h1>

            {/* About Section */}
            <div className="page-header shop" style={{
                backgroundImage: `url(https://eksfc.com/assets/img/detail-main-bg.jpg)`,
                backgroundColor: "#E4EAEA"
            }}>
                <h1 className="page-title text-dark ls-m font-weight-bold mb-2">YOUTUBE</h1>
                <ul className="breadcrumb">
                    <li>
                        <ALink href="/">
                            <i className="d-icon-home"></i>
                        </ALink>
                    </li>
                    <li className="delimiter">/</li>
                    <li>Youtube</li>
                </ul>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div className="page-content mt-10 pt-10">
                <div className="container" style={{ paddingBottom: '10rem' }}>
                    <Reveal keyframes={fadeInLeftShorter} delay={500} duration={1000} triggerOnce>
                        <div className="card-description">
                            {isToolbox && <ToolBox onPostsPerPageChange={handlePostsPerPageChange} type={type} />}

                            {/* Check gridType and render accordingly */}
                            {gridType === 'grid' ? (
                                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                                    {paginatedVideos?.map((video, index) => (
                                        <div className="product-wrap" key={`shop-${index}`}>
                                            <ProductTwo video={video} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="product-lists product-wrapper">
                                    <h1>Nothing to display</h1>
                                </div>
                            )}

                            {videos?.length === 0 && !loading && (
                                <p className="ml-1">No products were found matching your selection.</p>
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
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
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
                    </Reveal>
                </div>
            </div>
        </main>
    );
};

export default youtube;
