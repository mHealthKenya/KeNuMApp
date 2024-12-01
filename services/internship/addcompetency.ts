import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useError } from '../../providers/error';

interface Competency {
	internship_id: string;
	competency_id: string;
	activity_notes: string;
	activity_date: string;
}

const addCompetency = async (data: Competency) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/rotation_activities/capture';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useAddCompetency = (successFn: () => void) => {
	const { handleError } = useError()
	return useMutation({
		mutationFn: addCompetency,
		onSuccess: () => {
			successFn();
		},

		onError: () => {
			handleError("Could not add competency")
		},
	});
};

export default useAddCompetency;
