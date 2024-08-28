import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { InternshipApplication } from '../../models/internshipapplications';

const applications = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/get/test?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response = await axios(config).then((res) => {
		const data: InternshipApplication[] = res.data.internship_applications;

		data.sort((a, b) => {
			const dateA = new Date(a.application_date);
			const dateB = new Date(b.application_date);
			return dateB.getTime() - dateA.getTime();
		});

		return data;
	});

	return response;
};

const useInternshipApplications = (index_id: string) => {
	return useQuery({
		queryKey: ['internships', { index_id }],
		queryFn: () => applications(index_id),
	});
};

export default useInternshipApplications;
