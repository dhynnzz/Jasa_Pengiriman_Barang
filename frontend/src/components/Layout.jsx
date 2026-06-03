import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full flex flex-col relative z-10">
        {children}
      </main>
      <div className="mt-auto relative z-20 w-full bg-white">
        <Footer />
      </div>
    </div>
  );
}
