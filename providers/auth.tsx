import { View, Text } from 'react-native';
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import { User } from '../models/user';
import * as secureStore from 'expo-secure-store';
import axios from 'axios';
import { baseUrl } from '../constants/baseurl';

enum Types {
	Login = 'Login',
	Check = 'Check',
	Uncheck = 'Uncheck',
	Initial = 'Initial',
}

interface Action {
	type: Types;
	payload?: any;
}

interface State {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
}

interface Auth {
	logout: () => void;
	checkAuth: () => void;
	isLoading: boolean;
	isAuthenticated: boolean;
	user: User | null;
}

const AuthContext = createContext<Auth>({
	logout: () => {},
	checkAuth: () => {},
	isLoading: false,
	isAuthenticated: false,
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
				user: null,
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
		await secureStore.deleteItemAsync('token');
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
