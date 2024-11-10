import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
                            <LazyLoadImage
                                src="./images/home/slides/2.jpg"
                                alt="Intro Slider"
                                effect="opacity"
                                width="auto"
                                height="1023"
                            />
                        </figure>

                        <div className="container">
                            <div className="banner-content">
                                <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000}>
                                    <h4 className="banner-subtitle"> Amazing Scientific Results</h4>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
                                    <h2 className="banner-title">Essential Skincare<br />Collection</h2>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1300} duration={1200}>
                                    <div className="banner-desc">
                                        <p><strong>01.</strong>Helps provide moisture for the skin.</p>
                                        <p><strong>02.</strong>Helps remove injuery on the skin.</p>
                                        <p><strong>03.</strong>Helps improve the skin by making it softer.</p>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1800} duration={1200}>
                                    <ALink href="/shop" className="btn btn-primary btn-outline btn-rounded btn-icon-right">Shop
                                        Now<i className="d-icon-arrow-right"></i></ALink>
                                </Reveal>
                            </div>
                        </div>
                    </div>

                    <div className="banner banner-fixed intro-slide2" style={{ backgroundColor: "#f6f6f6" }}>
                        <figure>
                            <LazyLoadImage
                                src="./images/home/slides/1.jpg"
                                alt="Intro Slider"
                                effect="opacity"
                                width="auto"
                                height="1023"
                            />
                        </figure>

                        <div className="container">
                            <div className="banner-content">
                                <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000}>
                                    <h4 className="banner-subtitle">
                                        Natural Process
                                    </h4>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
                                    <h2 className="banner-title mb-8">
                                        Cosmetia Makeup<br />Professional</h2>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1300} duration={1200}>
                                    <div className="banner-desc pl-0 font-weight-semi-bold text-dark text-uppercase">
                                        <span className="ls-super">For-Women</span><br />
                                        Product Identifier: DD1160
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUpShorter} delay={1800} duration={1200}>
                                    <ALink href="/shop"
                                        className="btn btn-primary btn-rounded btn-icon-right">Shop
                                        Now<i className="d-icon-arrow-right"></i></ALink>
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

            <div className="divider-section1 p-relative pt-10 pb-10">
                <div className="shape-divider shape2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
                    </svg>
                </div>
                <div className="shape-divider shape3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default React.memo(IntroSection);