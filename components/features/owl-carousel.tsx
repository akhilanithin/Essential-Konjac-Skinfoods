import React, { useRef, useEffect, ReactNode } from 'react';
import Carousel, { Options } from 'react-owl-carousel2';

interface OwlCarouselProps {
    adClass?: string;
    options?: Options;
    onChangeRef?: (ref: React.RefObject<any>) => void;
    onChangeIndex?: (index: number) => void;
    events?: Record<string, any>;
    children?: ReactNode;
}

const OwlCarousel: React.FC<OwlCarouselProps> = (props) => {
    const { adClass, options, children, onChangeRef, onChangeIndex, events } = props;
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const defaultOptions: Options = {
        items: 1,
        loop: false,
        margin: 0,
        responsiveClass: true,
        nav: true,
        navText: ['<i class="d-icon-angle-left">', '<i class="d-icon-angle-right">'],
        navElement: 'button',
        dots: true,
        smartSpeed: 400,
        autoplay: false,
        autoHeight: false,
    };

    useEffect(() => {
        if (onChangeRef) {
            onChangeRef(carouselRef);
        }
    }, [carouselRef, onChangeRef]);

    const combinedEvents = {
        onTranslated: (e: any) => {
            if (!e.target) return;
            if (onChangeIndex) {
                onChangeIndex(e.item.index);
            }
        },
        ...events,
    };

    const settings: Options = { ...defaultOptions, ...options };

    return (
        children ? (
            (Array.isArray(children) && children.length > 0) || !Array.isArray(children) ? (
                <Carousel ref={carouselRef} className={`owl-carousel ${adClass}`} options={settings} events={combinedEvents}>
                    {children}
                </Carousel>
            ) : null
        ) : null
    );
};

export default React.memo(OwlCarousel);
