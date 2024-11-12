import React, { ReactNode } from 'react';

interface AccordionProps {
    adClass?: string; // Optional prop for additional classes
    children: ReactNode; // Accepts any valid React node as children
}

const Accordion: React.FC<AccordionProps> = (props) => {
    const { adClass, children } = props;

    const onHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains("toggle-button") || target.querySelector(".toggle-button")) {
            const toggleButton = target.classList.contains("toggle-button") ? target : target.querySelector(".toggle-button");

            if (toggleButton && (toggleButton.classList.contains("collapsed") || toggleButton.classList.contains("collapsing"))) {
                const expandedButton = e.currentTarget.querySelector(".toggle-button.expanded") as HTMLElement;
                const expandingButton = e.currentTarget.querySelector(".toggle-button.expanding") as HTMLElement;

                if (expandedButton) {
                    expandedButton.click();
                }

                if (expandingButton) {
                    expandingButton.click();
                }
            }
        }
    };

    return (
        <div className={`accordion ${adClass}`} onClick={onHandleClick}>
            {children}
        </div>
    );
};

export default Accordion;
