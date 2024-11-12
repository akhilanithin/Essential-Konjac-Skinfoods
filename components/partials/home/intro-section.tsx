import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { introSlider } from '~/utils/data/carousel';
import { fadeInUpShorter, fadeInRightShorter } from '~/utils/data/keyframes';

const IntroSection: React.FC = () => {
    return (
        <>
            <section className="intro-section p-relative">
                <OwlCarousel adClass="owl-theme owl-nav-fade intro-slider" options={introSlider}>
                    <div className="banner banner-fixed intro-slide1" style={{ backgroundColor: "#f6f6f6" }}>
                        <video
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="video-tag"
                            width="100%"
                        >
                            <source src="https://eksfc.com/assets/img/homepage.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <div className="container">
                            <div className="banner-content">
                                <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000}>
                                    <h4 className="banner-subtitle">Professional</h4>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
                                    <h1 className="banner-title">Beauty &amp; Care</h1>
                                </Reveal>

                                <Reveal keyframes={fadeInUpShorter} delay={1300} duration={1200}>
                                    <div className="banner-desc">
                                        <p>
                                            Royal elegance to love yourself more. Through<br /> consistent innovation that is aimed at <br /> developing advanced skin
                                            care products based <br /> on active ingredients.
                                        </p>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1800} duration={1200}>
                                    <ALink href="/shop" className="btn btn-primary btn-outline btn-rounded btn-icon-right">Shop Now<i className="d-icon-arrow-right"></i></ALink>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </section>
        </>
    );
};

export default React.memo(IntroSection);
