import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { RegistrationApplication } from '../../models/regapplications';

const registrationApplications = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/auth/registration/applications/test';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: RegistrationApplication[] = await axios(config).then(
		(res) => {
			return res.data;
		}
	);

	response.sort(
		(a, b) =>
			new Date(b.application_date).getTime() -
			new Date(a.application_date).getTime()
	);

	return response;
};

const useRegistrationApplications = () =>
	useQuery({
		queryKey: ['registration-applications'],
		queryFn: registrationApplications,
	});

export default useRegistrationApplications;
