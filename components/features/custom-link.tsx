import Link from "next/link";
import React from 'react';
import { parseContent } from '~/utils';

interface ALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode; // Children can be any React node
    className?: string; // Optional className prop
    content?: string; // Optional content prop
    style?: React.CSSProperties; // Optional style prop
}

const ALink: React.FC<ALinkProps> = ({ children, className, content, style, ...props }) => {
    const preventDefault = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (props.href === '#') {
            e.preventDefault();
        }

        if (props.onClick) {
            props.onClick(e); // Pass the event to onClick
        }
    };

    return (
        <Link {...props} legacyBehavior>
            <a
                className={className}
                style={style}
                onClick={preventDefault}
                dangerouslySetInnerHTML={content ? parseContent(content) : undefined}
            >
                {children}
            </a>
        </Link>
    );
};

export default ALink;
