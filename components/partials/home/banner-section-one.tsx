import Reveal from "react-awesome-reveal";
import { connect } from 'react-redux';
import { useState, MouseEvent } from "react";

// import Custom Components
import ALink from '~/components/features/custom-link';
import { modalActions } from '~/store/modal';
import { fadeInLeftShorter, fadeInRightShorter } from '~/utils/data/keyframes';

interface BannerSectionOneProps {
    openModal: (link: string) => void;
}

const BannerSectionOne: React.FC<BannerSectionOneProps> = ({ openModal }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlayClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsPlaying(true);
    };

    const showVideoModalHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const link = e.currentTarget.closest('.btn-play')?.getAttribute('data');
        if (link) {
            openModal(link);
        }
    };

    return (
        <section className="banner-section pt-md-6 pb-8">
            <div className="container">
                <div className="row">

                    {/* About us-success story section */}
                    <div className="col-md-6">
                        <div className="banner h-100">
                            <div className="banner-content pr-lg-4 y-50">
                                <Reveal keyframes={fadeInRightShorter} delay={300} duration={1000} triggerOnce>
                                    <span className="banner-subtitle text-black font-weight-bold text-uppercase">
                                        Success Story
                                    </span>

                                    <h2>Konjac SkinFood Develops Its Own Brands</h2>

                                    <p>The Konjac SkinFoode network is being developed and improved, taking into account all consumer needs.</p>

                                    <p>Forming the range of stores, we strive not only to meet the format of "home shop", offering each customer the most basic household goods, but also to create a unique space of beauty and care. Konjac SkinFoode stores offer their customers the widest and highest quality selection of products from world-renowned manufacturers.</p>
                                </Reveal>

                                <ALink href="/shop" className="btn btn-dark btn-icon-right mb-1">Shop Now <i className="d-icon-arrow-right"></i></ALink>
                            </div>
                        </div>
                    </div>

                    {/* Skin Analyzer */}
                    <div className="col-md-6">
                        <Reveal keyframes={fadeInLeftShorter} delay={500} duration={1000} triggerOnce>
                            <div className="card-description overlay-zoom">
                                <figure className="p-relative">
                                    <div className="video-container">
                                        {!isPlaying && (
                                            <div className="video-placeholder">
                                                <img
                                                    className="w-100 d-block"
                                                    src="https://s.alicdn.com/@sc04/kf/H9cc5104808ed4876af83a68d8920448ej.jpg"
                                                    alt="Product"
                                                    width="550"
                                                    height="410"
                                                />
                                                <a
                                                    className="btn-play"
                                                    href="#"
                                                    onClick={handlePlayClick}
                                                >
                                                    <i className="d-icon-play-solid"></i>
                                                </a>
                                            </div>
                                        )}

                                        {/* Display the iframe when playing */}
                                        {isPlaying && (
                                            <iframe
                                                width="550"
                                                height="410"
                                                src="https://www.youtube.com/embed/1CjpntmL5H8"
                                                title="AI BITMOJI Skin Analyzer - HERCA"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                </figure>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-10 shape-divider shape5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
                            c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
                            c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
                </svg>
            </div>
        </section>
    );
}

export default connect(null, { openModal: modalActions.openModal })(BannerSectionOne);
