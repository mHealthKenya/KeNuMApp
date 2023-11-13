import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../../constants/baseurl';

const authenticatedUser = async () => {
	const url = baseUrl + 'api/auth/user';

	const response = await axios.get(url).then((res) => res.data);

	return response;
};

const useAuthenticatedUser = () => {
	return useQuery({
		queryKey: ['authenticated-user'],
		queryFn: authenticatedUser,
	});
};

export default useAuthenticatedUser;
