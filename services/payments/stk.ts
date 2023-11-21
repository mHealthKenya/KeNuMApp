import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';

interface STK {
	invoice_no: string;
	phone_no: string;
	transaction: string;
}

const sendSTK = async (data: STK) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/payment/stkPush';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useSTK = (successFn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: sendSTK,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['internships'],
			});

			successFn();
		},
	});
};

export default useSTK;
