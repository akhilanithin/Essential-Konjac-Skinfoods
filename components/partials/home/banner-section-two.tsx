import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SectionVideos from '~/components/partials/home/SectionVideos';


import Link from 'next/link';

// import Custom Components
import OwlCarousel from '~/components/features/owl-carousel';
import { bannerSlider } from '~/utils/data/carousel';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import ALink from '~/components/features/custom-link';

// Define types for video item and state
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

const BannerSectionTwo: React.FC = () => {
    const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL!;
    const VIDEOS_PLAYLIST_ID = process.env.NEXT_PUBLIC_VIDEOS_PLAYLIST_ID!;
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

    const [videos, setVideos] = useState<VideoItem[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const noOfItems = 3;
        axios({
            method: "get",
            url: `${YOUTUBE_URL}?part=snippet&maxResults=${noOfItems}&playlistId=${VIDEOS_PLAYLIST_ID}&key=${GOOGLE_API_KEY}`,
        }).then((resp) => {
            setVideos(
                resp.data.items.filter((item: any) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video")
            );
        }).catch((err) => {
            setError(err);
        });
    }, []);

    function formatDateInDubaiTimezone(isoDateString: string): string {
        const date = new Date(isoDateString);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Dubai'
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const formattedDate = formatter.format(date);
        return formattedDate.replace(',', '');
    }

    const totalCards = videos?.length || 0;
    const middleIndices = totalCards % 2 === 1
        ? [Math.floor(totalCards / 2)]
        : [totalCards / 2 - 1, totalCards / 2];

    return (
        <section className="banner-section2 pb-4 pt-5 mt-10">
            <div className="container mt-10 pt-6 mt-md-0 pt-md-0">
                <div className="row gutter-md">
                    <div className="banner">
                        <div className="banner-content pt-lg-9 y-50">
                            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                                <div className="title-wrapper mt-1">
                                    <span className="badge">Videos</span>
                                    <h2>Our Media Gallery</h2>
                                </div>
                            </Reveal>
                            <p className="banner-desc">
                                Watch our latest videos collections on our YouTube channel. Hassle-free to watch, share, and like.
                            </p>
                            <ALink className="btn btn-link btn-underline btn-dark" href="/elements/youtube/">
                                Learn more<i className="d-icon-arrow-right"></i>
                            </ALink>
                        </div>
                    </div>

                 

                    <div className="banner-image-wrapper overflow-hidden">
                    <SectionVideos/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerSectionTwo;
