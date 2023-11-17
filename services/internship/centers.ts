import axios from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useMutation } from '@tanstack/react-query';

const internshipCenters = async () => {
	const url = baseUrl + 'api/internship/centers';

	const response = await axios
		.post(url, { cadre: 'BSCN' })
		.then((res) => res.data);

	return response;
};

const useInternshipCenters = () => {
	return useMutation({
		mutationFn: internshipCenters,
	});
};

export default useInternshipCenters;
