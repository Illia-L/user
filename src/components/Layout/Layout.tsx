import React, { type PropsWithChildren } from 'react';
import { Header } from '../header/Header/Header';
import { Footer } from '../footer/Footer/Footer';
import css from './Layout.module.css';

export type LayoutTheme = 'default' | 'contrast';

interface LayoutProps extends PropsWithChildren {
  theme?: LayoutTheme;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={css.app}>
      <Header />

      <main className={css.main}>
        <div className='container'>{children}</div>
      </main>

      <Footer />
    </div>
  );
};
