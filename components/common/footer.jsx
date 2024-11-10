import ALink from '~/components/features/custom-link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-middle">
                    <div className="row pt-2">
                        <div className="col-lg-2 d-flex align-items-center">
                            <ALink href="/" className="logo-footer">
                                <img src="images/home/logo-footer.png" alt="logo-footer" width="154"
                                    height="43" />
                            </ALink>
                        </div>
                        <div className="col-lg-3 col-contact col-md-6">
                            <div className="widget widget-contact">
                                <h4 className="widget-title">Get In Touch</h4>
                                <ul className="widget-body">
                                    <li>
                                        <label>Phone</label>
                                        <ALink href="tel:+97143856663">Toll Free +(971) 4-385-6663</ALink>
                                    </li>
                                    <li>
                                        <label>Email</label>
                                        <ALink href="mailto:support@essentialkonjacskinfoods.com">support@eksfc.com</ALink>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <ALink href="https://maps.app.goo.gl/YNFfC6q9b7Zo4TYZ9">G05, Nadd Al Hamar Center, Dubai, UAE</ALink>
                                    </li>
                                    <li>
                                        <label>WORKING DAYS / HOURS</label>
                                        <ALink href="#">Mon - Sun / 9:00 AM - 12:00 AM</ALink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-account col-md-6">
                            <div className="widget">
                                <h4 className="widget-title">My Account</h4>
                                <ul className="widget-body">
                                    <li>
                                        <ALink href="#">About</ALink>
                                    </li>
                                    <li>
                                        <ALink href="/pages/faqs">FAQs</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Categories</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Shop</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Cart</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Checkout</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Privacy Policy</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Terms and Condition</ALink>
                                    </li>
                                    <li>
                                        <ALink href="/pages/contact-us">Contact Us</ALink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget widget-newsletter form-wrapper">
                                <div className="newsletter-info">
                                    <h4 className="widget-title">Subscribe Newsletter</h4>
                                    <p>Subscribe to the EKSFC Newsletter. Receive timely updates from your
                                    favourite products.</p>
                                </div>
                                <form action="#" className="input-wrapper input-wrapper-inline">
                                    <input type="email" className="form-control" name="email" id="email"
                                        placeholder="Email address here..." required />
                                    <button className="btn btn-primary btn-rounded btn-md ls-normal ml-2"
                                        type="submit">subscribe<i className="d-icon-arrow-right"></i></button>
                                </form>
                            </div>
                            <div className="social-links">
                                <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-facebook fab fa-facebook-f"></ALink>
                                <ALink href="https://www.instagram.com/konjacskinfood/" className="social-link social-instagram fab fa-instagram"></ALink>
                                <ALink href="https://twitter.com/KonjacSkin" className="social-link social-twitter fab fa-twitter"></ALink>
                                <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-pinterest fab fa-linkedin-in"></ALink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <p className="copyright">Copyright &copy; {new Date().getFullYear()} Essential Konjac Skin Food. All Rights Reserved.</p>
                    </div>
                    <div className="footer-right">
                        <figure className="d-flex">
                            <img src="images/home/payment.png" alt="payment" width="272" height="20" />
                        </figure>
                    </div>
                </div>
            </div>
        </footer>
    )
}