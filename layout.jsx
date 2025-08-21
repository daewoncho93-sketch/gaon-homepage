import './globals.css';

export const metadata = {
  title: '손해사정사무소 가온',
  description: '검사·판사 출신 변호사 / 보험사 본사·금감원 출신 손해사정사 / 메이저 대학병원 의료심사 참여',
  metadataBase: new URL('https://example.com')
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
