import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import dayjs from 'dayjs';
interface Apply {
    "index_id": string
    "proposed_practice_id": string
    "practice_mode_id": string
    "county_id": string
    "town": string
    "workstation_id": string
    "workstation_name": string
}

const privatePracticeApply = async (data: Apply) => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/privatepractice/apply';

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
}

const usePrivatePracticeApply = () => useMutation({
    mutationFn: privatePracticeApply,
    onSuccess: (data) => {
        console.log(data);
    },
    onError: (err) => {
        console.log(err);
    }
})

export default usePrivatePracticeApply;