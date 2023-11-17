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
}

const SearchContext = createContext<Search>({
	search: '',
	handleSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [search, setSearch] = useState('');

	const handleSearch = (search: string) => {
		setSearch(search);
	};

	return (
		<SearchContext.Provider
			value={{
				search,
				handleSearch,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
