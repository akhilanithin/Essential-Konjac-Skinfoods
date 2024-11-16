import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/custom-link';

import { videoHandler } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';

function PostEight(props) {
    const { post, adClass = 'mb-7', isLazy = false, isOriginal = false, btnText = "Read more", btnAdClass = '' } = props;
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


//   console.log(post.thumbnails);

    // console.log(post.image);
console.log(post?.id);

    
    

    return (
        <div className={`post post-frame ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
            {
                (post.type === 'image' || post.type === 'video') ?
                    <figure className="post-media">
                        {
                            isLazy ?
                                <ALink href={ `/blog/single/${ post?.id }` }>
                                    <LazyLoadImage
                                        // src={isOriginal ? post.originalImageUrl : post.thumbnailUrl} 
                                        // src={post.thumbnails[0]}
                                        style={{ backgroundColor: "#DEE6E8", height: "240px", width: "auto" }}

                                        
                                        // Use src instead of thumbnails
                                        alt="post image"
                                        // width={320}
                                        // height={206}
                                        effect="opacity; transform"
                                        style={{ backgroundColor: "#DEE6E8" }}
                                    />
                                </ALink>
                                :
                                <ALink href={ `/blog/single/${ post?.id }` }>
                                    <img
                                        // src={isOriginal ? post.originalImageUrl : post.thumbnailUrl}
                                        // src={post.thumbnails[0]}
                                        style={{ backgroundColor: "#DEE6E8", height: "240px", width: "auto" }}
                                        alt="post image"
                                        // width={320}
                                        // height={100}
                                    />
                                </ALink>
                        }
                        <div
                            className="post-calendar"
                            style={{ backgroundColor: "#d05278" }}
                        >
                            <span className="post-day">{new Date(post.date).getDate()}</span> {/* Fixed day calculation */}
                            <span className="post-month">{months[new Date(post.date).getMonth()]}</span>
                        </div>
                    </figure>
                    :
                    <figure className="post-media">
                        {
                            isLazy ?
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post.thumbnails.map((item, index) =>
                                            <LazyLoadImage
                                            src={post.thumbnails[0]}
                                            style={{ backgroundColor: "#DEE6E8", height: "240px", width: "auto" }}


                                                // src={item.url} // Use src instead of thumbnails
                                                alt="post gallery abcd"
                                                key={item.title + '-' + index}
                                                // width={320}
                                                // height={206}
                                                effect="opacity; transform"
                                                // style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        )
                                    }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post.thumbnails.map((item, index) =>
                                            <img
                                            src={post.thumbnails[0]}
                                            style={{ backgroundColor: "#DEE6E8", height: "240px", width: "auto" }}

                                                // src={item.url} // Use src instead of thumbnails
                                                alt="post gallery abcd"
                                                key={item.title + '-' + index}
                                                // width={320}
                                                // height={206}
                                            />
                                        )
                                    }
                                </OwlCarousel>
                        }
                        <div className="post-calendar" style={{ backgroundColor: "#d05278" }}>
                            <span className="post-day">{new Date(post.createdAt).getDate()}</span> {/* Fixed day calculation */}
                            <span className="post-month">{months[new Date(post.createdAt).getMonth()]}</span>
                        </div>
                    </figure>
            }

            <div className="post-details">
                <h4 className="post-title">
                    <ALink href={ `/blog/single/${ post?.id }` }>{post.metaTitle}</ALink>
                </h4>
                <p className="post-content">{post.metaDescription}</p>
                <ALink href={ `/blog/single/${ post?.id }` } className={`btn btn-primary btn-link btn-underline ${btnAdClass}`}>
                    {btnText}<i className="d-icon-arrow-right"></i>
                </ALink>
            </div>
        </div>
    )
}

export default PostEight;
