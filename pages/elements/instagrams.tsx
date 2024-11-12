import React from 'react';
import Helmet from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import Breadcrumb from '~/components/features/breadcrumb';
import OwlCarousel from '~/components/features/owl-carousel';

import ElementsList from '~/components/partials/elements/elements-list';

import { mainSlider8, mainSlider9 } from '~/utils/data/carousel';

const Instagrams: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Riode React eCommerce Template | Instagrams</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Instagrams</h1>

            <Breadcrumb subTitle="Elements" title="Element Instagram" parentUrl="/elements" />

            <div className="page-content">
                <section className="mt-10 pt-8 mb-10 pb-4">
                    <div className="container">
                        <h2 className="title title-center">Default</h2>
                        <OwlCarousel adClass="owl-theme" options={mainSlider9}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <figure className="instagram" key={index}>
                                    <ALink href="#">
                                        <LazyLoadImage
                                            src={`./images/instagram/${index + 1}.jpg`}
                                            alt="Instagram"
                                            width="220"
                                            height="220"
                                            effect="opacity; transform"
                                            style={{ backgroundColor: "#BDD0DE" }}
                                        />
                                    </ALink>
                                </figure>
                            ))}
                        </OwlCarousel>
                    </div>
                </section>

                <section className="grey-section pt-10 pb-10">
                    <div className="container mt-4">
                        <h2 className="title title-center">Full Width</h2>
                    </div>

                    <OwlCarousel adClass="owl-theme gutter-no mb-4" options={mainSlider8}>
                        {Array.from({ length: 6 }, (_, index) => (
                            <figure className="instagram instagram-info" key={index}>
                                <ALink href="#">
                                    <LazyLoadImage
                                        src={`./images/instagram/${index + 6}.jpg`}
                                        alt="Instagram"
                                        width="220"
                                        height="220"
                                        effect="opacity; transform"
                                        style={{ backgroundColor: "#BDD0DE" }}
                                    />
                                </ALink>
                                <div className="instagram-content">
                                    <ALink href="#"><i className="d-icon-heart"></i>{Math.floor(Math.random() * 150)}</ALink>
                                    <ALink href="#"><i className="d-icon-comments"></i>{Math.floor(Math.random() * 150)}</ALink>
                                </div>
                            </figure>
                        ))}
                    </OwlCarousel>
                </section>

                <section className="mt-10 pt-4 mb-10 pb-4">
                    <div className="container">
                        <h2 className="title title-center">Masonry</h2>

                        <div className="row grid instagram-masonry">
                            {Array.from({ length: 15 }, (_, index) => (
                                <div className={`grid-item height-x${Math.ceil(Math.random() * 2)}`} key={index}>
                                    <figure className="instagram">
                                        <ALink href="#">
                                            <LazyLoadImage
                                                src={`./images/instagram/${index + 12}.jpg`}
                                                alt="Instagram"
                                                width={Math.ceil(Math.random() * 300)}
                                                height={Math.ceil(Math.random() * 500)}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#f4f4f4" }}
                                            />
                                        </ALink>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ElementsList adClass="mt-9" />
            </div>
        </>
    );
};

export default React.memo(Instagrams);
