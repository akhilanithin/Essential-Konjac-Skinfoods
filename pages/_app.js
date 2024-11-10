import { useEffect } from 'react';
import { useStore, Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from "react-helmet";

import { wrapper } from "../store/index.js";
import Layout from '~/components/layout';

import { demoActions } from '~/store/demo';

import { currentDemo } from '~/server/queries';

import "~/public/sass/style.scss";

const App = ({ Component, pageProps }) => {
    const store = useStore();

    useEffect(() => {
        if (store.getState().demo.current !== currentDemo) {
            store.dispatch(demoActions.refreshStore(currentDemo));
        }
    }, [])

    return (
        <Provider store={store}>
            <PersistGate
                persistor={store.__persistor}
                loading={<div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                        <div className="bounce4"></div>
                    </div>
                </div>}>
                <Helmet>
                    <meta charSet="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <title>EKSFC</title>

                    <meta name="keywords" content="skin care, moisturizer, moisturizing cream, cleanser, skincare, cleanser, eye cream, best eye cream, hydrating cleanser, best moisturizer for dry skin, moisturizer for oily skin, best moisturizer, acid cleanser, best eye cream for dark circles, best face moisturizer, body care, anti aging cream, stretch mark cream, best acne treatment, korean skin care, acne cream, skin clinic near me, timeless vitamin c, best anti aging cream, retinol, salicylic acid"/>
                    <meta name="description" content="Essential Konjac Skin Food. The royal elegance to love yourself more." />
                    <meta name="author" content="Jawad Rana" />
                </Helmet>

                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default wrapper.withRedux(App);