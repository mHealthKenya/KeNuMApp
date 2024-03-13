
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { PracticeMode } from '../../models/practicemode';
const getProposedModes = async () => {

    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/privatepractice/modes';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: PracticeMode = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}

const usePracticeMode = () => useQuery({
    queryKey: ['practice-mode'],
    queryFn: getProposedModes,
})

export default usePracticeMode;