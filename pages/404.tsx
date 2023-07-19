import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {getLayout} from '../components/Layout/BaseLayout/BaseLayout_old';

const NotFound = () => {
    return <PageWrapper>404 NOT FOUND</PageWrapper>
}

NotFound.getLayout = getLayout
export default NotFound