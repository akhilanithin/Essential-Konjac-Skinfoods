import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import { videoHandler } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';

interface Picture {
    url: string;
    width: number;
    height: number;
    title?: string; // Optional if it exists in the post data
}

interface Post {
    type: 'image' | 'video' | 'gallery';
    slug: string;
    date: string;
    title: string;
    author: string;
    comments: number;
    picture: Picture[];
    large_picture?: Picture[];
    video?: { url: string };
}

interface PostSixProps {
    post: Post;
    adClass?: string;
    isLazy?: boolean;
    isOriginal?: boolean;
    btnText?: string;
    btnAdClass?: string;
}

const PostSix: React.FC<PostSixProps> = ({
    post,
    adClass = '',
    isLazy = false,
    isOriginal = false,
    btnText = "Read more",
    btnAdClass = 'btn-md',
}) => {
    return (
        <div className={`post post-sm ${post.type === 'gallery' ? '' : 'overlay-zoom'} ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
            {
                post.type === 'image' || post.type === 'video' ? (
                    <figure className="post-media">
                        {
                            isLazy ? (
                                <ALink href={`/blog/${post.slug}`}>
                                    {
                                        isOriginal ? (
                                            <LazyLoadImage
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.large_picture![0].url}`}
                                                alt="post image"
                                                width={380}
                                                height={230}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        ) : (
                                            <LazyLoadImage
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.picture[0].url}`}
                                                alt="post image"
                                                width={380}
                                                height={230}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        )
                                    }
                                </ALink>
                            ) : (
                                <ALink href={`/blog/${post.slug}`}>
                                    {
                                        isOriginal ? (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.large_picture![0].url}`}
                                                alt="post image"
                                                width={300}
                                                height={post.large_picture![0].height}
                                            />
                                        ) : (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.picture[0].url}`}
                                                alt="post image"
                                                width={300}
                                                height={post.picture[0].height}
                                            />
                                        )
                                    }
                                </ALink>
                            )
                        }
                        {
                            post.type === 'video' && (
                                <>
                                    <span className="video-play" onClick={videoHandler}></span>
                                    <video width="380">
                                        <source src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.video!.url}`} type="video/mp4" />
                                    </video>
                                </>
                            )
                        }
                    </figure>
                ) : (
                    <figure className="post-media">
                        {
                            isLazy ? (
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post.picture.map((item, index) => (
                                            <LazyLoadImage
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${item.url}`}
                                                alt="post gallery"
                                                key={item.title + '-' + index}
                                                width={380}
                                                height={230}
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        ))
                                    }
                                </OwlCarousel>
                            ) : (
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post.picture.map((item, index) => (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${item.url}`}
                                                alt="post gallery"
                                                key={item.title + '-' + index}
                                                width={item.width}
                                                height={item.height}
                                            />
                                        ))
                                    }
                                </OwlCarousel>
                            )
                        }
                    </figure>
                )
            }

            <div className="post-details">
                <div className="post-meta">
                    by <ALink href="#" className="post-author">{post.author}</ALink> on <ALink href="#" className="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: "2-digit", timeZone: "UTC" })}</ALink> | <ALink href="#" className="post-comment"><span>{post.comments}</span> Comments</ALink>
                </div>
                <h4 className="post-title">
                    <ALink href={`/blog/${post.slug}`}>{post.title}</ALink>
                </h4>
                <ALink href={`/blog/${post.slug}`} className={`btn btn-link btn-underline btn-dark ${btnAdClass}`}>
                    {btnText}<i className="d-icon-arrow-right"></i>
                </ALink>
            </div>
        </div>
    );
}

export default PostSix;
