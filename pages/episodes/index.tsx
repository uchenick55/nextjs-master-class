import {EpisodeType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";
import {Card} from "../../components/Card/Card";

//на стороне сервера:
//getServerSideProps - вызывается при каждом запросе, данные менятся могут часто
//getStaticProps - при создании билда, данные не меняются - при последующих запросах получаем кэш страницы

export const getServerSideProps = async () => { // при каждом запросе эта функция запускается самим nextJs на стороне сервера, если такой присутствует на самой странице в pages.
    const episodes = await API.rickAndMorty.getEpisodes() // получаем эпизоды
    if (!episodes) {
        return {
            notFound: true // если данных не будет, мы переключимся на 404 страницу
        }
    }
    return {

        props: {
            episodes // возвращаем пропсы с эпизодами
        }
    }
}

type PropsType = { // типизируем ответ от getStaticProps
    episodes: ResponseType<EpisodeType>
}
const Episodes = (props: PropsType) => {// на стороне UI берем пропсы - ответ от getStaticProps
    const {episodes} = props // вынимаем эпизоды из пропсов
    const episodesList = episodes.results.map(episode => { // проходим по всем эпизодам
        return <Card // выводим карточку эпизода
            key={episode.id} // ключ из id эпизодов
            name={episode.name} //выводим имена эпизодов
        />
    })
    return <div>
        <PageWrapper>
            <Header/> {/*заголовок страницы*/}
            {episodesList} {/* выводим список эпизодов*/}
        </PageWrapper>
    </div>
}
export default Episodes