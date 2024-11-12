import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/custom-link';
import { videoHandler } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';

interface Post {
    type: 'image' | 'video' | 'gallery';
    slug: string;
    thumbnails?: string[];
    images?: string[];
    createdAt: string;
    metaTitle: string;
    metaDescription: string;
    video?: {
        url: string;
    };
}

interface PostEightProps {
    post: Post;
    adClass?: string;
    isLazy?: boolean;
    isOriginal?: boolean;
    btnText?: string;
    btnAdClass?: string;
}

const PostEight: React.FC<PostEightProps> = ({
    post,
    adClass = 'mb-7',
    isLazy = false,
    isOriginal = false,
    btnText = "Read more",
    btnAdClass = ''
}) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    return (
        <div className={`post post-frame ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
            {
                post.type === 'image' || post.type === 'video' ? (
                    <figure className="post-media">
                        {
                            isLazy ? (
                                <ALink href={`/blog/single/${post?.slug}`}>
                                    {
                                        isOriginal ?
                                            post?.images?.map((item, index) => (
                                                <LazyLoadImage
                                                    src={item}
                                                    alt="post gallery"
                                                    key={`${item?.title}-${index}`}
                                                    width={320}
                                                    height={206}
                                                    effect="opacity; transform"
                                                    style={{ backgroundColor: "#DEE6E8" }}
                                                />
                                            ))
                                            :
                                            <LazyLoadImage
                                                src={post.images[0]} // Assuming first thumbnail for image type
                                                alt="post image"
                                                width={320}
                                                height={206}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                    }
                                </ALink>
                            ) : (
                                <ALink href={`/blog/single/${post?.slug}`}>
                                    {
                                        isOriginal ?
                                            post?.images?.map((item, index) => (
                                                <img
                                                    src={item}
                                                    alt="post image"
                                                    key={`${item?.title}-${index}`}
                                                    width={320}
                                                    height={206}
                                                />
                                            ))
                                            :
                                            <img
                                                src={post.images[0]} // Assuming first thumbnail for image type
                                                alt="post image"
                                                width={320}
                                                height={206}
                                            />
                                    }
                                </ALink>
                            )
                        }

                        {
                            post.type === 'video' && (
                                <>
                                    <span className="video-play" onClick={videoHandler}></span>
                                    <video width="320">
                                        <source src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.video?.url}`} type="video/mp4" />
                                    </video>
                                </>
                            )
                        }

                        <div className="post-calendar">
                            <span className="post-day">{new Date(post?.createdAt).getDate()}</span>
                            <span className="post-month">{months[new Date(post?.createdAt).getMonth()]}</span>
                        </div>
                    </figure>
                ) : (
                    <figure className="post-media">
                        {
                            isLazy ? (
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post?.thumbnails?.map((item, index) => (
                                            <LazyLoadImage
                                                src={item}
                                                alt="post gallery"
                                                key={index}
                                                width={320}
                                                height={206}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        ))
                                    }
                                </OwlCarousel>
                            ) : (
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post?.thumbnails?.map((item, index) => (
                                            <img
                                                src={item}
                                                alt="post gallery"
                                                key={index}
                                                width={320}
                                                height={206}
                                            />
                                        ))
                                    }
                                </OwlCarousel>
                            )
                        }
                        <div className="post-calendar">
                            <span className="post-day">{new Date(post?.createdAt).getDate()}</span>
                            <span className="post-month">{months[new Date(post?.createdAt).getMonth()]}</span>
                        </div>
                    </figure>
                )
            }

            <div className="post-details">
                <h4 className="post-title">
                    <ALink href={`/blog/single/${post?.slug}`}>{post?.title}</ALink>
                </h4>
                <p className="post-content">{post.teaserText}</p>
                <ALink href={`/blog/single/${post.slug}`} className={`btn btn-primary btn-link btn-underline ${btnAdClass}`}>
                    {btnText}<i className="d-icon-arrow-right"></i>
                </ALink>
            </div>
        </div>
    );
};

export default PostEight;
