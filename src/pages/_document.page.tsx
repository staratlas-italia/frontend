import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-capable" content="yes"></meta>
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black"
            ></meta>
            <meta
              name="apple-mobile-web-app-title"
              content="StarAtlasItalia"
            ></meta>
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
