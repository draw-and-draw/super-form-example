import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ReactQueryProvider } from '../contexts/react-query-context';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/blog/MDXComponents';

import 'dayjs/locale/zh-cn';
import '../styles/globals.css';
import Layout from '../layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ReactQueryProvider>
      </MantineProvider>
    </MDXProvider>
  );
}
