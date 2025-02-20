import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Crypto Tracker',
  description: 'Track your favorite cryptocurrencies in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
