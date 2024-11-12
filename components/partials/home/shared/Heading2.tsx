"use client";
import React, { HTMLAttributes, ReactNode } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export interface Heading2Props extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
  isCenterClass?: string;
  itemClass?: string;
  descClass?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life.",
  className = "mb-10 text-neutral-900",
  isCenter = false,
  itemClass = "",
  isCenterClass = "text-center mx-auto mb-4",
  descClass = "",
  ...args
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className={`nc-Section-Heading relative ${
        isIntersecting
          ? "opacity-100 animate-fade-up animate-once animate-fill-both animate-duration-700"
          : "opacity-0"
      } ${className}`}
    >
      <div className={isCenter ? isCenterClass : ""}>
        <h2
          className={`text-lg md:text-xl font-semibold text-gray-600 ${itemClass}`}
          {...args}
        >
          {children || "Section Heading"}
        </h2>
        {desc && (
          <span
            className={`block mt-2 md:mt-3 font-normal text-base sm:text-md text-gray-600 ${descClass}`}
          >
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading2;
