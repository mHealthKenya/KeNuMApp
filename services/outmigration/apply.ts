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
  form.append('index_id', data.index_id)
  form.append('country_id', data.country_id)
  form.append('application_date', data.application_date)
  form.append('marital_status', data.marital_status)
  form.append('dependants', data.dependants)
  form.append('employment_status', data.employment_status)
  form.append('current_employer', data.current_employer)
  form.append('workstation_type', data.workstation_type)
  form.append('workstation_id', data.workstation_id)
  form.append('workstation_name', data.workstation_name)
  form.append('department', data.department)
  form.append('current_position', data.current_position)
  form.append('experience_years', data.experience_years)
  form.append('duration_current_employer', data.duration_current_employer)
  form.append('planning_return', data.planning_return)
  form.append('form_attached', data.form_attached)
  form.append('outmigration_reason', data.outmigration_reason)
  form.append('verification_cadres', data.verification_cadres)

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
  console.log(`Response: ${response.data}`);
	return response;
}

const useApplyOutMigration = (successFn: () => void, errorFn: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyOutMigration,
    onSuccess: (data: any) => {
      console.log(data)
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