'use client';

import Link from 'next/link';

import { PopcornIcon } from 'lucide-react';

export default function MainNav() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <PopcornIcon className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-extrabold">TMDb</h1>
    </Link>
  );
}
