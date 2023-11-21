import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { OTP } from './checkin';

const verifyOtp = async (data: OTP) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/otp/verify';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response = await axios(config).then((res) => res.data);

	return response;
};

const useVerifyOTP = (successFn: () => void) =>
	useMutation({
		mutationFn: verifyOtp,
		onSuccess: () => {
			console.log('success');
			successFn();
		},

		onError: (error) => {
			console.log(error);
		},
	});

export default useVerifyOTP;
