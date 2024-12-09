import React from 'react';
import ReactPlayer from 'react-player'; // assuming you are using ReactPlayer for video playback

interface VideoModalProps {
    isOpen: boolean;
    videoId: string;
    title: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoId, title, onClose }) => {
    if (!isOpen) return null; // Don't render if modal is not open

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#fff',
                    width: '80%',
                    height: '80%',
                    maxWidth: '1200px',
                    maxHeight: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '10px',
                    position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
            >
                <h2>{title}</h2>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    playing
                    controls
                    width="100%"
                    height="100%"
                />
                 <button
                    className="close-btn"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'black',
                        border: 'none',
                        fontSize: '24px',
                        color: '#fff',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default VideoModal;
