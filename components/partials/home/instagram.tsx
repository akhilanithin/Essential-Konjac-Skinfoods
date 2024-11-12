import React, { useEffect, useState } from "react";
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OwlCarousel from '~/components/features/owl-carousel';
import { fadeIn } from '~/utils/data/keyframes';
import { mainSlider5 } from '~/utils/data/carousel';
import axios from 'axios';

interface InstagramPost {
    id: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    caption?: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    username: string;
}

const Instagram: React.FC = () => {
    const instagramURL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '';
    const facebookAccessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN || '';

    const [instagram, setInstagram] = useState<InstagramPost[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const numOfPhotos = 500;
        axios({
            method: "get",
            url: `${instagramURL}&limit=${numOfPhotos}&access_token=${facebookAccessToken}`
        })
        .then((resp) => {
            const posts = resp.data.data as InstagramPost[];
            setInstagram(posts.filter((post) => post.media_type === "VIDEO"));
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [instagramURL, facebookAccessToken]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="instagram-section pt-lg-10 pb-8">
            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                <div className="container pb-8 pt-8">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mb-5 mt-1">
                            <h2 className="text-left title with-link">Our Instagram</h2>
                            <span className="badge">Featured</span>
                        </div>
                    </Reveal>
                    <OwlCarousel adClass="owl-theme brand-carousel" options={mainSlider5}>
                        {instagram.map((item, index) => (
                            <figure className="instagram" key={index}>
                                <a href={item.permalink}>
                                    <LazyLoadImage
                                        src={item.thumbnail_url || ''}
                                        alt="Instagram Video"
                                        threshold={500}
                                        effect="opacity"
                                        width="280"
                                        height="280"
                                    />
                                </a>
                            </figure>
                        ))}
                    </OwlCarousel>
                </div>
            </Reveal>
        </section>
    );
};

export default Instagram;
