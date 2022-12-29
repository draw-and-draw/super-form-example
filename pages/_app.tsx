import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ReactQueryProvider } from '../src/contexts/react-query-context';

import 'dayjs/locale/zh-cn';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        datesLocale: 'zh-cn',
        colorScheme: 'light',
      }}
    >
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </MantineProvider>
  );
}
