import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { PracticeMode } from '../../models/practicemode';
import axios, { AxiosRequestConfig } from 'axios';
import { PracticeApplication } from '../../models/privatepractice';
import { useQuery } from '@tanstack/react-query';

const privatePractices = async (id: string) => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/privatepractice/applications?index_id=' + id;

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: PracticeApplication[] = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const usePrivateApplications = (id?: string) => useQuery({
    queryKey: ['private-applications', id],
    queryFn: () => privatePractices(id || ''),
    enabled: !!id,
})

export default usePrivateApplications;