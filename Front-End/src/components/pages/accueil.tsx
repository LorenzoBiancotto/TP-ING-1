import { SearchBar } from "../../UI/organisms/searchbar";

export const Accueil = (): JSX.Element => {

    const viewSearch = (searchTerm: string): void => {
        console.log('searchTerm', searchTerm);
    }

    return (
        <>
            <SearchBar
                inputPlaceholder="Rechercher un produir"
                buttonLabel="RECHERCHER"
                onSearch={viewSearch}
            />
        </>
    );
};

export default Accueil;