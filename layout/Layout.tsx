import { ReactNode } from 'react';
import Header from '../components/blog/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="max-width-container" style={{ padding: '50px 30px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
