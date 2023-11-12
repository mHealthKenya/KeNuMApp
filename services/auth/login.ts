import axios from 'axios';
import { Credentials } from '../../components/auth/Login';
import { baseUrl } from '../../constants/baseurl';
import { useMutation } from '@tanstack/react-query';
import { useError } from '../../providers/error';
import * as secureStore from 'expo-secure-store';
import { useAuth } from '../../providers/auth';

const login = async (data: Credentials) => {
	const url = baseUrl + 'api/auth/login';
	const response = await axios.post(url, data).then((res) => res.data);

	return response;
};

const useLogin = () => {
	const { handleError } = useError();
	const { checkAuth } = useAuth();
	return useMutation({
		mutationFn: login,
		onSuccess: async ({ token }) => {
			await secureStore.setItemAsync('token', token);
			checkAuth();
		},
		onError: () => {
			handleError('Invalid email or password');
		},
	});
};

export default useLogin;
