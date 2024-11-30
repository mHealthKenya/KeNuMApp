import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { User } from '../../models/user';

export const authenticatedUser = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/auth/user';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: User = await axios(config).then((res) => res.data);

	return response;
};

const useAuthenticatedUser = () => {
	return useQuery({
		queryKey: ['authenticated-user'],
		queryFn: authenticatedUser,
	});
};

export default useAuthenticatedUser;
