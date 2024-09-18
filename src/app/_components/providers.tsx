'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { store } from '@/lib/store/store';

export default function Providers({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </NextThemesProvider>
  );
}
