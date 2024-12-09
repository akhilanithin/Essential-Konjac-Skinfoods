import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import VideoModal from './VideoModal';  // Import the VideoModal component
import ALink from '~/components/features/custom-link';

// Define the types for the product and props
interface Product {
    id: string;
    name: string;
    image: string;
    variation: any[];
    category?: any[];
    review?: any[];
    fresharrival?: number;
    slug?: string;
    picture: any[];
    snippet?: any;
}

interface ProductTwoProps {
    video: Product;
    adClass?: string;
}

const ProductTwo: React.FC<ProductTwoProps> = ({ video, adClass = 'text-center' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    const handlePlayClick = (videoId: string) => {
        setPlayingVideoId(videoId);
        setIsModalOpen(true); // Open the modal when play is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPlayingVideoId(null); // Reset video ID on close
    };

    return (
        <div className="container">
            {/* VideoModal component to display the video */}
            <VideoModal
                isOpen={isModalOpen}
                videoId={playingVideoId || ''}
                title={video?.snippet?.title || ''}
                onClose={handleCloseModal}
           
            />

            <div className={`product text-left ${adClass}`}>
                <figure className="p-relative">
                    <div className="video-placeholder">
                        <LazyLoadImage
                            className="w-100 d-block"
                            src={video?.snippet?.thumbnails?.standard?.url}
                            alt="Product"
                            width="370"
                            height="280"
                        />
                        <ALink
                            className="btn-play btn-iframe"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePlayClick(video?.snippet?.resourceId?.videoId);
                            }}
                        >
                            <i className="d-icon-play-solid"></i>
                        </ALink>
                    </div>
                </figure>

                <div className="product-details">

                <a  href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}  target="_blank">   <h3 className="post-title">        
                        {video?.snippet?.title
                            ? video.snippet.title.split(' ').slice(0, 6).join(' ') + '...'
                            : 'No title available'}
                    </h3></a>
                    {/* <h3 className="post-title">        
                        {video?.snippet?.title
                            ? video.snippet.title.split(' ').slice(0, 6).join(' ') + '...'
                            : 'No title available'}
                    </h3> */}

                    <a  href="#" onClick={(e) => {
                                e.preventDefault();
                                handlePlayClick(video?.snippet?.resourceId?.videoId);
                            }}><p className="post-content">{video?.snippet?.description}</p></a>

                    <p className="post-content">
                        {video?.snippet?.publishedAt
                            ? format(new Date(video.snippet.publishedAt), 'dd-MM-yyyy hh:mm:ss a')
                            : 'No date available'}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Map Redux state to component props (if necessary)
const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || [],
});

export default connect(mapStateToProps)(ProductTwo);
