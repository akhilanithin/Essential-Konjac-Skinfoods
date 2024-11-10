import { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { bannerSlider } from '~/utils/data/carousel';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';

async function getVidoes() {
    const res = await fetch('api/youtube-posts/')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default function BannerSectionTwo() {
    const[videos,setVideos] = useState([])
    useEffect(() => {
        getVidoes().then(resp => {
            setVideos(resp)
        })
    },[])

    return (
        <section className="banner-section2 pb-4 pt-5 mt-10">
            <div className="container mt-10 pt-6 mt-md-0 pt-md-0">
                <div className="row gutter-md">
                    <div className="banner">
                        <div className="banner-content pt-lg-9 y-50">
                            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                                <div className="title-wrapper mt-1">
                                    <h2 className="text-left title">Our Amazing Videos</h2>
                                    <span className="badge">Youtube Channel</span>
                                </div>
                            </Reveal>
                            <p className="banner-desc">
                                Royal elegance to love yourself more. Through consistent innovation that is aimed at developing advanced skin care products based on active ingredients.
                            </p>
                            <ALink className="btn btn-link btn-underline btn-dark" href="/shop">Learn more<i className="d-icon-arrow-right"></i></ALink>
                        </div>
                    </div>
                    <div className="banner-image-wrapper overflow-hidden">
                        <Reveal keyframes={fadeInLeftShorter} delay={600} duration={1000} triggerOnce>
                            <OwlCarousel adClass="banner-carousel owl-theme owl-shadow-carousel" options={bannerSlider}>
                                { videos && videos.map((video, index) => index < 3 && (
                                    <a href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`} target="_blank">
                                        <div className="image-box overlay-dark" key={index}>
                                            <figure>
                                                <LazyLoadImage
                                                    src={video?.snippet?.thumbnails?.standard?.url}
                                                    alt="banner"
                                                    effect="opacity"
                                                    width="240"
                                                    height="320"
                                                />
                                            </figure>
                                            <div className="text-center">
                                                <p>{video.snippet.title}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))
                                }
                            </OwlCarousel>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}