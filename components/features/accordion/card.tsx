import React from 'react';
import SlideToggle from 'react-slide-toggle';
import ALink from '~/components/features/custom-link';

interface CardProps {
    title?: string; // Optional title prop
    expanded?: boolean; // Optional prop to control expanded state
    adClass?: string; // Optional additional class names
    iconClass?: string; // Optional icon class
    type?: 'normal' | 'parse' | string; // Type can be "normal", "parse", or any string
    url?: string; // Optional URL for the link
    children?: React.ReactNode; // Accepts any valid React node as children
}

const Card: React.FC<CardProps> = (props) => {
    const { title, expanded = false, adClass, iconClass, type = "normal", url } = props;

    const renderCardContent = (onToggle: () => void, setCollapsibleElement: (element: HTMLElement | null) => void, toggleState: string) => (
        <>
            <ALink
                href={url ? url : '#'}
                className={type === 'parse' ? `parse-content ${toggleState.toLowerCase()}` : undefined}
                onClick={(e) => {
                    if (type === 'parse') onToggle();
                    e.preventDefault();
                }}
            >
                {iconClass && <i className={iconClass}></i>}
                {title}
                {type !== 'parse' && (
                    <span className={`toggle-btn ${toggleState.toLowerCase()}`} onClick={(e) => { onToggle(); e.preventDefault(); }}></span>
                )}
            </ALink>

            <div ref={setCollapsibleElement} className="overflow-hidden">
                {props.children}
            </div>
        </>
    );

    return (
        <SlideToggle collapsed={!expanded}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
                <div className={`card ${adClass}`}>
                    <div className="card-header" onClick={onToggle}>
                        {renderCardContent(onToggle, setCollapsibleElement, toggleState)}
                    </div>
                </div>
            )}
        </SlideToggle>
    );
};

export default Card;
