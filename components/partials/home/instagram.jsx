import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn } from '~/utils/data/keyframes';
import { mainSlider5 } from '~/utils/data/carousel';
import { useEffect, useState } from 'react';
import ALink from '~/components/features/custom-link';

// async function getPosts() {
//     const res = await fetch('api/insta-posts/')
//     if (!res.ok) {
//       throw new Error('Failed to fetch data')
//     }
//     return res.json()
// }

export default function Instagram() {


    // const[posts,setPosts] = useState([])
    // useEffect(() => {
    //     getPosts().then(resp => {
    //         setPosts(resp)
    //     })
    // },[])



    return (
<></>
        // <section className="instagram-section pt-lg-10 pb-8">
        //     <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
        //         <div className="container pb-8 pt-8">
        //             <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
        //                 <div className="title-wrapper mb-5 mt-1">
        //                     <h2 className="text-left title with-link">Our Instagram</h2>
        //                     <span className="badge">Featured</span>
        //                 </div>
        //             </Reveal>
        //             {/* <OwlCarousel adClass="owl-theme brand-carousel" options={mainSlider5}>
        //                 { posts && posts.map((post, key) => (
        //                     <figure key={key} className="instagram">
        //                         <a href={post.permalink} target='_blank'>
        //                             <LazyLoadImage
        //                                 src={post.media_url}
        //                                 alt={post.caption}
        //                                 effect="opacity"
        //                                 width="280"
        //                                 height="280"
        //                             />
        //                         </a>
        //                     </figure>
        //                 ))}
        //             </OwlCarousel> */}
        //             { posts && posts.length > 9 &&
        //                 <div className="row grid instagram-masonry">
        //                     <div className="grid-item height-x2">
        //                         <figure className="instagram">
        //                             <ALink href={posts[0].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[0].media_type == "IMAGE" ? posts[0].media_url : posts[0].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="580"
        //                                     height="346"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x15">
        //                         <figure className="instagram">
        //                             <ALink href={posts[1].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[1].media_type == "IMAGE" ? posts[1].media_url : posts[1].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="249"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x1">
        //                         <figure className="instagram">
        //                             <ALink href={posts[2].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[2].media_type == "IMAGE" ? posts[2].media_url : posts[2].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="188"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x2">
        //                         <figure className="instagram">
        //                             <ALink href={posts[3].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[3].media_type == "IMAGE" ? posts[3].media_url : posts[3].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="322"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x25">
        //                         <figure className="instagram">
        //                             <ALink href={posts[4].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[4].media_type == "IMAGE" ? posts[4].media_url : posts[4].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="465"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x2">
        //                         <figure className="instagram">
        //                             <ALink href={posts[5].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[5].media_type == "IMAGE" ? posts[5].media_url : posts[5].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="367"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x1">
        //                         <figure className="instagram">
        //                             <ALink href={posts[6].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[6].media_type == "IMAGE" ? posts[6].media_url : posts[6].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="176"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x1">
        //                         <figure className="instagram">
        //                             <ALink href={posts[7].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[7].media_type == "IMAGE" ? posts[7].media_url : posts[7].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="176"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                     <div className="grid-item height-x1">
        //                         <figure className="instagram">
        //                             <ALink href={posts[8].permalink}>
        //                                 <LazyLoadImage
        //                                     src={posts[8].media_type == "IMAGE" ? posts[8].media_url : posts[8].thumbnail_url}
        //                                     alt="Instagram"
        //                                     width="280"
        //                                     height="188"
        //                                     effect="opacity; transform"
        //                                     style={ { backgroundColor: "#f4f4f4" } }
        //                                 />
        //                             </ALink>
        //                         </figure>
        //                     </div>
        //                 </div>
        //             }
        //         </div>
        //     </Reveal>
        // </section>
    )
}