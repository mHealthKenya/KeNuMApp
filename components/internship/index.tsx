import {FlashList} from '@shopify/flash-list';
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {activeInternshipAtom} from '../../atoms/internshipcheck';
import {useAuth} from '../../providers/auth';
import useInternshipApplications from '../../services/internship/applications';
import BoxImage, {InternBox} from '../shared/BoxImage';
import CenterLoad from '../shared/CenterLoad';

const InternshipComponent = () => {
	const {user} = useAuth();

	const index_id = user?.IndexNo || '';

	const {data: internships = [], isLoading} = useInternshipApplications(index_id);

	const active = internships.some((item) => item.invoice_details.amount_due === 0);

	const [item, setActiveInternship] = useAtom(activeInternshipAtom);

	const canApply = user?.education?.some((item) => item.cadre === 'BSCN' || item.cadre === 'BSCM') || false;

	const hasBSC = user?.registration?.some((item) => item.cadre === 'BSCN' || item.cadre === 'BSCM') || false;

	useEffect(() => {
		if (hasBSC) {
			setActiveInternship({
				active: false,
				canApply: false,
			});
		} else {
			setActiveInternship({
				canApply,
				active,
			});
		}
	}, [hasBSC, canApply, active, setActiveInternship]);

	const data: InternBox[] = [
		{
			title: 'Apply For Internship',
			content: 'Embark on a journey towards professional growth!',
			backgroundColor: '#FFFFFF',
			path: require('../../assets/images/nursesmall.png'),
			route: '/internshipapply',
			disabled: item?.active || !item?.canApply,
		},

		{
			title: 'Checkin',
			content: 'Verify that you reported to your internship center',
			backgroundColor: '#FFFFFF',
			path: require('../../assets/images/checkin.png'),
			route: '/checkin',
			disabled: !item?.active,
		},

		{
			title: 'Rotations',
			content: 'Verify that you reported to your internship center',
			backgroundColor: '#FFFFFF',
			path: require('../../assets/images/rotationssmall.png'),
			route: '/internshipareas',
			disabled: !item?.active,
		},

		{
			title: 'Transfers',
			content: 'Apply for a change of internship center',
			backgroundColor: '#FFFFFF',
			path: require('../../assets/images/transfersmall.png'),
			route: '/transfer',
			disabled: !item?.active,
		},
		{
			title: 'Internship History',
			content: 'View histories of your internship applications, transfers and check ins',
			backgroundColor: '#FFFFFF',
			path: require('../../assets/images/clock.png'),
			route: '/allhistory',
		},
	];

	if (isLoading) {
		return <CenterLoad />;
	}

	return (
		<View className='flex flex-1'>
			<FlashList data={data} estimatedItemSize={20} renderItem={({item}) => <BoxImage data={item} />} />
		</View>
	);
};

export default InternshipComponent;
