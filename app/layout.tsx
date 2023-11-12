import { workSans } from './ui/fonts';
import './ui/global.css';

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} antialiased`}>
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
