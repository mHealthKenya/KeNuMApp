import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Apply {
	student_series_id: string;
	index_id: string;
	exam_centers: string;
	application_date: string;
}

const applyExam = async (data: Apply) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/apply';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useExamApply = (successFn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: applyExam,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['exam-applications'],
			});

			successFn();
		},
	});
};

export default useExamApply;
