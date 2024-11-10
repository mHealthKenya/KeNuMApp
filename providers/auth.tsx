import axios, { AxiosRequestConfig } from 'axios';
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
import { useQueryClient } from '@tanstack/react-query';
// import { Credentials } from '../components/auth/Login';
import { AllTokens, SignInMode } from '../enums/tokens';
import mode from '../services/privatepractice/mode';

enum Types {
	Login = 'Login',
	Check = 'Check',
	Uncheck = 'Uncheck',
	Initial = 'Initial',
	LoggingOut = 'LoggingOut',
}

enum AuthTypes {
	SignIn = 'SignIn',
	SignOut = 'SignOut',
	InitialSignIn = 'InitialSignIn',
	Error = 'Error',
	Clear = 'Clear',
	CheckAuth = 'CheckAuth',
	Initiate = 'Initiate',
}

interface Action {
	type: Types | AuthTypes;
	payload?: any;
}
interface Credentials {
        username?: string;
        password?: string;
        mode: SignInMode;
        checked: boolean;
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
    signIn: (credentials: Credentials) => void;
}

const AuthContext = createContext<Auth>({
	logout: () => {},
	checkAuth: () => {},
	isLoading: false,
	isAuthenticated: false,
	isLoggingOut: false,
	user: null,
    signIn: (_credentials: Credentials) => {},
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

	const queryClient = useQueryClient();

	const checkAuth = async () => {
		dispatch({ type: Types.Initial });
		const token = await secureStore.getItemAsync('token').then((data) => data);

		if (!token) {
			dispatch({ type: Types.Uncheck });
		}

		const user = await getUser(token || '');

		if (user) {
			dispatch({ type: Types.Check, payload: user });
		} else {
			dispatch({ type: Types.Uncheck });
		}
	};

	const logout = async () => {
		dispatch({ type: Types.LoggingOut });
		await secureStore.deleteItemAsync('token');
		axios.defaults.headers.common['Authorization'] = '';
		dispatch({ type: Types.Uncheck });
		queryClient.invalidateQueries({
			queryKey: ['authenticated-user'],
		});
	};

	useEffect(() => {
		checkAuth();
	}, []);

    const signIn = async ({ username, password, mode, checked }: Credentials) => {
		dispatch({ type: AuthTypes.InitialSignIn });

		const refresh =
			(await secureStore
				.getItemAsync(AllTokens.all_tokens)
				.then((data) => data)) || '';

		const config: AxiosRequestConfig = {
			method: 'POST',
			url: baseUrl + 'users/login',
			headers: {
				Authorization:
					refresh.includes('*sep*') &&
					mode === SignInMode.local &&
					'Bearer ' + refresh.split('*sep*')[0],
			},

			data: {
				username,
				password,
			},
		};

		const login = await axios(config)
			.then(async (res) => {
				let tokens = '';

				const { refreshToken, token } = res.data;

				if (checked) {
					tokens = refreshToken + '*sep*' + token;
				} else {
					tokens = refresh.split('*sep*')[0] + '*sep*' + token;
				}

				await secureStore.setItemAsync(AllTokens.all_tokens, tokens);

				const user = await axios
					.get(baseUrl + 'users/individual', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => res.data);

				await dispatch({
					type: AuthTypes.SignIn,
					payload: {
						user,
						token,
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: AuthTypes.Error,
					payload: {
						error:
							err?.response?.data?.message ||
							err?.message ||
							'An error occurred',
					},
				});
			});

		return login;
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				checkAuth,
				logout,
                signIn
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
