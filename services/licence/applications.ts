import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { LicenceApplication } from '../../models/licenceapplications';

const licenceApplications = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/licencing?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: LicenceApplication[] = await axios(config).then(
		(res) => res.data
	);

	response.sort(
		(a, b) =>
			new Date(b.renewal_date).getTime() - new Date(a.renewal_date).getTime()
	);

	return response;
};

const useLicenceApplications = (index_id: string) =>
	useQuery({
		queryKey: ['licence-application', index_id],
		queryFn: () => licenceApplications(index_id),
	});

export default useLicenceApplications;
