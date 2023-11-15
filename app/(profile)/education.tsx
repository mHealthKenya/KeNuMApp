import React from 'react';
import EducationComponent from '../../components/profile/education';
import { useAuth } from '../../providers/auth';

const Education = () => {
	const { user } = useAuth();
	return <EducationComponent user={user} />;
};

export default Education;
