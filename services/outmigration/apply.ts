import { OutMigrationApplication } from "../../models/outmigrationapply";
import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useMutation, useQueryClient } from "@tanstack/react-query";


const applyOutMigration = async (data: OutMigrationApplication) => {
  const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/apply';

  const form = new FormData();
  form.append('form_attached', data.form_attached)

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data: form,
    headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + token,
		},
	};

	const response = await axios(config).then((res) => res.data);

	return response;
}

const useApplyOutMigration = (successFn: () => void, errorFn: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyOutMigration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['outmigration-applications'],
      });
      successFn();
    },

    onError: () => {
      errorFn();
    }
  })
}

export default useApplyOutMigration;