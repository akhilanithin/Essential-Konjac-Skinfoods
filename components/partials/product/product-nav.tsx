import ALink from '~/components/features/custom-link';
import { useRouter } from 'next/router';

interface Picture {
    url: string;
}

interface Product {
    prev?: {
        slug: string;
        name: string;
        pictures: Picture[];
    };
    next?: {
        slug: string;
        name: string;
        pictures: Picture[];
    };
}

interface ProductNavProps {
    product: Product;
}

const ProductNav: React.FC<ProductNavProps> = ({ product }) => {
    const router = useRouter();

    return (
        <ul className="product-nav">
            {/* {product.prev && (
                <li className={`product-nav-${product.next ? 'prev' : 'next no-next'}`}>
                    <ALink href={{ pathname: router.pathname, query: { slug: product.prev.slug } }} scroll={false}>
                        <i className="d-icon-arrow-left"></i> Prev
                        <span className="product-nav-popup">
                            <img
                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.prev.pictures[0].url}`}
                                alt="product thumbnail"
                                width="110"
                                height="123"
                            />
                            <span className="product-name">{product.prev.name}</span>
                        </span>
                    </ALink>
                </li>
            )}

            {product.next && (
                <li className="product-nav-next">
                    <ALink href={{ pathname: router.pathname, query: { slug: product.next.slug } }} scroll={false}>
                        Next <i className="d-icon-arrow-right"></i>
                        <span className="product-nav-popup">
                            <img
                                src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.next.pictures[0].url}`}
                                alt="product thumbnail"
                                width="110"
                                height="123"
                            />
                            <span className="product-name">{product.next.name}</span>
                        </span>
                    </ALink>
                </li>
            )} */}
        </ul>
    );
};

export default ProductNav;
