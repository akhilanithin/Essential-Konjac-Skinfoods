import React from 'react';
import Helmet from 'react-helmet';
import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/custom-link';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';

import { fadeIn } from '~/utils/data/keyframes';

const ComingSoon: React.FC = () => {
    return (
        <main className="main faq">
            <Helmet>
                <title>FAQs</title>
            </Helmet>

            <h1 className="d-none">FAQs</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>FAQs</li>
                    </ul>
                </div>
            </nav>

            <div className="page-header" style={{ backgroundImage: 'url(https://eksfc.com/assets/img/detail-main-bg.jpg)' }}>
                {/* <h1 className="page-subtitle lh-1">FAQ</h1> */}
                <h1 className="page-title font-weight-bold text-capitalize lh-1">FAQ</h1>
            </div>

            <div className="page-content mb-10 pb-8">
                <Reveal keyframes={fadeIn} delay={100} duration={1000} triggerOnce>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-10">
                                    {/* <h2 className="title pl-2 pr-2 ls-m text-left">Customer Management</h2> */}

                                    <Accordion adClass="accordion-border accordion-boxed accordion-plus">
                                        <Card title="1.&nbsp; Where is your exact location, we did not find?
                                        " expanded={ true }>
                                            <p className="mb-0 text-center" >Its in Nadd Al Hammar, Union Coop. Besides Nadd Al Hamar AL Kabayel.</p>
                                        </Card>

                                        <Card title="2.&nbsp; What are your outlet timings?">
                                            <p className="mb-0 text-center">We are operating from 10:00AM to 10:00PM in normal days. On weekend we are on until 12:00AM</p>
                                        </Card>

                                        <Card title="3.&nbsp; Is the any male salesman?">
                                            <p className="mb-0 text-center">Yes we have a combination of male and femal staff. All of them are fully qualified and uto mark, can guide you the best way.</p>
                                        </Card>
                                        <Card title="4.&nbsp;Should i use whitening suppliments while pregnancy?">
                                            <p className="mb-0 text-center">No, please don't use any kind of suppliment either whitening or any other while pregnancy without doctor recomendations.</p>
                                        </Card>
                                        <Card title="5.&nbsp;Should i used facial serums with makeup?">
                                            <p className="mb-0 text-center">No, don't mix facial serum with any make up. Facial serums or essence are an organic treatment to skin.</p>
                                        </Card>
                                        <Card title="6.&nbsp;Should i use sun block on sensitive skin?">
                                            <p className="mb-0 text-center">Yes, there are options avaliable for sensitive skin. Try to use light sun block upto 30 spf. Stay away from 50 spf sun blocks.</p>
                                        </Card>
                                        <Card title="7.&nbsp;Shoul i use facial serum is day time?">
                                            <p className="mb-0 text-center">Yes, most of the facial serums you can use any time but night time is always more effective as compared to day time.</p>
                                        </Card>
                                        <Card title="8.&nbsp;Where is your exact location, we did not find?">
                                            <p className="mb-0 text-center">The foundation of every makeup look is the base and Shalini eiusmod tempor incididunt ut labore et dolore magna.</p>
                                        </Card>
                                        <Card title="9.&nbsp;Should i use multiple whitening suppliments together?">
                                            <p className="mb-0 text-center">No, don't mix the multiple suppliments. Try to use of and monitor the results. Always covern with the specialist for ideal results.</p>
                                        </Card>
                                        <Card title="10.&nbsp;How can i remove strech mark from my skin?">
                                            <p className="mb-0 text-center">Strech mark are always appearing in the skin when fiber cells are getting down or damaged. For cure try to used Vitamin C.</p>
                                        </Card>
                                        <Card title="11.&nbsp;How can i remove scars from my skin?">
                                            <p className="mb-0 text-center">Mostly scars are the results of UV damages in skin. You have to increase Vitamin E in your body to overcome the scars damages.</p>
                                        </Card>
                                        <Card title="12.&nbsp;How can i reduce acne?">
                                            <p className="mb-0 text-center">It's important to wash your face twice daily to remove impurities, dead skin cells, and extra oil from your skin's surface. Use warm, water and a mild facial cleanser.</p>
                                        </Card>

                                    </Accordion>
                                </div>                            
                            </div>
                        </div>
                    </section>
                </Reveal>

             
            </div>
        </main>
    );
}

export default React.memo(ComingSoon);
