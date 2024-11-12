import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';
import withApollo from '~/server/apollo';
import { GET_POST_SIDEBAR_DATA } from '~/server/queries';
import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import PostTwo from '~/components/features/post/post-two';

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

const BlogSidebar: React.FC = () => {
    const { data, loading, error } = useQuery<QueryData>(GET_POST_SIDEBAR_DATA);
    const categories = data?.postSidebarData.categories || [];
    const recent = data?.postSidebarData.recent || [];
    const router = useRouter();
    const query = router.query;

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
                        !loading && recent.length > 0 ? (
                            <>
                                <div className="widget widget-search border-no mb-2">
                                    <form action="#" className="input-wrapper input-wrapper-inline btn-absolute">
                                        <input type="text" className="form-control" name="search" autoComplete="off"
                                            placeholder="Search in Blog" required />
                                        <button className="btn btn-search btn-link" type="submit">
                                            <i className="d-icon-search"></i>
                                        </button>
                                    </form>
                                </div>

                                <div className="widget widget-collapsible border-no">
                                    <Card
                                        title="<h3 class='widget-title border-no'>Blog Categories<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body filter-items search-ul">
                                            {categories.map(category => (
                                                <li key={category.id} className={`${query.category === category.name.toLowerCase() ? 'active' : ''}`}>
                                                    <ALink href={{ pathname: '/blog/classic', query: { category: category.name.toLowerCase() } }} scroll={false}>
                                                        {category.name}
                                                    </ALink>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </div>

                                <div className="widget widget-collapsible">
                                    <Card
                                        title="<h3 class='widget-title'>Popular Posts<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body">
                                            {recent.slice(0, 3).map((post, index) => (
                                                <div className="post-col" key={`small-post-${index}`}>
                                                    <PostTwo post={post} />
                                                </div>
                                            ))}
                                        </ul>
                                    </Card>
                                </div>

                                <div className="widget widget-collapsible">
                                    <Card
                                        title="<h3 class='widget-title'>About us<span class='toggle-btn p-0 parse-content'></span></h3>"
                                        type="parse"
                                        expanded={true}
                                    >
                                        <ul className="widget-body">
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</p>
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
                                            <ALink href="#" className="tag">Bag</ALink>
                                            <ALink href="#" className="tag">Classic</ALink>
                                            <ALink href="#" className="tag">Converse</ALink>
                                            <ALink href="#" className="tag">Leather</ALink>
                                            <ALink href="#" className="tag">Fit</ALink>
                                            <ALink href="#" className="tag">Green</ALink>
                                            <ALink href="#" className="tag">Man</ALink>
                                            <ALink href="#" className="tag">Jeans</ALink>
                                            <ALink href="#" className="tag">Women</ALink>
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
