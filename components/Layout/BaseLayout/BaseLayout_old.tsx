import {NextPage} from 'next';
import {PropsWithChildren, ReactElement} from 'react';
import {Layout_old} from '../Layout_old';

export const BaseLayout_old: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return <Layout_old>{children}</Layout_old>
}

export const getLayout = (page: ReactElement) => {
    return <BaseLayout_old>{page}</BaseLayout_old>
}