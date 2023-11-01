import { ChangeEvent, FormEvent } from "react";
import CustomInput from "./CustomInput"

type Props = {
    searchText: string;
    handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ searchText, handleSearchInput, handleSearchSubmit }: Props) => (
    <form onSubmit={handleSearchSubmit}>
        <CustomInput id="searchField" type="text" value={searchText} isFocused={true} changeSearchState={handleSearchInput}>
            <strong>Type something:</strong>
        </CustomInput>
        <button type="submit" disabled={!searchText}>Submit</button>
    </form>
)

export default SearchForm