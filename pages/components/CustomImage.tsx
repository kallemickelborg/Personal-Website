import { ImgHTMLAttributes } from 'react';

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  layout: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
  width?: number;
  height?: number;
}

const CustomImage = ({ layout, width, height, ...props }: CustomImageProps) => {
  return (
    <img
      {...props}
      style={{
        objectFit: layout === 'fill' ? 'cover' : 'initial',
        width: layout === 'responsive' || layout === 'fill' ? '100%' : width,
        height: layout === 'responsive' || layout === 'fill' ? 'auto' : height,
      }}
    />
  );
};

export default CustomImage;