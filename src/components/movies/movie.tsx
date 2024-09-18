import Image from 'next/image';
import Link from 'next/link';

import { StarIcon } from 'lucide-react';

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
        <AspectRatio ratio={4 / 6} className="relative rounded-t-xl">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="rounded-t-xl"
          />
        </AspectRatio>
        <CardHeader className="p-4">
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
