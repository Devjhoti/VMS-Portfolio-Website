import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

import { ScrollToTopButton } from '../ui/ScrollToTopButton';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  );
}
