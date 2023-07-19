import {NextPage} from "next";
import {PropsWithChildren, ReactElement} from "react";
import {Layout} from "./Layout";

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return <Layout>{children}</Layout>
}

export const getLayout = (page: ReactElement) => { // функция принимающая компонент (аналог hoc) и возвращающая компоненту с доп функциональностью - оберткой с меню Header
    return <BaseLayout>{page}</BaseLayout>
}