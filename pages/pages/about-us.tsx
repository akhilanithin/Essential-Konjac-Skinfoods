import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import CountUp from 'react-countup';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { mainSlider16 } from '~/utils/data/carousel';


import ErrorPage from '~/pages/pages/404';



import { mainSlider4, mainSlider6, mainSlider7 } from '~/utils/data/carousel';


import axios from 'axios';


const AboutUs: React.FC = () => {


    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    const handlePlayClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsPlaying(true);
    };
  
    useEffect(() => {
        countToHandler();
        window.addEventListener('scroll', countToHandler, true);

        return () => {
            window.removeEventListener('scroll', countToHandler);
        };
    }, []);

    const countToHandler = () => {
        const items = document.querySelectorAll<HTMLElement>('.count-to');

        items.forEach(item => {
            if (
                item.getBoundingClientRect().top > 0 &&
                window.innerHeight - item.offsetHeight > item.getBoundingClientRect().top &&
                !item.classList.contains('finished')
            ) {
                const button = item.querySelector('button');
                if (button) button.click();
                item.classList.add('finished');
            }
        });
    };




    const [brand, setBrand] = useState([]);
    const [error, setError] = useState(null);


    const fetchPosts = async () => {
   
        try {
            const response = await axios.get(
                `https://essentialkonjacskinfoods.com/api/v1/en/shop/0/0/1/0/1000/false/false/true/undefined`,
                {
                    headers: {
                      
                        'konjac-version': '1.0.1',
                    },
                }
            );
            setBrand(response?.data?.data?.brands);
        } catch (err) {
            setError(err as Error);
        } finally {
           
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);



    if (error) return <ErrorPage />;

  const  image_url=process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL

  console.log(image_url);
  

    

    return (
        <main className="main about-us">
            <Helmet>
                <title>Riode React eCommerce Template | About Us</title>
            </Helmet>
            <h1 className="d-none">Riode React eCommerce Template - About Us</h1>

            {/* About Section */}

            <div className="page-header shop" style={{ backgroundImage: `url(https://eksfc.com/assets/img/detail-main-bg.jpg)`, backgroundColor: "#E4EAEA" }}>
                <h1 className="page-title text-dark ls-m font-weight-bold mb-2">ABOUT</h1>
                <ul className="breadcrumb">
                    <li>
                        <ALink href="/">
                            <i className="d-icon-home"></i>
                        </ALink>
                    </li>
                    <li className="delimiter">/</li>
                    <li>About</li>
                </ul>

            </div>



           
            <div className="page-content mt-10 pt-10">

            <h3 className="section-title lh-2 ls-md font-weight-normal  text-center">Promotion video</h3>
            <h1 className="section-title lh-1 font-weight-bold text-center mb-5">Welcome to Konjac SkinFood.</h1>
            <h5 className="section-subtitle lh-2 ls-md font-weight-normal  text-center">Today we can offer our customers exclusive products of 108 <br /> brands marked "only in Konjac SkinFoode"</h5>



                <div className="container" style={{paddingBottom:'10rem'}}>
                    <Reveal keyframes={fadeInLeftShorter} delay={500} duration={1000} triggerOnce>

                        <div className="card-description overlay-zoom">
                            <figure className="p-relative">




                                {!isPlaying && (
                                    <div className="video-placeholder">
                                        <img
                                            className="w-100 d-block"
                                            src="https://eksfc.com/assets/img/promo-video-img.jpg"
                                            alt="Product"
                                            width="550"
                                            height="550"
                                        />
                                        <a className="btn-play btn-iframe" href="#" data="/uploads/video/video-1.mp4" onClick={handlePlayClick}>
                                            <i className="d-icon-play-solid"></i>
                                        </a>

                                    </div>
                                )}

                                    {/* Display the iframe when playing */}
                                    {isPlaying && (


                                    <div className="video-placeholder">
                                              <iframe width="1140" height="550" src="https://www.youtube.com/embed/K1yp7Q1hH1c" title="Рекламный  ролик, макияж в стиле Fashion" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                                    </div>

                                        )}

                          

                            </figure>
                        </div>
                    </Reveal>
                </div>

             

                     
                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="about-section pb-10">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-4 mb-10 mb-lg-4">
                                    <h3 className="section-title lh-1 font-weight-bold">Provide perfect and practical services</h3>
                                </div>



                                <div className="col-lg-8">
                                    <div className="row">


                                        {[
                                            { end: 2300, title: 'Products' },
                                            { end: 108, title: 'Brands' },
                                            { end: 32, title: 'partners' },
                                            { end: 618, title: 'customers' },
                                          
                                           
                                        ].map(({ end, title }) => (
                                            <div className="col-md-3 mb-4" key={title}>
                                                <div className="counter text-center text-dark">
                                                    <CountUp start={0} end={end} duration={4}>
                                                        {({ countUpRef, start }) => (
                                                            <div className="count-to">
                                                                <span ref={countUpRef} />
                                                                <button onClick={start} className="d-none">Start</button>
                                                            </div>
                                                        )}
                                                    </CountUp>
                                                    <h5 className="count-title font-weight-bold text-body ls-md">{title}</h5>
                                                   
                                                </div>
                                            </div>
                                        ))}

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>




{/* mission ,Vision,goal */}



                <div className="advantages">
                    <div className="wrapper">
                        <div className="advantages-items">
                            <div className="advantages-item">
                                <div className="advantages-item__icon">
                                    <i className="icon-natural"></i>
                                </div>
                                <h4>Mission</h4>
                                <p>
                                    We aim to bring healthy and organic skin care products having all natural
                                    ingredients which create high quality skin care products that are designed to
                                    treat, rejuvenate, improve and enhance our customer looks, as well as improve the
                                    overall lifestyles of our customers by helping them look beautiful and regaining
                                    their confidence.
                                </p>
                            </div>

                            <div className="advantages-item">
                                <div className="advantages-item__icon">
                                    <i className="icon-quality"></i>
                                </div>
                                <h4>Vision</h4>
                                <p>
                                    We aim to bring healthy and organic skin care products having all natural
                                    ingredients which create high quality skin care products that are designed to
                                    treat, rejuvenate, improve and enhance our customer looks, as well as improve the
                                    overall lifestyles of our customers by helping them look beautiful and regaining
                                    their confidence.
                                </p>
                            </div>

                            <div className="advantages-item">
                                <div className="advantages-item__icon">
                                    <i className="icon-organic"></i>
                                </div>
                                <h4>Goal</h4>
                                <p>
                                    Our goal is to educate our customers that will helps them to make a right choices.
                                    Offer customers suitable and low budget skin treatment plans and products. Keeping
                                    the customer confident safe and secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


{/* testimonials */}


                <section className="pt-10 pb-10 parallax" >
                    <div className="container mt-4 mb-4">
                        <h2 className="title title-center title-black mb-0">Testimonials</h2>

                        <OwlCarousel adClass="owl-theme owl-dot-black" options={mainSlider4}>
                            <div className="testimonial testimonial-centered testimonial-bg">
                                <div className="testimonial-info">
                                    <figure className="testimonial-author-thumbnail">
                                        <img src="https://eksfc.com/assets/img/client1.jpeg" alt="user" width={50} height={50} />
                                    </figure>
                                    <blockquote>“ The best skincare products i had ever tried in life. I am able to heal my sking like a teenager with in few week by using Cosmetic by Tahera products. ”</blockquote>
                                    <cite>
                                    Fatima Alawiaqi
                                    {/* <span>Investor</span> */}
                                    </cite>
                                </div>
                            </div>
                            <div className="testimonial testimonial-centered testimonial-bg">
                                <div className="testimonial-info">
                                    <figure className="testimonial-author-thumbnail">
                                        <img src="https://eksfc.com/assets/img/client2.jpeg" alt="user" width={50} height={50} />
                                    </figure>
                                    <blockquote>“ My hairs were dull and unhralthy since long time i was trying many haircare products but not getting the desired result than i came to Cosmetic by Tahera i wish i have to came before. Amazing results. ”</blockquote>
                                    <cite>
                                    Nouf Al Yafi
                                        {/* <span>Investor</span> */}
                                    </cite>
                                </div>
                            </div>
                            <div className="testimonial testimonial-centered testimonial-bg">
                                <div className="testimonial-info">
                                    <figure className="testimonial-author-thumbnail">
                                        <img src="https://eksfc.com/assets/img/client3.jpeg" alt="user" width={50} height={50} />
                                    </figure>
                                    <blockquote>“ I am always searching for a best makeup produst in the market and i have found of getting makeup items. Since i got products Cosmetics by tahera literally it change my life. The elegance, the purity and the organic products they provided no one can compete ”</blockquote>
                                    <cite>
                                    Tahera Al Redha
                                        {/* <span>Investor</span> */}
                                    </cite>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </section>





                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="brand-section grey-section pt-10 pb-10">
                        <div className="container mt-8 mb-10">
                       
                            <h3 className="section-title lh-1 font-weight-bold text-center mb-5">Popular Brands</h3>

                            <OwlCarousel adClass="owl-theme" options={mainSlider16}>
                                {/* {Array.from({ length: 6 }, (_, index) => (
                                    <figure className="brand-wrap bg-white banner-radius" key={index}>
                                        <img src={`./images/brands/${index + 1}.png`} alt="Brand" width="180" height="100" />
                                    </figure>
                                ))} */}


{brand?.map((product, index) => (


  <figure className="brand-wrap bg-white banner-radius" key={index}>
    <img 
      src={`${image_url}/brands/${product?.img}`} 
      alt="Brand" 
      width="180" 
      height="110" 
    />
  </figure>
))}



                            </OwlCarousel>
                        </div>
                    </section>
                </Reveal>






                {/*  Meet our teams*/}

                {/* <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="team-section pt-8 mt-10 pb-10 mb-6">
                        <div className="container">
                            <h5 className="section-subtitle lh-2 ls-md font-weight-normal mb-1 text-center"> Our Leaders</h5>
                            <h3 className="section-title lh-1 font-weight-bold text-center mb-5">Meet our team</h3>
                            <div className="row cols-sm-2 cols-md-4">
                                {[
                                    { name: 'Tomasz Treflerzan', job: 'CEO / Founder', img: './images/subpages/team1.jpg' },
                                    { name: 'Dylan Chavez', job: 'Support Manager / Founder', img: './images/subpages/team2.jpg' },
                                    { name: 'Viktoriia Demianenko', job: 'Designer', img: './images/subpages/team3.jpg' },
                                    { name: 'Mikhail Hnatuk', job: 'Support', img: './images/subpages/team4.jpg' }
                                ].map(({ name, job, img }, index) => (
                                    <Reveal keyframes={fadeInLeftShorter} delay={(index + 1) * 10} duration={1000} triggerOnce>
                                        <div className="member" key={name}>
                                            <figure className="banner-radius">
                                                <LazyLoadImage
                                                    src={img}
                                                    alt={`Team member ${name}`}
                                                    width={280}
                                                    height={280}
                                                    effect="opacity"
                                                    style={{ backgroundColor: "#EEE" }}
                                                />
                                                <div className="overlay social-links">
                                                    <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                                                    <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                                                    <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-linkedin fab fa-linkedin-in"></ALink>
                                                </div>
                                            </figure>
                                            <h4 className="member-name">{name}</h4>
                                            <h5 className="member-job">{job}</h5>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                </Reveal> */}


            </div>
        </main>
    );
};

export default React.memo(AboutUs);


