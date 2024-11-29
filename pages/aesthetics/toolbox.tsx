import React from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/custom-link';

interface ToolBoxProps {
    sortBy: string;
    postsPerPage: number;
    onSortChange: (sortKey: string) => void;
    onPostsPerPageChange: (perPage: number) => void;
    type?: string;
}

const ToolBox: React.FC<ToolBoxProps> = ({ sortBy, postsPerPage, onSortChange, onPostsPerPageChange , type = "left"}) => {
    const router = useRouter();
    const query = router.query;
    const gridType = query.type ? (query.type as string) : 'grid';
    const showSidebar = () => {
        if (type === "navigation" && window.innerWidth > 991) {
            document.querySelector('.navigation-toggle-btn')?.click();
        } else {
            document.querySelector('body')?.classList.add(
                `${type === "left" || type === "off-canvas" || type === "navigation" || type === "horizontal" ? "sidebar-active" : "right-sidebar-active"}`
            );
        }
    };

    console.log(sortBy);
    
    return (
        <nav className="toolbox sticky-toolbox sticky-content fix-top">

{/*             
            <div className="toolbox-left">
                <div className="toolbox-item toolbox-sort">
                 
                    <select
                        name="orderby"
                        className="form-control"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                             <option value="popularity">Price low to high</option>
                        <option value="default">Price high to low</option>
                   
                    </select>
                </div>
            </div> */}

            {sortBy ? (
                <div className="toolbox-left">
                    <div className="toolbox-item toolbox-sort">
                        <select
                            name="orderby"
                            className="form-control"
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            <option value="popularity">Price low to high</option>
                            <option value="default">Price high to low</option>
                        </select>
                    </div>
                </div>
            ) : <div className="toolbox-left">
             
            </div>}




            <div className="toolbox-right">
                <div className="toolbox-item toolbox-show">
                    <label>Show </label>
                    <select
                        name="count"
                        className="form-control"
                        value={postsPerPage}
                        onChange={(e) => onPostsPerPageChange(Number(e.target.value))}
                    >
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                    </select>
                </div>

                <div className={`toolbox-item toolbox-layout ${type === "right" ? "mr-lg-0" : ''}`}>
                    <ALink href={{ pathname: router.pathname, query: { ...query, type: "list" } }} scroll={false} className={`d-icon-mode-list btn-layout ${gridType === 'list' ? 'active' : ''}`}></ALink>
                    <ALink href={{ pathname: router.pathname, query: { ...query, type: "grid" } }} scroll={false} className={`d-icon-mode-grid btn-layout ${gridType !== 'list' ? 'active' : ''}`}></ALink>
                </div>

                {type === "right" && (
                    <ALink href="#" className="toolbox-item right-sidebar-toggle btn btn-sm btn-outline btn-primary btn-rounded btn-icon-right d-lg-none" onClick={showSidebar}>Filter<i className="d-icon-arrow-left"></i></ALink>
                )}

                

            </div>
        </nav>
    );
};

export default ToolBox;
