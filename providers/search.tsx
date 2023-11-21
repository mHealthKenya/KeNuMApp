import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

interface Search {
	search: string;
	handleSearch: (search: string) => void;
	clearSearch: () => void;
}

const SearchContext = createContext<Search>({
	search: '',
	handleSearch: () => {},
	clearSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [search, setSearch] = useState('');

	const handleSearch = (search: string) => {
		setSearch(search);
	};

	const clearSearch = () => {
		setSearch('');
	};

	return (
		<SearchContext.Provider
			value={{
				search,
				handleSearch,
				clearSearch,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
