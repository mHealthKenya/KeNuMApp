import axios from 'axios';
import * as secureStore from 'expo-secure-store';
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import { baseUrl } from '../constants/baseurl';
import { User } from '../models/user';

enum Types {
	Login = 'Login',
	Check = 'Check',
	Uncheck = 'Uncheck',
	Initial = 'Initial',
	LoggingOut = 'LoggingOut',
}

interface Action {
	type: Types;
	payload?: any;
}

interface State {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
	isLoggingOut: boolean;
}

interface Auth {
	logout: () => void;
	checkAuth: () => void;
	isLoading: boolean;
	isAuthenticated: boolean;
	user: User | null;
	isLoggingOut: boolean;
}

const AuthContext = createContext<Auth>({
	logout: () => {},
	checkAuth: () => {},
	isLoading: false,
	isAuthenticated: false,
	isLoggingOut: false,
	user: null,
});

export const useAuth = () => useContext(AuthContext);

const reducer = (state: State, { type, payload }: Action): State => {
	switch (type) {
		case Types.Initial:
			return {
				...state,
				isLoading: true,
				isAuthenticated: false,
				user: null,
			};

		case Types.Check:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: payload,
			};

		case Types.Uncheck:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				isLoggingOut: false,
				user: null,
			};

		case Types.LoggingOut:
			return {
				...state,
				isLoggingOut: true,
			};

		default:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				user: null,
			};
	}
};

const initialState = {
	isLoading: false,
	isAuthenticated: false,
	isLoggingOut: false,
	user: null,
};

const getUser = async (token: string) => {
	const user = await axios
		.get(baseUrl + 'api/auth/user', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data)
		.catch(() => null);

	return user;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const checkAuth = async () => {
		dispatch({ type: Types.Initial });
		const token = await secureStore.getItemAsync('token').then((data) => data);

		if (!token) {
			dispatch({ type: Types.Uncheck });
		}

		const user = await getUser(token || '');

		if (user) {
			dispatch({ type: Types.Check, payload: user });
		}
	};

	const logout = async () => {
		dispatch({ type: Types.LoggingOut });
		await secureStore.deleteItemAsync('token');
		axios.defaults.headers.common['Authorization'] = '';
		dispatch({ type: Types.Uncheck });
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				checkAuth,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
