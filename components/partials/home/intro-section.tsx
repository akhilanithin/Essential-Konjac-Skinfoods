import React from 'react';
import Reveal from "react-awesome-reveal";

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { introSlider } from '~/utils/data/carousel';
import { fadeInUpShorter, fadeInRightShorter } from '~/utils/data/keyframes';

function IntroSection() {
    return (
        <>
            <section className="intro-section p-relative">
                <OwlCarousel adClass="owl-theme owl-nav-fade intro-slider" options={introSlider}>
                    <div className="banner banner-fixed intro-slide1" style={{ backgroundColor: "#f6f6f6" }}>
                        <figure>
                            <video
                                src="https://eksfc.com/assets/img/homepage.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{ width: '100%', height: '1023px', objectFit: 'cover' }}
                            />
                        </figure>

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

                    <div className="banner banner-fixed intro-slide1" style={{ backgroundColor: "#f6f6f6" }}>
                        <figure>
                            <video
                                src="https://eksfc.com/assets/img/homepage.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{ width: '100%', height: '1023px', objectFit: 'cover' }}
                            />
                        </figure>

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
                </OwlCarousel >
                <div className="shape-divider shape1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path className="elementor-shape-fill" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3
                            c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
                            c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default React.memo(IntroSection);
