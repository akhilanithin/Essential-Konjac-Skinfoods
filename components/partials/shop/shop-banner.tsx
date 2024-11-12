import React from 'react';



interface ShopBannerProps {
    subTitle?: string;
    title?: string;
    current?: string;
}


//  style={{ backgroundImage: `url(./images/home/page-header.jpg)`




const ShopBanner: React.FC<ShopBannerProps> = ({ subTitle = '102 Products', title = "Shop", current = "Riode Shop" }) => {
    return (
        <div className="page-header shop" style={{ backgroundImage: `url(https://eksfc.com/assets/img/detail-main-bg.jpg)`, backgroundColor: "#E4EAEA" }}>
            {title && <h1 className="page-title text-dark ls-m font-weight-bold mb-2">{title}</h1>}
            {subTitle && <h3 className="page-subtitle text-uppercase text-body">{subTitle}</h3>}
        </div>
    );
};

export default ShopBanner;
