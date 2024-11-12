import React from 'react';
import Reveal from "react-awesome-reveal";
import OwlCarousel from '~/components/features/owl-carousel';
import { serviceSlider } from '~/utils/data/carousel';
import { fadeInUpShorter } from '~/utils/data/keyframes';

const ServiceBox: React.FC = () => {
    return (
        <section className="pb-9 mt-8 pt-4 service-list-section p-relative">
            <div className="shape-divider shape4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
                        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
                        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
                </svg>
            </div>
            <div className="container">
                <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                    <div className="service-list service-list-lg">
                        <OwlCarousel adClass="owl-theme owl-shadow-carousel show-shadow" options={serviceSlider}>
                            <div className="icon-box icon-box-side flex-column">
                                <i className="icon-box-icon d-icon-truck mr-0"></i>
                                <div className="icon-box-content mb-1 text-center">
                                    <h4 className="icon-box-title text-normal">Free Shipping &amp; Return</h4>
                                    <p className="text-grey">Get free delivery of your orders<br />
                                            all over the world.</p>
                                </div>
                            </div>
                            <div className="icon-box icon-box-side flex-column">
                                <i className="icon-box-icon d-icon-service mr-0"></i>
                                <div className="icon-box-content mb-1 text-center">
                                    <h4 className="icon-box-title text-normal">Customer Support</h4>
                                    <p className="text-grey">We provide convenient support of<br />24/7 for
                                            our customers.</p>
                                </div>
                            </div>
                            <div className="icon-box icon-box-side flex-column">
                                <i className="icon-box-icon d-icon-money mr-0"></i>
                                <div className="icon-box-content mb-1 text-center">
                                    <h4 className="icon-box-title text-normal">Moneyback Guarantee</h4>
                                    <p className="text-grey">We fully guarantee our money<br />
                                            back policy with no doubt.</p>
                                </div>
                            </div>
                            <div className="icon-box icon-box-side flex-column">
                                <i className="icon-box-icon d-icon-card mr-0"></i>
                                <div className="icon-box-content mb-1 text-center">
                                    <h4 className="icon-box-title text-normal">20% Off Your First Order</h4>
                                    <p className="text-grey">Get our first gift - 20% off for your<br />
                                            first ordered product.</p>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default React.memo(ServiceBox);
