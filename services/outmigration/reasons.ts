import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { OutMigrationReasons } from '../../models/outmigrationreasons';

const outmigrationReasons = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/outmigration/reasons';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: OutMigrationReasons = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const useOutmigrationReasons = () => useQuery({
    queryKey: ['outmigration-reasons'],
    queryFn: outmigrationReasons,

})

export default useOutmigrationReasons;