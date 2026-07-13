import * as React from 'react';

import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  readonly fallbackSrc?: string;
  readonly placeholderHeight?: string | number;
  readonly wrapperClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  fallbackSrc,
  placeholderHeight,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const imgStyle: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity var(--transition-base)',
  };

  if (hasError) {
    return (
      <div
        className={`${styles.fallback} ${className}`}
        style={{ height: placeholderHeight }}
        role="img"
        aria-label={alt || 'Imagen no disponible'}
      >
        <span className={styles.fallbackText}>{alt || 'NO DISPONIBLE'}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`} style={{ height: placeholderHeight }}>
      {!isLoaded && <div className={styles.placeholder} />}
      <img
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        style={imgStyle}
        className={`${styles.image} ${className}`}
        loading="lazy"
        {...props}
        alt={alt}
      />
    </div>
  );
};
