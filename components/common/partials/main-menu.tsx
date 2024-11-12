import { useRouter } from 'next/router';
import ALink from '~/components/features/custom-link';
import { mainMenu } from '~/utils/data/menu';

interface MenuItem {
    title: string;
    url: string;
    hot?: boolean;
    new?: boolean;
}

interface MainMenuProps {
    shop: {
        variation1: MenuItem[];
        variation2: MenuItem[];
    };
    product: {
        pages: MenuItem[];
        layout: MenuItem[];
    };
    other: MenuItem[];
    element: MenuItem[];
}

function MainMenu() {
    const { pathname } = useRouter();

    return (
        <nav className="main-nav mr-4">


            <ul className="menu menu-active">

                {/* home */}
                <li id="menu-home" className={pathname === '/' ? 'active' : ''}>
                    <ALink href="/">HOME</ALink>
                </li>

                {/* Aesthetics */}

                <li>
                    <ALink href="aesthetics/aesthetics">AESTHETICS</ALink>
                </li>
              

                {/* <li className={`submenu lg-menu ${pathname.includes('/shop') ? 'active' : ''}`}>
                    <ALink href="#">AESTHETICS</ALink>
                </li> */}

                {/* Categories */}

                {/* <li className={`submenu lg-menu ${pathname.includes('/shop') ? 'active' : ''}`}>
                    <ALink href="/shop">Categories</ALink>
                    <div className="megamenu">
                        <div className="row">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Variations 1</h4>
                                <ul>
                                    {mainMenu.shop.variation1.map((item) => (
                                        <li key={`shop-${item.title}`}>
                                            <ALink href={`/${item.url}`}>
                                                {item.title}
                                                {item.hot && <span className="tip tip-hot">Hot</span>}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Variations 2</h4>
                                <ul>
                                    {mainMenu.shop.variation2.map((item) => (
                                        <li key={`shop-${item.title}`}>
                                            <ALink href={`/${item.url}`}>
                                                {item.title}
                                                {item.new && <span className="tip tip-new">New</span>}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                                <figure>
                                    <img src="./images/menu/banner-1.jpg" alt="Menu banner" width="221" height="330" />
                                </figure>
                                <div className="banner-content y-50">
                                    <h4 className="banner-subtitle font-weight-bold text-primary ls-m">Sale.</h4>
                                    <h3 className="banner-title font-weight-bold"><span className="text-uppercase">Up to</span>70% Off</h3>
                                    <ALink href="/shop" className="btn btn-link btn-underline">
                                        shop now<i className="d-icon-arrow-right"></i>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </li> */}



                {/* Products */}

                {/* <li className={`submenu lg-menu ${pathname.includes('/product') && !pathname.includes('/elements') ? 'active' : ''}`}>
                    <ALink href="/product/default/bodycare-smooth-perfume">PRODUCTS</ALink>
                    <div className="megamenu">
                        <div className="row">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Product Pages</h4>
                                <ul>
                                    {mainMenu.product.pages.map((item) => (
                                        <li key={`product-${item.title}`}>
                                            <ALink href={`/${item.url}`}>
                                                {item.title}
                                                {item.hot && <span className="tip tip-hot">Hot</span>}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Product Layouts</h4>
                                <ul>
                                    {mainMenu.product.layout.map((item) => (
                                        <li key={`product-${item.title}`}>
                                            <ALink href={`/${item.url}`}>
                                                {item.title}
                                                {item.new && <span className="tip tip-new">New</span>}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner2 banner banner-fixed">
                                <figure>
                                    <img src="./images/menu/banner-2.jpg" alt="Menu banner" width="221" height="330" />
                                </figure>
                                <div className="banner-content x-50 text-center">
                                    <h3 className="banner-title text-white text-uppercase">Sunglasses</h3>
                                    <h4 className="banner-subtitle font-weight-bold text-white mb-0">$23.00 - $120.00</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </li> */}




                <li>
                    <ALink href="/shop">PRODUCTS</ALink>
                </li>



                {/* Pages */}

                <li className={`submenu ${pathname.includes('/pages') ? 'active' : ''}`}>
                    <ALink href="#">PAGES</ALink>
                    <ul>
                        {mainMenu.other.map((item) => (
                            <li key={`other-${item.title}`}>
                                <ALink href={`/${item.url}`}>
                                    {item.title}
                                    {item.new && <span className="tip tip-new">New</span>}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </li>

                {/* Elements */}


                <li className={`${pathname.includes('/elements') ? 'active' : ''} d-xl-show submenu`}>
                    <ALink href="/elements">ELEMENTS</ALink>
                    <ul>
                        {mainMenu.element.map((item) => (
                            <li key={`elements-${item.title}`}>
                                <ALink href={`/${item.url}`}>
                                    {item.title}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </li>


                {/* Blogs */}

                <li>
                    <ALink href="/elements/blog-posts/">BLOGS</ALink>
                </li>
                {/* FAQ */}

                <li>
                    <ALink href="/pages/faqs">FAQ</ALink>
                </li>

                {/* About Us */}

                <li>
                    <ALink href="/pages/about-us">ABOUT US</ALink>
                </li>
            </ul>
        </nav>
    );
}

export default MainMenu;
