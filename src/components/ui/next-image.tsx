import React from 'react';
import cn from 'clsx';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';
import type { ImageProps } from 'next/image';
type NextImageProps = {
  alt?: string;
  width?: string | number;
  children?: ReactNode;
  useSkeleton?: boolean;
  imgClassName?: string;
  previewCount?: number;
  blurClassName?: string;
} & ImageProps;
const NextImage: FC<NextImageProps> = ({
  src,
  alt,
  width,
  height,
  children,
  className,
  imgClassName,
  blurClassName,
  useSkeleton,
  ...rest
}): JSX.Element => {
  return (
    <figure style={{ width }} className={className}>
      <Image
        className={cn(imgClassName)}
        src={src}
        width={width}
        height={height}
        alt={alt}
        layout='responsive'
        {...rest}
      />{' '}
      {children}
    </figure>
  );
};

export default NextImage;
