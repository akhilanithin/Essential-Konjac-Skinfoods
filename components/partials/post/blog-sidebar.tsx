
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';
import withApollo from '~/server/apollo';
import { GET_POST_SIDEBAR_DATA } from '~/server/queries';
import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import PostTwo from '~/components/features/post/post-two';
import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: string;
    name: string;
}

interface RecentPost {
    id: string;
    title: string;
    // Add other fields based on your post structure
}

interface PostSidebarData {
    categories: Category[];
    recent: RecentPost[];
}

interface QueryData {
    postSidebarData: PostSidebarData;
}

const BlogSidebar: React.FC = ({post}) => {
    const router = useRouter();
    const query = router.query;





    const [loading, setLoading] = useState(true);


    useEffect(() => {
    
     setLoading(false)
    }, []);






    const toggleSidebarHandler = (e: React.MouseEvent) => {
        document.querySelector('body')?.classList.toggle('right-sidebar-active');
    };

    const hideSidebarHandler = (e: React.MouseEvent) => {
        document.querySelector('body')?.classList.remove('right-sidebar-active');
    };







    return (
      
        <div className="col-lg-3 right-sidebar sidebar-fixed sticky-sidebar-wrapper">
            <div className="sidebar-overlay" onClick={hideSidebarHandler}>
                <ALink className="sidebar-close" href="#">
                    <i className="close-icon"></i>
                </ALink>
            </div>

            <div className="sidebar-toggle" onClick={toggleSidebarHandler}>
                <i className="fas fa-chevron-left"></i>
            </div>

            <StickyBox offsetTop={88} className="blog-sidebar-wrapper">
                <div className="sidebar-content">
                    {
                        !loading ? (
                            <>

                                <div className="widget widget-collapsible border-no">
                                    <Card
                                        title="<h3 class='widget-title border-no'>Blog Categorie<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body filter-items search-ul">
                                           
                                                <li key={post?.category?.id} className={`${query?.category === post?.category?.name.toLowerCase() ? 'active' : ''}`}>
                                                    <ALink href={{ pathname: '/blog/classic', query: { category: post?.category?.name.toLowerCase() } }} scroll={false}>
                                                        {post?.category?.name}
                                                    </ALink>
                                                </li>
                                            
                                        </ul>
                                    </Card>
                                </div>


                                <div className="widget widget-collapsible">
                                    <Card
                                        title="<h3 class='widget-title'>About Blog<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body">
                                            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>{post?.seoTitle}</p>
                                            <p>{post?.seoDescription}</p>
                                        </ul>
                                    </Card>
                                </div>


                                <div className="widget widget-collapsible widget-posts">
                                    <Card
                                        title="<h3 class='widget-title'>Tag Cloud<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body">
                                          

                                            {post?.seoKeywords?.map((title, index) => (
                                            <ALink href="#" className="tag" key={index}>{title}</ALink>
                                            ))}

                                        </ul>
                                    </Card>
                                </div>
                            </>
                        ) : <div className="widget-2"></div>
                    }
                </div>
            </StickyBox>
        </div>
    );
};

export default withApollo({ ssr: typeof window === "undefined" })(BlogSidebar);
