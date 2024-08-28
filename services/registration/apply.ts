import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useAtom } from 'jotai';
import { errorAtom } from '../../atoms/error';
interface Registration {
	education_id: string;
	current_passport: any;
}

const registrationApplication = async (data: Registration) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	const url = baseUrl + 'api/auth/registration/apply';

	const formData = new FormData();

	formData.append('education_id', data.education_id);
	formData.append('current_passport', data.current_passport);
	formData.append(
		'application_date',
		dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z] ')
	);



	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': 'Bearer ' + token
		},
	};

	const response = await axios(config).then((res) => res.data)

	return response;
};

const useRegistrationApplication = (
	successFn: () => void,
	errorFn: () => void
) => {
	const queryClient = useQueryClient();

	const [_, setError] = useAtom(errorAtom)

	return useMutation({
		mutationFn: registrationApplication,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registration-applications'],
			});
			successFn();
		},

		onError: async (error: any) => {
			await setError(error?.response?.data?.message || "Something went wrong!");
			await errorFn();
		},
	});
};

export default useRegistrationApplication;
