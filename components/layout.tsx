import { ScriptProps } from 'next/script';
import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
