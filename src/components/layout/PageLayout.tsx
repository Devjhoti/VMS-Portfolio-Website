import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { ScrollRestorer } from './ScrollRestorer';
import { ScrollToTopButton } from '../ui/ScrollToTopButton';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <ScrollRestorer />
      <Navbar />
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  );
}
