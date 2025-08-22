import './styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '손해사정사무소 가온',
  description: '검사·판사 출신 변호사 · 보험사 본사·금감원 출신 손해사정사 · 메이저 대학병원 의료심사 출신 의료인. 보상 시뮬레이터 제공.',
};

export default function RootLayout({ children }){
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
