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
    title: string;
}

interface Post {
    type: 'image' | 'video' | 'gallery';
    slug: string;
    date: string;
    title: string;
    content: string;
    author: string;
    comments: number;
    picture: Picture[];
    large_picture?: Picture[];
    video?: { url: string };
}

interface PostOneProps {
    post: Post;
    adClass?: string;
    isLazy?: boolean;
    isOriginal?: boolean;
    btnText?: string;
    btnAdClass?: string;
    isButton?: boolean;
}

const PostOne: React.FC<PostOneProps> = ({
    post,
    adClass = 'mb-7',
    isLazy = false,
    isOriginal = false,
    btnText = "Read more",
    btnAdClass = '',
    isButton = true,
}) => {

   console.log(post?.author);
   
    
    return (
      
        <div className={`post post-classic  ${adClass}`}>
            {
                post.images || post.type === 'video' ? (
                    <figure className={`post-media ${post?.images ? 'overlay-zoom' : ''}`}>                 
                                <ALink href={`/blog/${post?.id}`}>
                                    {
                                        isOriginal ? (
                                            <img
                                            src={post?.thumbnails[0]}
                                                alt="post image"
                                                width={100}
                                                // height={post.large_picture![0].height}
                                            />
                                        ) : (
                                            <img
                                            src={post?.thumbnails[0]}
                                                alt="post image"
                                                width="900"
                                                height={500}
                                            />
                                        )
                                    }
                                </ALink>
                            
                        
                        {/* {
                            post.type === 'video' && (
                                <>
                                    <span className="video-play" onClick={videoHandler}></span>
                                    <video width="380">
                                        <source src={`${process.env.NEXT_PUBLIC_ASSET_URI}${post.video!.url}`} type="video/mp4" />
                                    </video>
                                </>
                            )
                        } */}
                    </figure>
                ) : (
                    <figure className="post-media">
            
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                                    {
                                        post.thumbnails.map((item, index) => (
                                            <LazyLoadImage
                                                 src={item}
                                                alt="post gallery"
                                                key={`${item.title}-${index}`}
                                             
                                                effect="opacity; transform"
                                                style={{ backgroundColor: "#DEE6E8" }}
                                            />
                                        ))
                                    }
                                </OwlCarousel>

                    </figure>
                )
            }


            <div className="post-details">


                <div className="post-meta">
                    by <ALink href="#" className="post-author">{post?.author?.firstName} {post?.author?.lastName}</ALink> on <ALink href="#" className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: "2-digit", timeZone: "UTC" })}</ALink> | <ALink href="#" className="post-comment"><span>{post?.comments?.length}</span> Comments</ALink>
                </div>


                <h4 className="post-title">
                    <ALink href={`/blog/${post.id}`}>{post.title}</ALink>
                </h4>


                <p
                    className="mb-5"
                    dangerouslySetInnerHTML={{ __html:post?. metaDescription }}
                ></p>   


                {
                    isButton && (
                        <ALink href={`/blog/${post.id}`} className={`btn btn-link btn-underline btn-primary ${btnAdClass}`}>
                            {btnText}<i className="d-icon-arrow-right"></i>
                        </ALink>
                    )
                }


            </div> 


        </div>
    );
}

export default PostOne;
