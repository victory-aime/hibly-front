import { ThemeProvider } from '_components/ui/provider';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { I18nProvider } from '_context/provider/i18n-provider';
import 'react-day-picker/dist/style.css';
import '_components/custom/agenda/index.css';
import { LoaderProvider } from '_context/loaderContext';
import { Toaster } from '_components/ui/toaster';
import GlobalApplicationProvider from '_context/provider/GlobalApplicationProvider';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Hibly',
  description: 'Simple dashboard for your app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${lato.variable}`} suppressHydrationWarning>
      <body>
        <GlobalApplicationProvider>
          <ThemeProvider>
            <LoaderProvider>
              <Toaster />
              <I18nProvider>{children}</I18nProvider>
            </LoaderProvider>
          </ThemeProvider>
        </GlobalApplicationProvider>
      </body>
    </html>
  );
}
