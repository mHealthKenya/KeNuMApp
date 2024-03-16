import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { WorkStationTypes } from '../../models/workstations';

const workStations = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/workstations/types';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: WorkStationTypes = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const useWorkStationTypes = () => useQuery({
    queryKey: ['work-stations'],
    queryFn: workStations,

})

export default useWorkStationTypes;