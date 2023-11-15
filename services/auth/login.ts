import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import * as secureStore from 'expo-secure-store';
import { Credentials } from '../../components/auth/Login';
import { baseUrl } from '../../constants/baseurl';
import { useAuth } from '../../providers/auth';
import { useError } from '../../providers/error';

const login = async (data: Credentials) => {
	const url = baseUrl + 'api/auth/login';
	const response = await axios.post(url, data).then((res) => res.data);

	return response;
};

const useLogin = () => {
	const { handleError } = useError();
	const { checkAuth } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: login,
		onSuccess: async ({ token }) => {
			await secureStore.setItemAsync('token', token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			queryClient.invalidateQueries({
				queryKey: ['authenticated-user'],
			});
			checkAuth();
		},
		onError: () => {
			handleError('Invalid email or password');
		},
	});
};

export default useLogin;
