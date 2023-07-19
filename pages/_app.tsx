import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useState} from 'react';
import {NextPage} from 'next';
import {QueryClient} from '@tanstack/query-core';
import {Hydrate, QueryClientProvider} from '@tanstack/react-query';
import {useLoader} from "../assets/hooks/useLoader";
import 'styles/nprogress.css'

// два объявления типа ниже - типизация компоненты с Layout_old - взято с официальной документаци https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {

    const [queryClient] = useState(() => new QueryClient)

    useLoader()

    // если у Component есть свойство getLayout, то будет использованно это свойство (функция оберткка с Layout), иначе просто вернется аргумент - сама компонента (page) без layout
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <QueryClientProvider client={queryClient}> {/* оборачиваем все приложение в провайдер для запроса*/}
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    );
}
