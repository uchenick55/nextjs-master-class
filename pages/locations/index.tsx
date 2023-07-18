import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {useQuery} from "@tanstack/react-query";

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method:"GET"
    }).then(res=>res.json())
}
const Locations = () => {

    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations.results.map(location=>{ // проходим по всем локациям
        return <div key={location.id}>  {/*ключ из id локаций*/}
            {location.name}  {/*выводим имена локаций*/}
        </div>
    })
    return <div>
        <PageWrapper>
            <Header/>  {/*заголовок страницы*/}
           {locationsList}  {/*выводим список локаций*/}
        </PageWrapper>
    </div>
}
export default Locations