/**********************************************************
 * Documents
 *
 * @author Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {GA_TRACKING_ID} from '../utils/ga/gtag';

const IMAGE_PATH = process.env.IMAGE_PATH;

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
              `,
                }}
              />
            </>
          )}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff"></meta>
          {/* ogp */}
          <meta name="description" content="普通のディスクリプション" />
          <meta property="og:title" content="OGPのタイトル" />
          <meta property="og:description" content="OGPのディスクリプション" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://foo.com" />
          <meta property="og:image" content={IMAGE_PATH} />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Hello Slide" />
          <meta name="twitter:description" content="Hello Slide Description" />
          <meta name="twitter:image" content={IMAGE_PATH} />
          <meta name="twitter:site" content="@Cateiru" />
          <meta name="twitter:creator" content="@Cateiru" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
