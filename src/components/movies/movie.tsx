import Image from 'next/image';
import Link from 'next/link';

import { FilmIcon, StarIcon } from 'lucide-react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IMovie } from '@/lib/types';
import { getImageUrl } from '@/lib/utils';

export function Movie({ movie }: { movie: IMovie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="mx-auto h-full max-w-sm bg-muted/40 transition-opacity hover:opacity-90">
        {movie.poster_path ? (
          <AspectRatio ratio={4 / 6} className="relative rounded-t-xl">
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              fill
              className="rounded-t-xl"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={4 / 6} className="relative rounded-t-xl">
            <div className="flex h-full items-center justify-center rounded bg-background/30">
              <FilmIcon className="h-14 w-14 text-muted-foreground" />
            </div>
          </AspectRatio>
        )}
        <CardHeader className="p-4">
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-primary text-primary" />
            {movie.vote_average.toFixed(1)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
