import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {getLayout} from "../components/Layout/BaseLayout/BaseLayout";

const Home: NextPageWithLayout = () => (
    <PageWrapper>
        <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
        />
    </PageWrapper>
);

//Home.getLayout = getLayout // мы добавляем нашей странице ствойство getLayout - равное функции получения layout

Home.getLayout = getLayout
export default Home;
