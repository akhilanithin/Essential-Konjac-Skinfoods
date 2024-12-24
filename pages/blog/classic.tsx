import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

// Import Apollo Server and Query
import withApollo from '~/server/apollo';
import { GET_POSTS } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import Pagination from '~/components/features/pagination';

import PostOne from '~/components/features/post/post-one';
import BlogSidebar from '~/components/partials/post/blog-sidebar';

import { scrollTopHandler } from '~/utils';

import axios from 'axios';

interface Post {
    id: string; // Assuming there's an id field, adjust as necessary
    title: string;
    content: string;
    // Add other post fields as necessary
}

interface PostsData {
    posts: {
        data: Post[];
        total: number;
    };
}

function Classic(): JSX.Element {
    const router = useRouter();
 
    const query = router.query;
    const showingCount = 8;
  
    const [perPage, setPerPage] = useState<number>(showingCount);

 

 const [loading, setLoading] = useState(true);

     const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<Error | null>(null);
 


         

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get<PostsData>(
                `https://api.eksfc.com/api/blogs/public?page=1&limit=1000&sortField=title&sortOrder=DESC`,
                {
                    headers: {
                        'konjac-version': '1.0.1',
                    },
                }
            );
            setPosts(response?.data?.data);
       
      

        
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
        fetchPosts();
    }, []);



const categories=query?.category

const filteredItems = posts.filter(item =>item?.category?.name.toLowerCase()===categories);


    
    
  
   




    return (
       
        <main className="main skeleton-body">
            <Helmet>
                <title>Blog Classic</title>
            </Helmet>

            <h1 className="d-none">Blog Classic</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li><ALink href="#" className="active">Blog</ALink></li>
                        <li>Classic</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content with-sidebar">
                <div className="container">
                    <div className="row gutter-lg">
                        <div className="col-lg-9">
                            <div className="posts">
                                {
                                    loading ?
                                        new Array(perPage).fill(1).map((_, index) => (
                                            <div key={"Skeleton:" + index}>
                                                <div className="skel-post"></div>
                                            </div>
                                        )) :
                                        filteredItems && filteredItems?.length? 
                                        filteredItems.map((post, index) => (                
                                                <React.Fragment key={"post-one" + index}>
                                                    <PostOne post={post} />
                                                </React.Fragment>
                                            )) :
                                            <div className="info-box with-icon"><p className="mt-4">No blogs were found matching your selection.</p></div>
                                }
                            </div>

                            {/* <Pagination totalPage={totalPage} /> */}
                        </div>

                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withApollo({ ssr: typeof window === "undefined" })(Classic);
