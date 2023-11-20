import { View, Text } from 'react-native';
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

interface CPD {
	category_id: string;
	handleCategoryId: (id: string) => void;
}

const CategoryContext = createContext<CPD>({
	category_id: '',
	handleCategoryId: (_id: string) => {},
});

export const useCPDCategoryFetched = () => useContext(CategoryContext);

const CPDCategoriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [category_id, setCategory_id] = useState('');

	const handleCategoryId = (id: string) => {
		setCategory_id(id);
	};

	return (
		<CategoryContext.Provider
			value={{
				category_id,
				handleCategoryId,
			}}>
			{children}
		</CategoryContext.Provider>
	);
};

export default CPDCategoriesProvider;
