import Layout from '../components/Layout/Layout';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store, { persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
