import React from 'react';

import { LucideIcon, Star } from 'lucide-react';

import { cn } from '@/lib/utils';

const ratingVariants = {
  default: {
    star: 'text-foreground',
    emptyStar: 'text-muted-foreground',
  },
  destructive: {
    star: 'text-red-500',
    emptyStar: 'text-red-200',
  },
  yellow: {
    star: 'text-yellow-500',
    emptyStar: 'text-muted-foreground',
  },
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: LucideIcon;
}
const PartialStar = ({
  fillPercentage,
  size,
  className,
  Icon,
}: PartialStarProps) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <Icon size={size} className={className} />
    <div
      style={{
        position: 'absolute',
        top: 0,
        overflow: 'hidden',
        width: `${fillPercentage * 100}%`,
      }}
    >
      <Icon size={size} className={className} fill="currentColor" />
    </div>
  </div>
);

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: LucideIcon;
  variant?: keyof typeof ratingVariants;
}

const Ratings = ({
  rating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = Star,
  variant = 'default',
  ...rest
}: RatingsProps) => {
  const normalizedRating = Math.min((rating / 10) * totalStars, totalStars);

  const fullStars = Math.floor(normalizedRating);
  const partialStar =
    normalizedRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={normalizedRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div className={cn('flex items-center gap-2')} {...rest}>
      {[...Array(fullStars)].map((_, i) => (
        <Icon
          key={i}
          size={size}
          className={cn(
            fill ? 'fill-current' : 'fill-transparent',
            ratingVariants[variant].star,
          )}
        />
      ))}
      {partialStar}
      {[...Array(totalStars - fullStars - (partialStar ? 1 : 0))].map(
        (_, i) => (
          <Icon
            key={i + fullStars + 1}
            size={size}
            className={cn(ratingVariants[variant].emptyStar)}
          />
        ),
      )}
    </div>
  );
};

export { Ratings };
