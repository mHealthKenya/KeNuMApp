import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { OutMigrationReasons } from '../../models/outmigrationreasons';
import { PlanningToReturn } from '../../models/planningtoreturn';

const planningToReturn = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/outmigration/planningtoreturn';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: PlanningToReturn = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const usePlanningToReturn = () => useQuery({
    queryKey: ['planning-to-return'],
    queryFn: planningToReturn,

})

export default usePlanningToReturn;