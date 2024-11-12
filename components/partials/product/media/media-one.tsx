import React, { useState, useEffect, useRef } from 'react';
import { Magnifier } from 'react-image-magnifiers';
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import ThumbOne from '~/components/partials/product/thumb/thumb-one';
import ThumbTwo from '~/components/partials/product/thumb/thumb-two';
import MediaLightBox from '~/components/partials/product/light-box';
import { mainSlider3 } from '~/utils/data/carousel';

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
    const [index, setIndex] = useState<number>(0);
    const [isOpen, setOpenState] = useState<boolean>(false);
    const mediaRef = useRef<any>(null);

    const lgImages = product.large_pictures || product.pictures;

    useEffect(() => {
        setIndex(0);
    }, [window.location.pathname]);

    useEffect(() => {
        if (mediaRef.current && index >= 0) {
            mediaRef.current.$car.to(index, 300, true);
        }
    }, [index]);

    const setIndexHandler = (mediaIndex: number) => {
        if (mediaIndex !== index) {
            setIndex(mediaIndex);
        }
    };

    const changeOpenState = (openState: boolean) => {
        setOpenState(openState);
    };

    const openLightBox = () => {
        setOpenState(true);
    };

    const events = {
        onTranslate: (e: any) => {
            if (!e.target) return;
            const thumbs = document.querySelector('.product-thumbs');
            if (thumbs) {
                const activeThumb = thumbs.querySelector('.product-thumb.active');
                if (activeThumb) {
                    activeThumb.classList.remove('active');
                }
                thumbs.querySelectorAll('.product-thumb')[e.item.index].classList.add('active');
            }
        }
    };

    return (
        <>
            <div className="product-gallery pg-vertical media-default" style={{ top: "88px" }}>
                <div className="product-label-group">
                    {product.stock === 0 && <label className="product-label label-out">out</label>}
                    {product.is_top && <label className="product-label label-top">top</label>}
                    {product.is_new && <label className="product-label label-new">new</label>}
                    {product.discount && <label className="product-label label-sale">sale</label>}
                </div>

                <OwlCarousel 
                    adClass="product-single-carousel owl-theme owl-nav-inner"
                    options={mainSlider3}
                    onChangeIndex={setIndexHandler}
                    onChangeRef={setMediaRef}
                    events={events}
                >
                    {lgImages.map((image, idx) => (
                        <div key={`${image.url}-${idx}`}>
                            <Magnifier
                                imageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                                imageAlt="magnifier"
                                largeImageSrc={`${process.env.NEXT_PUBLIC_ASSET_URI}${image.url}`}
                                dragToMove={false}
                                mouseActivation="hover"
                                cursorStyleActive="crosshair"
                                className="product-image large-image"
                            />
                        </div>
                    ))}
                </OwlCarousel>

                <ALink href="#" className="product-image-full" onClick={openLightBox}>
                    <i className="d-icon-zoom"></i>
                </ALink>

                <ThumbOne product={product} index={index} onChangeIndex={setIndexHandler} />
                <ThumbTwo product={product} index={index} onChangeIndex={setIndexHandler} />
            </div>

            <MediaLightBox images={lgImages} isOpen={isOpen} changeOpenState={changeOpenState} index={index} product={product} />
        </>
    );
};

export default MediaOne;
