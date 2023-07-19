import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";

//на стороне сервера:
//getServerSideProps - вызывается при каждом запросе, данные менятся могут часто
//getStaticProps - при создании билда, данные не меняются - при последующих запросах получаем кэш страницы

export const getStaticProps = async () => { // в момент билда эта функция запускается самим nextJs на стороне сервера, если такой присутствует на самой странице в pages.
    const characters = await API.rickAndMorty.getCharacters() // получаем персонажей
    return {
        props: {
            characters // возвращаем пропсы с персонажами
        }
    }
}

type PropsType = { // типизируем ответ от getStaticProps
    characters: ResponseType<CharacterType>
}
const Characters = (props: PropsType) => {// на стороне UI берем пропсы - ответ от getStaticProps
    const {characters} = props // вынимаем персонажей из пропсов
    const characterList = characters.results.map(character=>{ // проходим по всем персонажам
        return <CharacterCard // отрисовка персонажей (более красиво)
            key = {character.id}
            character={character}/>
    })
    return <div>
        <PageWrapper>
           {characterList}  {/*выводим список персонажей*/}
        </PageWrapper>
    </div>
}
Characters.getLayout = getLayout
//Home.getLayout = getSpecialLayout
export default Characters