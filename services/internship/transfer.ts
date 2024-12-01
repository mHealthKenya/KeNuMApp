import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useError } from '../../providers/error';

interface Transfer {
	internship_id: string;
	transfer_reason_id: string;
	transfer_request_desc: string;
	transfer_internship_center: string;
}

const internshipTransfer = async (data: Transfer) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/transfer_request';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useInternshipTransfer = (successFn: () => void) => {
	const { handleError } = useError()
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: internshipTransfer,
		onSuccess: () => {
			successFn();
			queryClient.invalidateQueries({
				queryKey: ['transfer-hist'],
			});
		},

		onError: () => {
			handleError("Could not complete transfer request")
		},
	});
};

export default useInternshipTransfer;
