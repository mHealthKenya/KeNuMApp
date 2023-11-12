import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

interface Error {
	error: string;
	handleError: (error: string) => void;
	clearError: () => void;
}

const ErrorContext = createContext<Error>({
	error: '',
	handleError: () => {},
	clearError: () => {},
});

export const useError = () => useContext(ErrorContext);

const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [error, setError] = useState('');

	const handleError = (error: string) => {
		setError(error);
	};

	const clearError = () => {
		setError('');
	};

	return (
		<ErrorContext.Provider
			value={{
				error,
				handleError,
				clearError,
			}}>
			{children}
		</ErrorContext.Provider>
	);
};

export default ErrorProvider;
