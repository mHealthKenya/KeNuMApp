import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface Apply {
	index_id: string;
	workstation_id: string;
	employer_id: string;
	county_id: string;
	workstation_name: string;
}

const licenceApply = async (data: Apply) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/licencing';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data: {
			...data,
			renewal_date: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z] '),
		},
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useLicenceApply = (successFn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: licenceApply,
		onSuccess: (data) => {
			console.log(data);
			// queryClient.invalidateQueries({
			// 	queryKey: ['exam-applications'],
			// });

			successFn();
		},
	});
};

export default useLicenceApply;
