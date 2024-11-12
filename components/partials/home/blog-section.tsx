import React, { useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import OwlCarousel from '~/components/features/owl-carousel';
import PostEight from '~/components/features/post/post-eight';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { mainSlider6 } from '~/utils/data/carousel';
import axios from 'axios';

// Define types for the post data
interface Post {
    id: number; // Adjust according to your API's post structure
    title: string;
    content: string;
    // Add other relevant fields based on your API response
}

interface PostsResponse {
    data: Post[];
    count: number;
}

const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<PostsResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const url = process.env.NEXT_PUBLIC_BLOG_URL!;
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN!;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PostsResponse>(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'konjac-version': '1.0.1',
                    },
                });
                setPosts(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const blogs = Array.isArray(posts?.data) ? posts.data : [posts.data];

    return (
        <section className="blog-section mt-8 mb-10">
            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1000} triggerOnce>
                <div className="container">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mt-1 mb-5">
                            <h2 className="text-left title with-link text-black">Our Latest Blog</h2>
                        </div>
                    </Reveal>

                    <OwlCarousel adClass="owl-theme owl-shadow-carousel" options={mainSlider6}>
                        {posts && posts.count ? (
                            blogs.map((post, index) => (
                                <React.Fragment key={`post-eight-${index}`}>
                                    <div className="blog-post mb-4">
                                        <PostEight post={post} adClass="overlay-zoom" />
                                    </div>
                                </React.Fragment>
                            ))
                        ) : null}
                    </OwlCarousel>
                </div>
            </Reveal>
        </section>
    );
};

export default React.memo(BlogSection);
