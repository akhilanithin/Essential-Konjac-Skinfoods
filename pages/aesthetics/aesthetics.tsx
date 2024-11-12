import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLazyQuery } from '@apollo/react-hooks';
import withApollo from '~/server/apollo';
import { GET_POSTS } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';
import Breadcrumb from '~/components/features/breadcrumb';

import PostFour from '~/components/features/post/post-four';
import PostFive from '~/components/features/post/post-five';
import PostSix from '~/components/features/post/post-six';
import PostSeven from '~/components/features/post/post-seven';
import PostEight from '~/components/features/post/post-eight';
import ElementsList from '~/components/partials/elements/elements-list';

import { mainSlider5, mainSlider13, mainSlider14 } from '~/utils/data/carousel';

// Define types for the posts
interface Post {
    // Define the structure of a post here based on your data model
    id: string;
    title: string;
    // Add other fields as necessary
}

interface PostsData {
    posts: {
        data: Post[];
    };
}

function Aesthetics(): JSX.Element {
    const [getPosts, { data, loading, error }] = useLazyQuery<PostsData>(GET_POSTS);
    const posts = data?.posts.data;

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <main className="main skeleton-body">
            <Helmet>
                <title>Riode React eCommerce Template | Blog</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Blog</h1>

            <Breadcrumb  title="Aesthetics" parentUrl="/elements" />

            <div className="page-content">
 
        

            <section className="mt-10 pt-4 pb-10">
                    <div className="container">
                     
                        <OwlCarousel adClass="owl-theme" options={mainSlider13}>
                            {
                                loading ? (
                                    new Array(3).fill(1).map((_, index) => (
                                        <div key={"Skeleton:" + index}>
                                            <div className="skel-post"></div>
                                        </div>
                                    ))
                                ) : posts && posts.length ? (
                                    posts.slice(12, 15).map((post, index) => (
                                        <React.Fragment key={"post-four" + index}>
                                            <PostFour post={post} isOriginal={true} adClass="text-center" />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="info-box with-icon">
                                        <p className="mt-4">No blogs were found matching your selection.</p>
                                    </div>
                                )
                            }
                        </OwlCarousel>
                    </div>
                </section>
            
            </div>
        </main>
    );
}

export default withApollo({ ssr: typeof window === "undefined" })(Aesthetics);
