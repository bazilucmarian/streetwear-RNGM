import Page from '../components/Page';
import Router from 'next/router';
import Nprogress from 'nprogress';

// style for nprogress
import '../styles/nprogress.css';
import { CartStateProvider } from '../context/cartState';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeStart', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
