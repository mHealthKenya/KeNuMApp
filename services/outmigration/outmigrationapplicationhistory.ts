import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { OutmigrationApplicationHistory } from '../../models/outmigrationapplicationhistory';

const getOutMigrationHistory = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/applications?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: OutmigrationApplicationHistory[] = await axios(config).then(
		(res) => res.data
	);

	response.sort(
		(a, b) =>
			new Date(b.application_date).getTime() - new Date(a.application_date).getTime()
	);

	return response;
};

const useOutMigrationHistorys = (index_id: string) => {
	return useQuery({
		queryKey: ['outmigration-application-history'],
		queryFn: () => getOutMigrationHistory(index_id),
	});
};

export default useOutMigrationHistorys;
