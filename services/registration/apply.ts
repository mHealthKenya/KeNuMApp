import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useError } from '../../providers/error';
interface Registration {
	education_id: string;
	current_passport: any
}

const registrationApplication = async (data: Registration) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	const url = baseUrl + 'api/auth/registration/apply';

	const formData = new FormData();

	formData.append('education_id', data.education_id);
	formData.append('current_passport', data.current_passport as unknown as Blob);
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
) => {
	const queryClient = useQueryClient();

	const { handleError } = useError()

	return useMutation({
		mutationFn: registrationApplication,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registration-applications'],
			});
			successFn();
		},

		onError: async (error: unknown) => {
			const errorMessage =
				axios.isAxiosError(error)
					? error.response?.data?.message || "Something went wrong!"
					: "Something went wrong!";

			await handleError(errorMessage);

		},
	});
};

export default useRegistrationApplication;
