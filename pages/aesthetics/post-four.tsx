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
    picture: Picture[];
    large_picture?: Picture[];
    video?: { url: string };
}

interface PostFourProps {
    post: Post;
    adClass?: string;
    isLazy?: boolean;
    isOriginal?: boolean;
    btnText?: string;
    btnAdClass?: string;
}

const PostFour: React.FC<PostFourProps> = ({
    post,
    adClass = '',
    isLazy = false,
    isOriginal = false,
    btnText = "Read more",
    btnAdClass = 'btn-dark'
}) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    console.log(post?.imageUrls);


    return (

        <div className={`post overlay-dark ${adClass}`} style={{ backgroundColor: 'rgba(252, 237, 234, 0.9)', borderRadius: '1rem', padding: '2%' }} >


            {
                <figure className="post-media" >
                    {isLazy ? (
                        <ALink href={`/aesthetics/${post?.id}`}>
                            <LazyLoadImage
                                src={`${post?.clinic?.logo}`}
                                alt="post image"
                                width={isOriginal ? 380 : post.picture[0].width}
                                height={isOriginal ? 230 : post.picture[0].height}
                                effect="opacity; transform"
                                style={{ backgroundColor: "#DEE6E8" }}
                            />
                        </ALink>
                    ) : (
                        <ALink href={`/aesthetics/${post?.id}`}>
                            <img
                                src={`${post?.imageUrls}`}
                                alt="post image"
                                width={isOriginal ? 380 : post.picture[0].width}
                                height={isOriginal ? 230 : post.picture[0].height}
                            />
                        </ALink>
                    )}

                </figure>
            }

            {/* <div className="post-details">
                <h4 className="post-title">
                    <ALink href={`/blog/single/${post?.id}`}>{post?.name}</ALink>
                </h4>
            </div> */}


            <div className="post-details">
                <ALink href={`/aesthetics/${post?.id}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img
                        src={`${post?.clinic?.logo}`}
                        alt=""
                        style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
                    />
                    <span
                        className="products-item__name"
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '2rem' }}
                    >
                       {post?.name}
                    </span>
                </ALink>
                <span className="products-item__cost">AED 300.00</span>
            </div>


        </div>
    );
}

export default PostFour;
