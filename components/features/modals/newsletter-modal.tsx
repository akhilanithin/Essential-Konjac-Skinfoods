import { useState, useEffect } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";

const modalStyles = {
    content: {
        position: "relative",
    },
    overlay: {
        background: 'rgba(0,0,0,.4)',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
    },
};

Modal.setAppElement("#__next");

const NewsletterModal: React.FC = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [noMore, setNoMore] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (!Cookie.get("hideNewsletter")) {
            timer = setTimeout(() => {
                setModalState(true);
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, []);

    const closeModal = () => {
        const overlay = document.querySelector(".ReactModal__Overlay.newsletter-modal-overlay") as HTMLElement;
        const content = document.querySelector(".newsletter-popup.ReactModal__Content") as HTMLElement;

        if (overlay) overlay.classList.add('removed');
        if (content) content.classList.remove("ReactModal__Content--after-open");

        setTimeout(() => {
            setModalState(false);
            if (noMore) {
                Cookie.set("hideNewsletter", 'true', { expires: 7, path: window.location.pathname });
            }
        }, 250);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoMore(event.target.checked);
    };

    return (
        <Modal
            isOpen={modalState}
            style={modalStyles}
            onRequestClose={closeModal}
            shouldReturnFocusAfterClose={false}
            overlayClassName="newsletter-modal-overlay"
            className="newsletter-popup bg-img"
        >
            <div className="newsletter-popup" id="newsletter-popup" style={{ backgroundImage: "url(images/newsletter-popup.jpg)" }}>
                <div className="newsletter-content">
                    <h4 className="text-uppercase text-dark">Up to <span className="text-primary">20% Off</span></h4>
                    <h2 className="font-weight-semi-bold">Sign up to <span>EKSFC</span></h2>
                    <p className="text-grey">Subscribe to the EKSFC newsletter to receive timely updates from your favorite products.</p>
                    <form action="#" method="get" className="input-wrapper input-wrapper-inline input-wrapper-round">
                        <input type="email" className="form-control email" name="email" id="email2" placeholder="Email address here..." required />
                        <button className="btn btn-dark" type="submit">SUBMIT</button>
                    </form>
                    <div className="form-checkbox justify-content-center">
                        <input 
                            type="checkbox" 
                            checked={noMore} 
                            className="custom-checkbox" 
                            id="hide-newsletter-popup" 
                            onChange={handleChange} 
                            name="hide-newsletter-popup" 
                        />
                        <label htmlFor="hide-newsletter-popup">Don't show this popup again</label>
                    </div>
                </div>
                <button title="Close (Esc)" type="button" className="mfp-close" onClick={closeModal}><span>×</span></button>
            </div>
        </Modal>
    );
};

export default NewsletterModal;
