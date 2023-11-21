import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { TransferHist } from '../../models/transferhist';

const transferHistory = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/transfer_history';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: TransferHist[] = await axios(config).then((res) => res.data);

	response.sort(
		(a, b) =>
			new Date(b.request_date).getTime() - new Date(a.request_date).getTime()
	);

	return response;
};

const useTransferHist = () =>
	useQuery({
		queryKey: ['transfer-hist'],
		queryFn: transferHistory,
	});

export default useTransferHist;
