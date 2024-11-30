import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { CPDSuccess } from '../../models/cpdsuccess';
import dayjs from 'dayjs';

interface OutmigrationApply {
    index_id: string;
    country_id: string;
    marital_status: string;
    dependants: string;
    employment_status: string;
    current_employer: string;
    workstation_type: string;
    workstation_id: string;
    workstation_name: string
    department: string
    current_position: string
    experience_years: string;
    duration_current_employer: string;
    planning_return: string
    form_attached: Blob
    outmigration_reason: string;
    verification_cadres: string
}

const outmigrationApp = async (data: OutmigrationApply) => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/outmigration/apply';

    const form = new FormData();

    const applicationDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z] ')

    form.append('index_id', data.index_id);
    form.append('country_id', data.country_id);
    form.append('application_date', applicationDate);
    form.append('marital_status', data.marital_status);
    form.append('dependants', data.dependants);
    form.append('employment_status', data.employment_status);
    form.append('current_employer', data.current_employer);
    form.append('workstation_type', data.workstation_type);
    form.append('workstation_id', data.workstation_id);
    form.append('workstation_name', data.workstation_name);
    form.append('department', data.department);
    form.append('current_position', data.current_position);
    form.append('experience_years', data.experience_years);
    form.append('planning_return', data.planning_return);
    form.append('duration_current_employer', data.duration_current_employer);
    form.append('form_attached', data.form_attached as unknown as Blob);
    form.append('outmigration_reason', data.outmigration_reason);
    form.append('verification_cadres', data.verification_cadres);

    const config: AxiosRequestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        url,
        data: form,
    };

    const response: CPDSuccess = await axios(config).then((res) => res.data);

    return response;
};

const useOutmigrationApply = (successFn: () => void, errorFn: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: outmigrationApp,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['outmigration-applications', data.message.index_id],
            });


            successFn();
        },

        onError: (err) => {
            console.log(err);
            errorFn();
        },
    });
};

export default useOutmigrationApply;
