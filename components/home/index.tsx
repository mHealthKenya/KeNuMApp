import React, {useEffect, useState} from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import Associations from './associations';
import CPDHome from './cpd';
import HomeLicenceComponent from './licence/licence';
import NursesAltComponent from './nursesalt';
import {useAuth} from '../../providers/auth';
import InvalidLicenceComponent from './licence/invalid';
import dayjs, {Dayjs} from 'dayjs';

const Home = () => {
	const {height, width} = useWindowDimensions();
	const {user} = useAuth();

	const [endDate, setEndDate] = useState<Dayjs>();

	useEffect(() => {
		const endDate = user?.license?.length ? dayjs(new Date(user?.license[0].to_date || '')) : dayjs(new Date());

		setEndDate(endDate);
	}, []);

	const currentDate = dayjs(new Date());
	return (
		<View className='flex flex-1'>
			<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} nestedScrollEnabled={true}>
				{endDate && currentDate > endDate ? <InvalidLicenceComponent /> : <HomeLicenceComponent />}
				<CPDHome />
				<NursesAltComponent
					item={{
						width,
						height,
						title: "Practitioner's Module",
						// actionTitle: 'View All',
						// more: '/professionalhome',
						items: [
							{
								title: 'CPDs',
								source: require('../../assets/images/cpdlarge.png'),
								href: '/cpdhome',
							},

							{
								title: 'Licences',
								source: require('../../assets/images/licencelarge.png'),
								href: '/licencehome',
							},
							{
								title: 'Private Practice',
								source: require('../../assets/images/private.png'),
								href: '/privatepracticelanding',
							},
							{
								title: 'Out Migration',
								source: require('../../assets/images/outmigration.png'),
								href: '/outmigrationhome',
							},
						],
					}}
				/>
				<NursesAltComponent
					item={{
						width,
						height,
						title: "Student's Module",
						// actionTitle: 'View All',
						// more: '/studentshome',
						items: [
							{
								title: 'Internships',
								source: require('../../assets/images/internshipalt.png'),
								href: '/internship',
							},

							{
								title: 'Exams',
								source: require('../../assets/images/examalt.png'),
								href: '/examall',
							},
							{
								title: 'Registration',
								source: require('../../assets/images/register.png'),
								href: '/registrationhome',
							},
						],
					}}
				/>

				<Associations
					item={{
						width,
						height,
					}}
				/>

				<NursesAltComponent
					item={{
						width,
						height,
						title: 'General',
						items: [
							{
								title: 'Knowledge Base',
								source: require('../../assets/images/knowledgealt.png'),
								href: '/segmented',
							},

							{
								title: 'FAQs',
								source: require('../../assets/images/faqalt.png'),
								href: '/allfaqs',
							},
						],
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default Home;
