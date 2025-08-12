import React, { ReactNode, FC } from 'react';

type CardsProps = {
  src?: string;
  alt?: string;
  href?: string;
  children: ReactNode;
};

const Cards: FC<CardsProps> = ({ src, alt, href, children }) => {
  return (
    <div className="max-w bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" >
      <a href={href}>
        {src && (
          <img className="rounded-t-lg" src={src} alt={alt || "Card image"} />
        )}
        <div className="p-5">{children}</div>
      </a>
    </div>
  );
};

export default Cards;