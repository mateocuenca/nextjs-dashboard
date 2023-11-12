import { workSans } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode,

}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} antialiased`}>
        {modal}
        {children}
      </body>
    </html>
  );
}
