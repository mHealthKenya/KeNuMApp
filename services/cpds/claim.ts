import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { CPDSuccess } from '../../models/cpdsuccess';
import { ClaimSuccess } from '../../models/claimsuccess';

interface Claim {
	index_id: string;
	event_token: string;
}

const selfClaim = async (data: Claim) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/CPD/claim';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response: ClaimSuccess = await axios(config).then((res) => res.data);

	return response;
};

const useClaim = (errorFn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: selfClaim,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['CPDEvents', data.message.index_id],
			});

			queryClient.invalidateQueries({
				queryKey: ['authenticated-user', data.message.index_id],
			});
		},

		onError: () => {
			errorFn();
		},
	});
};

export default useClaim;
