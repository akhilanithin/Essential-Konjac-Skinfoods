import React, { useState, useEffect } from 'react';

interface Product {
    pictures: { url: string }[];
}

interface ThumbOneProps {
    index: number;
    product: Product;
    onChangeIndex?: (index: number) => void;
}

const ThumbOne: React.FC<ThumbOneProps> = ({ index, product, onChangeIndex }) => {
    const [pos, setPos] = useState(0);
    const [term, setTerm] = useState(4);

    useEffect(() => {
        const initCarouselHandler = () => {
            if (window.innerWidth < 992) {
                document.querySelector('.product-thumbs-one')!.style.display = 'none';
                document.querySelector('.product-thumbs-two')!.style.display = 'block';
                window.jQuery('.owl-carousel').trigger('refresh.owl.carousel');
            } else {
                document.querySelector('.product-thumbs-one')!.style.display = 'block';
                document.querySelector('.product-thumbs-two')!.style.display = 'none';
                setTermHandler();
            }
        };

        const handleResize = () => {
            initCarouselHandler();
        };

        window.addEventListener('resize', handleResize);

        setTimeout(() => {
            let productThumb = document.querySelector('.product-thumb') as HTMLElement;
            let wrapperHeight = document.querySelector('.product-thumbs-one')!.offsetHeight;
            let thumbSpace = parseInt(window.getComputedStyle(productThumb).getPropertyValue("margin-bottom"));
            let transformUnit = productThumb.offsetHeight + thumbSpace;
            let newTerm = Math.floor((document.querySelector('.product-gallery.pg-vertical')!.offsetHeight + thumbSpace) / transformUnit);
            if (newTerm !== term) {
                setTerm(newTerm);
            }
        }, 300);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const productThumbs = document.querySelector('.product-thumbs-one') as HTMLElement;

        if (window.innerWidth < 992) {
            productThumbs.style.display = 'none';
            document.querySelector('.product-thumbs-two')!.style.display = 'block';
            window.jQuery('.owl-carousel').trigger('refresh.owl.carousel');
        } else {
            productThumbs.style.display = 'block';
            document.querySelector('.product-thumbs-two')!.style.display = 'none';
        }

        setPos(0);

        if (term < product.pictures.length) {
            productThumbs.querySelector('.thumb-down')!.classList.remove('disabled');
        } else {
            productThumbs.querySelector('.thumb-down')!.classList.add('disabled');
        }

        if (document.querySelector('.product-thumbs')) {
            activeItem(0);
            productThumbs.querySelector('.thumb-up')!.classList.add('disabled');
            document.querySelector('.product-thumbs')!.style.top = '0';
        }
    }, [product]);

    useEffect(() => {
        if (pos + term - 1 < index) {
            moveThumb("down");
            setPos(pos + 1);
        }

        if (index < pos) {
            moveThumb("up");
            setPos(pos - 1);
        }

        activeItem(index);
    }, [index]);

    useEffect(() => {
        const productThumbs = document.querySelector('.product-thumbs-one') as HTMLElement;
        if (pos + term < product.pictures.length) {
            productThumbs.querySelector('.thumb-down')!.classList.remove('disabled');
        } else {
            productThumbs.querySelector('.thumb-down')!.classList.add('disabled');
        }
    }, [term]);

    useEffect(() => {
        const productThumbs = document.querySelector('.product-thumbs-one') as HTMLElement;
        if (productThumbs) {
            if (pos > 0) {
                productThumbs.querySelector('.thumb-up')!.classList.remove('disabled');
            } else {
                productThumbs.querySelector('.thumb-up')!.classList.add('disabled');
            }

            if (pos + term < product.pictures.length) {
                productThumbs.querySelector('.thumb-down')!.classList.remove('disabled');
            } else {
                productThumbs.querySelector('.thumb-down')!.classList.add('disabled');
            }
        }
    }, [pos]);

    const moveThumb = (type: "up" | "down" = "up") => {
        const sign = type === "up" ? 1 : -1;
        const productThumb = document.querySelector('.product-thumb') as HTMLElement;
        const wrapperHeight = document.querySelector('.product-thumbs-one')!.offsetHeight;
        const transformUnit = productThumb.offsetHeight + parseInt(window.getComputedStyle(productThumb).getPropertyValue("margin-bottom"));

        if (type === 'down') {
            document.querySelector('.product-thumbs')!.style.top = `${-transformUnit * (pos - sign) + (wrapperHeight - transformUnit * term) + parseInt(window.getComputedStyle(productThumb).getPropertyValue("margin-bottom"))}px`;
        } else {
            document.querySelector('.product-thumbs')!.style.top = `${-transformUnit * (pos - sign)}px`;
        }
    };

    const activeItem = (index: number) => {
        const thumbsContainer = document.querySelector('.product-thumbs')!;
        const activeItems = thumbsContainer.querySelectorAll('.active.product-thumb');
        activeItems.forEach(item => item.classList.remove('active'));
        thumbsContainer.querySelectorAll('.product-thumb')[index].classList.add('active');
    };

    const setTermHandler = () => {
        setTimeout(() => {
            const productThumb = document.querySelector('.product-thumb') as HTMLElement;
            const wrapperHeight = document.querySelector('.product-thumbs-one')!.offsetHeight;
            const thumbSpace = parseInt(window.getComputedStyle(productThumb).getPropertyValue("margin-bottom"));
            const transformUnit = productThumb.offsetHeight + thumbSpace;
            const newTerm = Math.floor((document.querySelector('.product-gallery.pg-vertical')!.offsetHeight + thumbSpace) / transformUnit);

            if (newTerm !== term) {
                setTerm(newTerm);
            }

            const thumbContainer = document.querySelector('.product-thumbs-one')!;
            if (product.pictures.length <= newTerm) {
                setTimeout(() => {
                    thumbContainer.querySelector('.product-thumbs')!.style.top = '0';
                }, 100);
            } else {
                const currentTop = parseInt(window.getComputedStyle(thumbContainer.querySelector('.product-thumbs')!).getPropertyValue('top'));
                const offset = currentTop + transformUnit * product.pictures.length - thumbSpace;
                const temp = wrapperHeight - offset;

                if ((index > newTerm - 1 || temp >= 0) && product.pictures.length > newTerm) {
                    thumbContainer.querySelector('.product-thumbs')!.style.top = `${currentTop + temp}px`;
                }
            }
        }, 300);
    };

    const prevPosHandler = () => {
        setPos(pos - 1);
        moveThumb("up");
    };

    const nextPosHandler = () => {
        setPos(pos + 1);
        moveThumb("down");
    };

    const activeHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (onChangeIndex) {
            onChangeIndex(index);
        }

        activeItem(index);
    };

    return (
        <div className="product-thumbs-wrap product-thumbs-one">
            <div className="product-thumbs" id="product-thumbs">
                {product.pictures.map((item, idx) => (
                    <div
                        className={`product-thumb`}
                        key={`thumb-${idx}`}
                        onClick={(e) => activeHandler(e, idx)}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_ASSET_URI}${item.url}`}
                            alt="product thumbnail"
                            width="109"
                            height="122"
                        />
                    </div>
                ))}
            </div>

            <button className="thumb-up" onClick={prevPosHandler}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="thumb-down" onClick={nextPosHandler}>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default ThumbOne;
