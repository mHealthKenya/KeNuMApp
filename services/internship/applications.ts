import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { InternshipApplication } from '../../models/internshipapplications';
import { useQuery } from '@tanstack/react-query';

const applications = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/get';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response = await axios(config).then((res) => {
		const data: InternshipApplication[] = res.data;

		data.sort((a, b) => {
			const dateA = new Date(a.application_date);
			const dateB = new Date(b.application_date);
			return dateB.getTime() - dateA.getTime();
		});

		return data;
	});

	return response;
};

const useInternshipApplications = () => {
	return useQuery({
		queryKey: ['internships'],
		queryFn: applications,
	});
};

export default useInternshipApplications;
