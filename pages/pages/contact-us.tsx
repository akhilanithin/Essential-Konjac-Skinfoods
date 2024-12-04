import React from 'react';
import Helmet from 'react-helmet';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GoogleMapReact from 'google-map-react';

import ALink from '~/components/features/custom-link';
import { fadeIn } from '~/utils/data/keyframes';

interface AnyReactComponentProps {
    text: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => <div>{text}</div>;

const ContactUs: React.FC = () => {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    return (
        <main className="main contact-us">
            <Helmet>
                <title>Riode React eCommerce Template | Contact Us</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Contact Us</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </nav>

            <div className="page-header" style={{ backgroundImage: 'url(https://eksfc.com/assets/img/detail-main-bg.jpg)', backgroundColor: "#92918f" }}>
                <h1 className="page-title font-weight-bold text-capitalize ls-l">Contact Us</h1>
            </div>

            <div className="page-content mt-10 pt-7">


                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="contact-section">
                        <div className="container">
                            <div className="row">

                                {/* Details section */}
                                <div className="col-lg-3 col-md-4 col-sm-6 ls-m mb-4">
                                    <div className="grey-section d-flex align-items-center h-100">
                                        <div>
                                            <h4 className="mb-2 text-capitalize">Headquarters</h4>
                                            <p>G05, Union Coop Nadd Al Hamar<br />Dubai, UAE</p>

                                            <h4 className="mb-2 text-capitalize">Phone Number</h4>
                                            <p>
                                                <ALink href="#">+971 4 385 6663</ALink><br />
                                               
                                            </p>

                                            <h4 className="mb-2 text-capitalize">Support</h4>
                                            <p className="mb-4">
                                                <ALink href="#">support@essentialkonjacskinfoods <br /> .com
                                                </ALink><br />
                                               
                                            </p>

                                            <h4 className="mb-2 text-capitalize">service</h4>
                                            <p className="mb-4">
                                                <ALink href="#">Sun - Sat: 10 am - 10 pm
                                                </ALink><br />
                                                <ALink href="#"> 24/7 online available
                                                </ALink><br />

                                               
                                               
                                            </p>
                                        </div>
                                    </div>
                                </div>

{/* Message Section */}


                                <div className="col-lg-9 col-md-8 col-sm-6 d-flex align-items-center mb-4">
                                    <div className="w-100">
                                        <form className="pl-lg-2" action="#">
                                            <h4 className="ls-m font-weight-bold">Let’s Connect</h4>
                                            <p>Your email address will not be published. Required fields are marked *</p>
                                            <div className="row mb-2">
                                                <div className="col-12 mb-4">
                                                    <textarea className="form-control" required placeholder="Comment*"></textarea>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input className="form-control" type="text" placeholder="Name *" required />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input className="form-control" type="email" placeholder="Email *" required />
                                                </div>
                                            </div>
                                            <button className="btn btn-dark btn-rounded">Post Comment<i className="d-icon-arrow-right"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>





{/* we take care of you  */}

                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="contact-section">
                        <div className="container">
                            <div className="row">


                            <div className="col-lg-12 col-md-8 col-sm-6 d-flex align-items-center mb-4">


                                    <div className="w-100">
                                    
                                            <h4 className="ls-m font-weight-bold">We take care of you</h4>
                                            <p>Email us if you have any questions, we will be sure to contact you and find a solution. Also, our managers will help you choose the product that suits you best, at the best price. From year to year, the Konjac SkinFood network develops and improves, taking into account all consumer needs and market trends. But for us, the concern remains that when coming to the Konjac SkinFood store, customers do not have questions about the convenience and comfort of shopping, product quality and the level of professionalism of sales consultants.</p>
                                          
                                        
                                    </div>
                                </div>


                                {/* col-lg-3  */}

                                {/* Details section */}
                                <div className="col-md-4 col-sm-6 ls-m mb-4">
                                <div className="social-links share-on">
                                            <h5 className="text-uppercase font-weight-bold mb-0 mr-4 ls-s">Find us here:</h5>

                                            <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-icon social-facebook" title="Facebook"><i className="fab fa-facebook-f"></i></ALink>

                                            <ALink href="https://twitter.com/KonjacSkin" className="social-link social-icon social-twitter" title="Twitter"><i className="fab fa-twitter"></i></ALink>

                                            <ALink href="https://www.instagram.com/konjacskinfood/" className="social-link social-icon social-instagram" title="Instagram"><i className="fab fa-instagram"></i></ALink>

                                            <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-icon social-pinterest" title="Linkdin"><i className="fab fa-linkedin-in"></i></ALink>
                                        </div>
                                </div>


                             
                            </div>
                        </div>
                    </section>
                </Reveal>















                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="store-section mt-6 pt-10 pb-8">
                        <div className="container">
                            <h2 className="title title-center mb-7 text-normal">Our Shop & Office</h2>
                            <div className="row cols-sm-2 ">
                                {/* Repeat this block for each store */}
                                {['Shop','Office'].map((city, index) => (
                                    <div className="store" key={index}>
                                        <figure className="banner-radius">
                                            <LazyLoadImage
                                                src={`./images/subpages/store-${index + 1}.jpg`}
                                                alt="store"
                                                width={280}
                                                height={280}
                                                effect="opacity"
                                                style={{ backgroundColor: "#EEE" }}
                                            />
                                            <h4 className="overlay-visible">{city}</h4>
                                            <div className="overlay overlay-transparent">
                                                <ALink className="mt-8" href={`mailto:mail@support@essentialkonjacskinfoods
                                                .com`}>support@essentialkonjacskinfoods
                                                .com</ALink>
                                                <ALink href="tel:#">Phone: +971 4 385 6663</ALink>
                                                <div className="social-links mt-1">
                                                    <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                                                    <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                                                    <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-linkedin fab fa-linkedin-in"></ALink>
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </Reveal>















                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14441.52443508!2d55.3924337!3d25.1903671!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69937086ec75%3A0x9ff883970ec693d2!2sEssential%20Konjac%20Skin%20Food!5e0!3m2!1sen!2sae!4v1698133026374!5m2!1sen!2sae"
                        width="100%"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: '0px' }}
                    />



                </Reveal>


                
            </div>
        </main>
    );
};

export default React.memo(ContactUs);
