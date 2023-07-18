import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";

export const getStaticProps = async () => { // эта функция запускается самим nextJs на стороне сервера, если такой присутствует на самой странице в pages.
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
        return <div key={character.id}>  {/*ключ из id персонажей*/}
            {character.name}  {/*выводим имена персонажей*/}
        </div>
    })
    return <div>
        <PageWrapper>
            <Header/>  {/*заголовок страницы*/}
           {characterList}  {/*выводим список персонажей*/}
        </PageWrapper>
    </div>
}
export default Characters