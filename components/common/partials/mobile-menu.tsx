import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import { mainMenu } from '~/utils/data/menu';

interface MenuItem {
    title: string;
    url: string;
    hot?: boolean;
    new?: boolean;
}

interface MainMenu {
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

function MobileMenu() {
    const [search, setSearch] = useState<string>("");
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        window.addEventListener('resize', hideMobileMenuHandler);
        document.body.addEventListener("click", onBodyClick);

        return () => {
            window.removeEventListener('resize', hideMobileMenuHandler);
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);

    useEffect(() => {
        setSearch("");
    }, [router.query.slug]);

    const hideMobileMenuHandler = () => {
        if (window.innerWidth > 991) {
            document.body.classList.remove('mmenu-active');
        }
    };

    const hideMobileMenu = () => {
        document.body.classList.remove('mmenu-active');
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onBodyClick = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.closest('.header-search')) return;

        document.querySelector('.header-search.show')?.classList.remove('show');
        document.querySelector('.header-search.show-results')?.classList.remove('show-results');
    };

    const onSubmitSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: '/shop',
            query: { search: search }
        });
    };

    return (
        <div className="mobile-menu-wrapper">
            <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

            <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
                <i className="d-icon-times"></i>
            </ALink>

            <div className="mobile-menu-container scrollable">

                {/* <form action="#" className="input-wrapper" onSubmit={onSubmitSearchForm}>
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        autoComplete="off"
                        value={search}
                        onChange={onSearchChange}
                        placeholder="Search your keyword..."
                        required
                    />
                    <button className="btn btn-search" type="submit">
                        <i className="d-icon-search"></i>
                    </button>
                </form> */}




                

                <ul className="mobile-menu mmenu-anim">




                    {/* Home  */}

                    <li>
                        <ALink href="/">Home</ALink>
                    </li>



                    {/* About Us */}

                    <li>
                        <ALink href="/about-us/">ABOUT US</ALink>
                    </li>





                    {/* Shop */}
                    <li>
                        <ALink href="/shop">SHOP</ALink>
                    </li>


                    {/* Aesthetics */}

                    <li>
                        <ALink href="/aesthetics">AESTHETICS</ALink>
                    </li>


                    {/* Blogs */}

                    <li>
                        <ALink href="/blog-posts/">BLOGS</ALink>
                    </li>



                    {/* Elements */}

                    <li>
                        <Card title="elements" type="mobile">
                            <ul>
                                {mainMenu.element.map((item) => (
                                    <li key={`elements-${item.title}`}>
                                        <ALink href={`/${item.url}`}>
                                            {item.title}
                                        </ALink>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </li>


                    {/* FAQ */}

                    <li>
                        <ALink href="/faqs/">FAQ</ALink>
                    </li>


                    {/* Contact-Us */}

                    <li>
                        <ALink href="/contact-us/">CONTACT</ALink>
                    </li>


                </ul>
            </div>
        </div>
    );
}

export default React.memo(MobileMenu);
