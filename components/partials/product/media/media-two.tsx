import React, { useState, useEffect } from 'react';
import { Magnifier } from 'react-image-magnifiers';
import MediaLightBox from '~/components/partials/product/light-box';

interface Image {
    url: string;
}

interface Product {
    large_pictures?: Image[];
    pictures?: Image[];
    stock: number;
    is_top?: boolean;
    is_new?: boolean;
    discount?: boolean;
}

interface MediaTwoProps {
    product: Product;
}

const MediaTwo: React.FC<MediaTwoProps> = ({ product }) => {
    const [index, setIndex] = useState<number>(0);
    const [isOpen, setOpenState] = useState<boolean>(false);

    const lgImages = product.large_pictures || product.pictures;

    useEffect(() => {
        setIndex(0);
    }, [window.location.pathname]);

    const changeOpenState = (openState: boolean) => {
        setOpenState(openState);
    };

    const openLightBox = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const idx = parseInt(e.currentTarget.getAttribute("index") || "0", 10);
        setIndex(idx);
        setOpenState(true);
    };

    return (
        <>
            <div className="product-gallery row cols-sm-2">
                {lgImages.slice(0, 4).map((image, idx) => (
                    <figure className="product-image mb-4" key={`image-${idx}`}>
                        <Magnifier
                            imageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                            imageAlt="magnifier"
                            largeImageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                            dragToMove={false}
                            mouseActivation="hover"
                            cursorStyleActive="crosshair"
                            className="product-image large-image"
                        />

                        {idx === 0 && (
                            <div className="product-label-group">
                                {product.stock === 0 && <label className="product-label label-out">out</label>}
                                {product.is_top && <label className="product-label label-top">top</label>}
                                {product.is_new && <label className="product-label label-new">new</label>}
                                {product.discount && <label className="product-label label-sale">sale</label>}
                            </div>
                        )}

                        <a href="#" className="product-image-full" onClick={openLightBox} index={idx.toString()}>
                            <i className="d-icon-zoom"></i>
                        </a>
                    </figure>
                ))}
            </div>

            <MediaLightBox
                images={lgImages.slice(0, 4)}
                isOpen={isOpen}
                changeOpenState={changeOpenState}
                index={index}
                product={product}
            />
        </>
    );
};

export default MediaTwo;
