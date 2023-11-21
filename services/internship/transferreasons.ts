import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { TransferReason } from '../../models/transferreasons';

const transferReasons = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/reasons';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: TransferReason[] = await axios(config).then(
		(res) => res.data
	);

	return response;
};

const useTransferReasons = () =>
	useQuery({
		queryKey: ['transfer_reason'],
		queryFn: transferReasons,
	});

export default useTransferReasons;
