import React from 'react';
import LicenseComponent from '../../components/profile/license';
import { useAuth } from '../../providers/auth';

const License = () => {
	const { user } = useAuth();
	return <LicenseComponent user={user} />;
};

export default License;
