// pages/about.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import ALink from '~/components/features/custom-link';
import Reveal from 'react-awesome-reveal';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';

import { LazyLoadImage } from 'react-lazy-load-image-component';











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

const youtube = () => {

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
                <h1 className="page-title text-dark ls-m font-weight-bold mb-2">ABOUT</h1>
                <ul className="breadcrumb">
                    <li>
                        <ALink href="/">
                            <i className="d-icon-home"></i>
                        </ALink>
                    </li>
                    <li className="delimiter">/</li>
                    <li>About</li>
                </ul>

            </div>

            {loading && <p>Loading...</p>}  {/* Show loading text */}
            {error && <p>Error: {error.message}</p>}  {/* Show error message if there is an error */}



            

            
            {videos?.map((video, index) => (
                <div className="page-content mt-10 pt-10" key={index}>
                    <div className="container" style={{ paddingBottom: '10rem' }}>
                        <Reveal keyframes={fadeInLeftShorter} delay={500} duration={1000} triggerOnce>
                            <div className="card-description overlay-zoom">
                 


                                <figure className="p-relative">
                                    {playingVideoId !== video?.snippet?.resourceId?.videoId && (
                                        <div className="video-placeholder">
                                            <LazyLoadImage
                                                className="w-100 d-block"
                                                src={video?.snippet?.thumbnails?.standard?.url}
                                                alt="Product"
                                                // width="1140"
                                                // height="550"
                                            />
                                            <a
                                                className="btn-play btn-iframe"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent default link behavior
                                                    handlePlayClick(video?.snippet?.resourceId?.videoId);
                                                }}
                                            >
                                                <i className="d-icon-play-solid"></i>
                                            </a>
                                        </div>
                                    )}

                                    {playingVideoId === video?.snippet?.resourceId?.videoId && (
                                        <div className="video-placeholder">
                                            <iframe
                                                width="1140"
                                                height="550"
                                                src={`https://www.youtube.com/embed/${video?.snippet?.resourceId?.videoId}?autoplay=1`}
                                                title={video?.snippet?.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </figure>
                            </div>
                        </Reveal>
                    </div>
                </div>
            ))}

       

           
        







          
        </main>


    );
};

export default youtube;
