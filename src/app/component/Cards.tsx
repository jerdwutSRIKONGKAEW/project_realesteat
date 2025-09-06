import React, { ReactNode, FC } from 'react';

type CardsProps = {
  src?: string;
  alt?: string;
  href?: string;
  title?: string;
  favoriteButton?: ReactNode;
  children: ReactNode;
};

const Cards: FC<CardsProps> = ({ src, alt, href, children, title, favoriteButton }) => {
  return (
     <div className="max-w bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative" >
      <a href={href}>
        <div className='justify-center flex h-60'> 
          {src && (
            <img className="max-h-75 object-contain pt-3" src={src} alt={alt || "Card image"} />
          )}
        </div>
        <div className="card-title">{title}</div>
      </a>
        <div className="absolute top-3 right-3 z-50">
          {favoriteButton}
        </div>
      <div className="pb-5 pl-5 pr-5">{children}</div>
    </div>
  );
};

export default Cards;