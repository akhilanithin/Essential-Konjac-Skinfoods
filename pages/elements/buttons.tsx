import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';
import Breadcrumb from '~/components/features/breadcrumb';

import ElementsList from '~/components/partials/elements/elements-list';

import { parallaxHandler } from '~/utils';

const Buttons: React.FC = () => {
    useEffect(() => {
        window.addEventListener('scroll', parallaxHandler, true);

        return () => {
            window.removeEventListener('scroll', parallaxHandler, true);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Riode React eCommerce Template | Buttons</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Buttons</h1>

            <Breadcrumb subTitle="Elements" title="Element Buttons" parentUrl="/elements" />

            <div className="page-content mt-10 pt-10">
                <section className="section-buttons">
                    <div className="container">
                        <div className="mb-10 pb-2">
                            <div className="title-wrapper">
                                <h2 className="title title-center">Default Style</h2>
                                <p className="text-center">Select between any button styles and color you want.</p>
                            </div>

                            <div className="row">
                                {['Default', 'Primary Color', 'Secondary Color', 'Alert Color', 'Success Color', 'Dark Color'].map((text, index) => (
                                    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <ALink href="#" className={`btn ${text === 'Default' ? '' : `btn-${text.split(' ')[0].toLowerCase()}`} btn-block`}>
                                            {text}
                                        </ALink>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-10">
                                <h2 className="title title-sm title-center">Default Border</h2>
                                <div className="row">
                                    {['Default', 'Primary Color', 'Secondary Color'].map((text, index) => (
                                        <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-4">
                                            <ALink href="#" className={`btn btn-outline btn-block ${text === 'Primary Color' ? 'btn-primary' : text === 'Secondary Color' ? 'btn-secondary' : ''}`}>
                                                {text}
                                            </ALink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-10">
                                <h2 className="title title-sm title-center">Light Border</h2>
                                <div className="row">
                                    {['Alert Color', 'Success Color', 'Dark Color'].map((text, index) => (
                                        <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-4">
                                            <ALink href="#" className={`btn btn-outline btn-outline-light btn-${text.split(' ')[0].toLowerCase()} btn-block`}>
                                                {text}
                                            </ALink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-buttons grey-section pt-10">
                    <div className="container">
                        <div className="mb-10 mt-4 pb-2">
                            <div className="title-wrapper">
                                <h2 className="title title-center">Flat With Icon</h2>
                                <p className="text-center">Add included Riode icons to default buttons, using any color.</p>
                            </div>

                            <div className="row">
                                {['Slide Left', 'Slide Right', 'Slide Up', 'Slide Down', 'Reveal Left', 'Reveal Right'].map((text, index) => (
                                    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <ALink href="#" className={`btn btn-block ${text.includes('Slide') ? `btn-icon-left btn-${text.split(' ')[1].toLowerCase()}` : 'btn-reveal'}`}>
                                            <i className={`d-icon-arrow-${text.split(' ')[1].toLowerCase()}`}></i>
                                            <span>{text}</span>
                                        </ALink>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-10">
                                <h2 className="title title-sm title-center">Shadow</h2>
                                <div className="row">
                                    {['Shadow1', 'Shadow2', 'Shadow3'].map((text, index) => (
                                        <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-4">
                                            <ALink href="#" className={`btn btn-shadow${text.includes('1') ? '-sm' : ''} btn-white btn-block`}>
                                                <span>{text}</span>
                                            </ALink>
                                        </div>
                                    ))}
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                        <ALink href="#" className="btn btn-primary btn-shadow-lg btn-rounded btn-block">
                                            <span>Rounded</span>
                                        </ALink>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                        <ALink href="#" className="btn btn-primary btn-shadow-lg btn-ellipse btn-block">
                                            <span>Ellipse</span>
                                        </ALink>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                        <ALink href="#" className="btn btn-shadow btn-disabled btn-block">
                                            <span>Disabled</span>
                                        </ALink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-10">
                                <h2 className="title title-sm title-center">Block With Icon</h2>
                                <ALink className="btn btn-outline btn-block" href="#">Full Width</ALink>
                                <ALink className="btn btn-primary btn-block btn-icon-right" href="#">Full Width</ALink>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-buttons pt-10">
                    <div className="container">
                        <div className="btn-simple-wrapper mb-10 mt-4 pb-1">
                            <h2 className="title title-center mb-7">Simple Button</h2>

                            <div className="row align-items-center">
                                {['Underline 1', 'Underline 2', 'Underline 3', 'Primary Color', 'Secondary Color', 'Success Color'].map((text, index) => (
                                    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <ALink href="#" className={`btn btn-underline ${text.includes('1') ? 'sm' : text.includes('2') ? '' : 'lg'} btn-link`}>
                                            {text}
                                        </ALink>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10 pb-1">
                            <div className="title-wrapper">
                                <h2 className="title title-center">Shape & Size</h2>
                                <p className="text-center mb-2">Size might vary from smaller screen to a larger screen.</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 btn-wrapper">
                                    {['Large Size', 'Normal Size', 'Medium Size', 'Small Size'].map((text, index) => (
                                        <ALink key={index} href="#" className={`btn btn-outline ${text.includes('Large') ? 'btn-lg' : ''}`}>
                                            {text}
                                        </ALink>
                                    ))}
                                </div>
                                <div className="col-lg-6 btn-wrapper">
                                    {['Rectangle', 'Rounded', 'Ellipse'].map((text, index) => (
                                        <ALink key={index} href="#" className={`btn btn-block btn-outline ${text.toLowerCase()}`}>
                                            {text}
                                        </ALink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-buttons background-section parallax" data-option="{'speed': 1}" style={{ backgroundImage: 'url(./images/buttons/banner.jpg)' }}>
                    <div className="container">
                        <div className="title-wrapper title-white">
                            <h2 className="title title-center">On Background</h2>
                            <p className="text-center">These are the Button Style on dark Background.</p>
                        </div>

                        <div className="row">
                            {['Default', 'Primary Color', 'Secondary Color', 'Alert Color', 'Success Color', 'Dark Color'].map((text, index) => (
                                <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                    <ALink href="#" className={`btn btn-block ${text === 'Default' ? '' : `btn-${text.split(' ')[0].toLowerCase()}`}`}>
                                        {text}
                                    </ALink>
                                </div>
                            ))}
                            {['Default', 'Primary Color', 'Secondary Color', 'Alert Color', 'Success Color', 'White Color'].map((text, index) => (
                                <div key={index + 6} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                    <ALink href="#" className={`btn btn-outline btn-block ${text === 'White Color' ? 'btn-white' : `btn-${text.split(' ')[0].toLowerCase()}`}`}>
                                        {text}
                                    </ALink>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ElementsList />
            </div>
        </>
    );
};

export default React.memo(Buttons);
