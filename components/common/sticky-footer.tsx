import { useEffect } from 'react';
import ALink from '~/components/features/custom-link';
import FooterSearchBox from '~/components/common/partials/footer-search-box';

const StickyFooter: React.FC = () => {
    let tmp = 0;

    useEffect(() => {
        const stickyFooterHandler = (e: Event) => {
            const target = e.currentTarget as Window;
            const top = document.querySelector('.page-content') 
                ? (document.querySelector('.page-content') as HTMLElement).offsetTop + (document.querySelector('header') as HTMLElement).offsetHeight + 100 
                : 600;
            const stickyFooter = document.querySelector('.sticky-footer.sticky-content') as HTMLElement;
            let height = stickyFooter ? stickyFooter.offsetHeight : 0;

            if (target.pageYOffset >= top && window.innerWidth < 768 && target.scrollY >= tmp) {
                if (stickyFooter) {
                    stickyFooter.classList.add('fixed');
                    stickyFooter.setAttribute('style', 'margin-bottom: 0');

                    const wrapper = document.querySelector('.sticky-content-wrapper');
                    if (!wrapper) {
                        const newNode = document.createElement("div");
                        newNode.className = "sticky-content-wrapper";
                        stickyFooter.parentNode?.insertBefore(newNode, stickyFooter);
                        newNode.appendChild(stickyFooter);
                        newNode.setAttribute("style", `height: ${height}px`);
                    } else {
                        wrapper.setAttribute("style", `height: ${height}px`);
                    }
                }
            } else {
                if (stickyFooter) {
                    stickyFooter.classList.remove('fixed');
                    stickyFooter.setAttribute('style', `margin-bottom: -${height}px`);
                }

                const wrapper = document.querySelector('.sticky-content-wrapper');
                if (wrapper) {
                    wrapper.removeAttribute("style");
                }
            }

            if (window.innerWidth > 767) {
                const wrapper = document.querySelector('.sticky-content-wrapper') as HTMLElement;
                if (wrapper) {
                    wrapper.style.height = 'auto';
                }
            }

            tmp = target.scrollY;
        };

        window.addEventListener('scroll', stickyFooterHandler);

        return () => {
            window.removeEventListener('scroll', stickyFooterHandler);
        };
    }, []);

    return (
        <div className="sticky-footer sticky-content fix-bottom">
            <ALink href="/" className="sticky-link active">
                <i className="d-icon-home"></i>
                <span>Home</span>
            </ALink>
            <ALink href="/shop" className="sticky-link">
                <i className="d-icon-volume"></i>
                <span>Categories</span>
            </ALink>
            <ALink href="/pages/wishlist" className="sticky-link">
                <i className="d-icon-heart"></i>
                <span>Wishlist</span>
            </ALink>
            <ALink href="/pages/account" className="sticky-link">
                <i className="d-icon-user"></i>
                <span>Account</span>
            </ALink>
            <FooterSearchBox />
        </div>
    );
};

export default StickyFooter;
