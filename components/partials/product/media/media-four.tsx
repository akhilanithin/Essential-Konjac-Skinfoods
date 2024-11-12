import React, { useState } from 'react';
import { Magnifier } from 'react-image-magnifiers';
import OwlCarousel from '~/components/features/owl-carousel';
import MediaLightBox from '~/components/partials/product/light-box';
import { mainSlider18 } from '~/utils/data/carousel';

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

interface MediaOneProps {
    product: Product;
}

const MediaOne: React.FC<MediaOneProps> = ({ product }) => {
    const [isOpen, setOpenState] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const lgImages = product.large_pictures || product.pictures;

    const changeOpenState = (openState: boolean) => {
        setOpenState(openState);
    };

    const openLightBox = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIndex(parseInt(e.currentTarget.getAttribute("index") || "0", 10));
        setOpenState(true);
    };

    return (
        <div className="product-gallery product-extended mb-6">
            <div className="product-label-group">
                {product.stock === 0 && <label className="product-label label-out">out</label>}
                {product.is_top && <label className="product-label label-top">top</label>}
                {product.is_new && <label className="product-label label-new">new</label>}
                {product.discount && <label className="product-label label-sale">sale</label>}
            </div>

            <OwlCarousel adClass="product-gallery-carousel owl-nav-full owl-theme" options={mainSlider18}>
                {lgImages.map((image, index) => (
                    <div key={`${image.url}-${index}`}>
                        <Magnifier
                            imageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                            imageAlt="magnifier"
                            largeImageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                            dragToMove={false}
                            mouseActivation="hover"
                            cursorStyleActive="crosshair"
                            className="product-image large-image"
                        />
                        <a href="#" className="product-image-full" onClick={openLightBox} index={index.toString()}>
                            <i className="d-icon-zoom"></i>
                        </a>
                    </div>
                ))}
            </OwlCarousel>

            <MediaLightBox images={lgImages} isOpen={isOpen} changeOpenState={changeOpenState} index={index} product={product} />
        </div>
    );
};

export default MediaOne;
