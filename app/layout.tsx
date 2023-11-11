import { workSans } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
