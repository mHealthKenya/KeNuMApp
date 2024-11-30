import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { CPDSuccess } from '../../models/cpdsuccess';
import { UserImage } from '../../components/internship/apply';


interface Self {
	index_id: string;
	category_id: string;
	event_date: string;
	event_title: string;
	event_location: string;
	cpd_evidence: UserImage;
}

const selfReport = async (data: Self) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/CPD/selfreport';

	const form = new FormData();

	form.append('index_id', data.index_id);
	form.append('category_id', data.category_id);
	form.append('event_date', data.event_date);
	form.append('event_title', data.event_title);
	form.append('event_location', data.event_location);
	form.append('cpd_evidence', data.cpd_evidence as unknown as Blob);

	const config: AxiosRequestConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		url,
		data: form,
	};

	const response: CPDSuccess = await axios(config).then((res) => res.data);

	return response;
};

const useSelfReport = (successFn: () => void, errorFn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: selfReport,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['cpd-activities', data.message.index_id],
			});

			queryClient.invalidateQueries({
				queryKey: ['authenticated-user', data.message.index_id],
			});

			successFn();
		},

		onError: (err) => {
			console.log(err);
			errorFn();
		},
	});
};

export default useSelfReport;
