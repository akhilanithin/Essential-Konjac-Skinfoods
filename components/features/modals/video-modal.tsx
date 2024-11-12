import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

import { modalActions } from '~/store/modal';

const customStyles = {
    content: {
        position: "relative",
    },
    overlay: {
        background: 'rgba(0,0,0,.4)',
        overflowX: 'hidden',
        display: 'flex',
        overflowY: 'auto',
        opacity: 0,
    },
};

Modal.setAppElement('#__next');

interface VideoModalProps {
    isOpen: boolean;
    closeModal: () => void;
    singleSlug: string;
}

const VideoModal: React.FC<VideoModalProps> = (props) => {
    const router = useRouter();
    const { isOpen, closeModal, singleSlug } = props;

    useEffect(() => {
        closeModal();

        const handleRouteChange = () => closeModal();
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [closeModal, router.events]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                document.querySelector(".ReactModal__Overlay")?.classList.add('opened');
            }, 100);
        }
    }, [isOpen]);

    const closeVideo = () => {
        const overlay = document.querySelector(".ReactModal__Overlay");
        const content = document.querySelector(".video-modal.ReactModal__Content");

        if (overlay) {
            overlay.classList.add('removed');
            overlay.classList.remove('opened');
        }
        if (content) {
            content.classList.remove("ReactModal__Content--after-open");
        }

        setTimeout(() => {
            closeModal();
        }, 330);
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="VideoModal"
            onRequestClose={closeVideo}
            shouldFocusAfterRender={false}
            style={customStyles}
            overlayClassName="video-modal-overlay"
            className="row video-modal"
            id="video-modal"
        >
            <video 
                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${singleSlug}`} 
                autoPlay 
                loop 
                controls 
                className="p-0"
            ></video>

            <button 
                title="Close (Esc)" 
                type="button" 
                className="mfp-close" 
                onClick={closeVideo}
            >
                <span>×</span>
            </button>
        </Modal>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isOpen: state.modal.openModal,
        singleSlug: state.modal.singleSlug,
    };
};

export default connect(mapStateToProps, { closeModal: modalActions.closeModal })(VideoModal);
