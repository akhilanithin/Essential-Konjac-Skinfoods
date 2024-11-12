import React from 'react';
import ALink from '~/components/features/custom-link';

interface BreadcrumbProps {
    title: string;
    subTitle: string;
    parentUrl?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, subTitle, parentUrl }) => {
    return (
        <div
            className="page-header"
            style={{
                backgroundImage: `url(https://eksfc.com/assets/img/detail-main-bg.jpg)`,
                backgroundColor: "#3C63A4"
            }}
        >
            <h3 className="page-subtitle">{subTitle}</h3>
            <h1 className="page-title">{title}</h1>
            <ul className="breadcrumb">
                <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                <li className="delimiter">/</li>
                {parentUrl ? (
                    <>
                        <li><ALink href={parentUrl}>{subTitle}</ALink></li>
                        <li className="delimiter">/</li>
                    </>
                ) : null}
                <li>{title}</li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
