import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACBISj9BaLgpkcdr9GVURsjV9aTiRF_5E&libraries=places"
            async
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
