import { View, Text } from 'react-native';
import React from 'react';
import BioData from '../../components/profile/biodata';
import { useAuth } from '../../providers/auth';

const General = () => {
	const { user } = useAuth();
	return <BioData user={user} />;
};

export default General;
