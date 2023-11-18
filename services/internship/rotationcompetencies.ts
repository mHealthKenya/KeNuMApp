import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { RotationCompetencies } from '../../models/rotationcompetencies';
import { useFetchedCompetencies } from '../../providers/rotationcompetencies';

interface Competency {
	rotation_id: string;
}

const competencyAreas = async (data: Competency) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/rotation_competencies';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response: RotationCompetencies = await axios(config).then(
		(res) => res.data
	);

	return response;
};

const useRotationCompetencies = (successFn: () => void) => {
	const { handleCompetencies } = useFetchedCompetencies();
	return useMutation({
		mutationFn: competencyAreas,
		onSuccess: (data) => {
			handleCompetencies(data);
			successFn();
		},
	});
};

export default useRotationCompetencies;
