import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { KnowledgeBase } from '../models/knowledgebase';

interface Knowledge {
	item: KnowledgeBase | null;
	handleItem: (item: KnowledgeBase) => void;
}

const KnowledgeContext = createContext<Knowledge>({
	item: null,
	handleItem: (_item: KnowledgeBase) => {},
});

export const useKnowledgeFetched = () => useContext(KnowledgeContext);

const KnowledgeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [item, setItem] = useState<KnowledgeBase | null>(null);

	const handleItem = (item: KnowledgeBase) => {
		setItem(item);
	};

	return (
		<KnowledgeContext.Provider
			value={{
				item,
				handleItem,
			}}>
			{children}
		</KnowledgeContext.Provider>
	);
};

export default KnowledgeProvider;
