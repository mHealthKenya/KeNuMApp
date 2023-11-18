import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { InternshipArea } from '../../models/internshipareas';
const internshipAreas = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/internship_areas';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: InternshipArea[] = await axios(config).then(
		(res) => res.data
	);

	return response;
};

const useInternshipAreas = () => {
	return useQuery({
		queryKey: ['internship-areas'],
		queryFn: internshipAreas,
	});
};

export default useInternshipAreas;
