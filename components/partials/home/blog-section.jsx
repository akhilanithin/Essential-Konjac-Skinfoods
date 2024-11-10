import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import PostEight from '~/components/features/post/post-eight';

import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { mainSlider6 } from '~/utils/data/carousel';

function BlogSection(props) {
    const { posts } = props;

    return (
        <section className="blog-section mt-8 mb-10 bg-white" style={{ backgroundImage: 'url(images/home/banner/5.jpg)' }}>
            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1000} triggerOnce>
                <div className="container">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mt-1 mb-5">
                            <h2 className="text-left title with-link text-white">Our Latest Blog</h2>
                            <span className="badge text-white">Who we are</span>
                        </div>
                    </Reveal>

                    <OwlCarousel adClass="owl-theme owl-shadow-carousel" options={mainSlider6}>
                        {
                            posts && posts.length ?
                                posts.slice(15, 18).map((post, index) => (
                                    <React.Fragment key={"post-eight" + index}>
                                        <div className="blog-post mb-4">
                                            <PostEight post={post} adClass="overlay-zoom" />
                                        </div>
                                    </React.Fragment>
                                )) : ''
                        }
                    </OwlCarousel>
                </div>
            </Reveal>
        </section>
    )
}

export default React.memo(BlogSection);