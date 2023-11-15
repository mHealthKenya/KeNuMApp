import React from 'react';
import CPDsComponent from '../../components/profile/cpds';
import { useAuth } from '../../providers/auth';

const CPDs = () => {
	const { user } = useAuth();
	return <CPDsComponent user={user} />;
};

export default CPDs;
