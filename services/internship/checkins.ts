import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { TransferHist } from '../../models/transferhist';
import { CheckIns } from '../../models/checkins';

const checkinHistory = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/checkin';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: CheckIns[] = await axios(config).then((res) => res.data);

	response.sort(
		(a, b) =>
			new Date(b.checkin_date).getTime() - new Date(a.checkin_date).getTime()
	);

	return response;
};

const useCheckins = () =>
	useQuery({
		queryKey: ['checkin-hist'],
		queryFn: checkinHistory,
	});

export default useCheckins;
