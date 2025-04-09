import React from 'react';
import InternshipApplicationsComponent from '../../components/internship/history/applications';
import useInternshipApplications from '../../services/internship/applications';
// import {internshipPlaceholder} from '../../data/internshhips';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';

const InternshipHistory = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();

	const index_id = user?.id || '';

	const {data = [], isLoading, refetch, isRefetching} = useInternshipApplications(index_id);

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}
	return <InternshipApplicationsComponent applications={data} refresh={() => refetch()} isRefreshing={isRefetching} />;
};

export default InternshipHistory;
