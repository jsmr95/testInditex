import type * as React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  readonly variant?: 'text' | 'rect' | 'circle';
  readonly width?: string | number;
  readonly height?: string | number;
  readonly className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height:
      height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  const classNames = [styles.skeleton, styles[variant], className].filter(Boolean).join(' ');

  return <div className={classNames} style={style} aria-hidden="true" />;
};
