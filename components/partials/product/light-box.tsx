import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface Image {
    url: string;
}

interface MediaLightBoxProps {
    images: Image[];
    product: {
        name: string;
    };
    isOpen: boolean;
    index: number;
    changeOpenState: (isOpen: boolean) => void;
}

const MediaLightBox: React.FC<MediaLightBoxProps> = (props) => {
    const { images, product, isOpen: propIsOpen, index: propIndex, changeOpenState } = props;
    const [isOpen, setOpenState] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setOpenState(propIsOpen);
    }, [propIsOpen]);

    useEffect(() => {
        setIndex(propIndex);
    }, [propIndex]);

    const closeLightBox = () => {
        changeOpenState(false);
    };

    const setNextHandler = () => {
        setIndex((index + 1) % images.length);
    };

    const setPrevHandler = () => {
        setIndex((index + images.length - 1) % images.length);
    };


    
    const lgImages = product?.variation[0]?.images ? product?.variation[0]?.images : product?.pictures;


    // console.log(lgImages[0]?.image);
    
    // console.log(index);

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;
    

    // {`${PRODUCT_IMAGE_BASEURL}/products/${image?.image}`}

    return (
        <>
            {isOpen && (
                <Lightbox
                    mainSrc={`${PRODUCT_IMAGE_BASEURL}/products/${lgImages[index]?.image}`}
                    nextSrc={`${PRODUCT_IMAGE_BASEURL}/products/${lgImages[(index + 1) % images?.length]}`}
                    prevSrc={`${PRODUCT_IMAGE_BASEURL}/products/${lgImages[(index + images?.length - 1) % images?.length]}`}
                    onCloseRequest={closeLightBox}
                    onMovePrevRequest={setPrevHandler}
                    onMoveNextRequest={setNextHandler}
                    animationDisabled={false}
                    animationDuration={300}
                    imageTitle={product.name}
                    imagePadding={80}
                    clickOutsideToClose={true}
                />
            )}
        </>
    );
};

export default MediaLightBox;
