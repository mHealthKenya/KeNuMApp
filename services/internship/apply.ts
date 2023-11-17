import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as secureStore from 'expo-secure-store';

interface Apply {
	posting_letter: any;
	degree_cert: any;
	education_id: string;
	internship_center: string;
	start_date: string;
}

const internshipApply = async (data: Apply) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/apply';

	const form = new FormData();

	form.append('posting_letter', data.posting_letter);
	form.append('degree_cert', data.degree_cert);
	form.append('education_id', data.education_id);
	form.append('internship_center', data.internship_center);
	form.append('start_date', data.start_date);

	const config: AxiosRequestConfig = {
		method: 'post',
		url,
		data: form,
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + token,
		},
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useInternshipApply = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: internshipApply,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['applications'],
			});
		},

		onError: (error: any) => {
			console.log(error);
			console.log(JSON.stringify(error?.message));
			console.log(error?.response?.data);
		},
	});
};

export default useInternshipApply;
