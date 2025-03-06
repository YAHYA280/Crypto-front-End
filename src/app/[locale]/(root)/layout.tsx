import CryptoCoinsBar from '../../components/CryptoCoinsBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function RootPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CryptoCoinsBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
