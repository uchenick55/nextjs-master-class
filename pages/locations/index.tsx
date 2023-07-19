import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {Card} from "../../components/Card/Card";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";

const getLocations = () => { // при этом вызове, у рнас в preview ответе нет данных. Они появляются уже после нового запроса на сервер
    return fetch('https://rickandmortyapi.com/api/location', {
        method:"GET"
    }).then(res=>res.json())
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'], getLocations)

    return {
        props: {
            dehydratedState: dehydrate(queryClient) // данные, которые мы запросили на сервере,  хотим внедрить на клиентскую сторону, но при этом запрос делаем на сервере
        }
    }

}
// гидратация - приходит html, и в момент когда она загрузкилась, тогда на нее начинают подгружаться все события и прочее (весь JS)
//
const Locations = () => {

    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations.results.map(location=>{ // проходим по всем локациям
        return <Card // отрисовка локаций
            key={location.id} //ключ из id локаций
            name={location.name} //выводим имена локаций
        />
    })
    return <div>
        <PageWrapper>
           {locationsList}  {/*выводим список локаций*/}
        </PageWrapper>
    </div>
}
Locations.getLayout = getLayout
export default Locations