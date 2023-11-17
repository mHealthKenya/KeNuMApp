import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../providers/auth';
import { CheckinApp } from '../../models/checkinsuccess';

export interface OTP {
	index_id: string;
	mobile_no: string;
	task: string;
	otp: string;
}

interface Checkin {
	internship_id: string;
	checkin_date: string;
	nurse_officer_incharge: string;
	nurse_officer_incharge_mobile: string;
	supervisor: string;
	supervisor_mobile: string;
	nurse_officer_incharge_email: string;
	supervisor_email: string;
}

const internshipCheckin = async (data: Checkin) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/checkin';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response: CheckinApp = await axios(config).then((res) => res.data);

	return response;
};

export const sendOTP = async (data: OTP) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

	const url = baseUrl + 'api/otp/generate';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	return await axios(config).then((res) => {
		console.log(res.data);
	});
};

const useInternshipCheckin = (successFn: () => void) => {
	const { user } = useAuth();
	return useMutation({
		mutationFn: internshipCheckin,

		onSuccess: async (data) => {
			successFn();
			await sendOTP({
				index_id: user?.IndexNo || '',
				mobile_no: data?.message?.nurse_officer_incharge_mobile,
				task: 'generate',
				otp: '',
			});
		},
	});
};

export default useInternshipCheckin;