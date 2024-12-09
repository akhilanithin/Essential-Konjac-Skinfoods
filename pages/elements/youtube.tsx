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

const youtube = ({ itemsPerRow = 3 }) => {

    const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL!;
    const VIDEOS_PLAYLIST_ID = process.env.NEXT_PUBLIC_VIDEOS_PLAYLIST_ID!;
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;



    const [videos, setVideos] = useState<VideoItem[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Added loading state

    useEffect(() => {
        const noOfItems = 10000;
        setLoading(true); // Start loading when the request begins

        axios({
            method: "get",
            url: `${YOUTUBE_URL}?part=snippet&maxResults=${noOfItems}&playlistId=${VIDEOS_PLAYLIST_ID}&key=${GOOGLE_API_KEY}`,
        }).then((resp) => {


            setVideos(
                resp.data.items.filter((item: any) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video")
            );
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false); // Stop loading when the request completes
        });
    }, []);



    const [playingVideoId, setPlayingVideoId] = useState(null);

    const handlePlayClick = (videoId) => {
        setPlayingVideoId(videoId); // Set the currently playing video ID
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

            {loading && <p>Loading...</p>}  {/* Show loading text */}
            {error && <p>Error: {error.message}</p>}  {/* Show error message if there is an error */}


            <h1>Akhila</h1>




            <div className="page-content mt-10 pt-10">
                <div className="container" style={{ paddingBottom: '10rem' }}>
                    <Reveal keyframes={fadeInLeftShorter} delay={500} duration={1000} triggerOnce>
                        <div className="card-description">
                            {/* Check gridType and render accordingly */}
                            {gridType === 'grid' ? (
                                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                                    {videos?.map((video, index) => (
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
                        </div>
                    </Reveal>
                </div>
            </div>







        </main>


    );
};

export default youtube;
