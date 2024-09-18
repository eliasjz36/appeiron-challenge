'use client';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

import MainNav from './main-nav';
import SearchDropdown from './search-dropdown';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const [search, setSearch] = useState<string | undefined>();

  return (
    <header className="z-10 border-b border-border/60 bg-muted/40 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <MainNav />

        <div className="relative mx-auto">
          <Input
            type="search"
            placeholder="Buscar..."
            className="h-8 pl-7 md:w-72 lg:w-[600px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            debounce
          />
          <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />

          {search && <SearchDropdown search={search} setSearch={setSearch} />}
        </div>

        <nav className="flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
