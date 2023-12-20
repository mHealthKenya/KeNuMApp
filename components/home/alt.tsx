import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import Associations from './associations';
import CPDHome from './cpd';
import HomeLicenceComponent from './licence';
import NursesAltComponent from './nursesalt';

const AltHome = () => {
	const { height, width } = useWindowDimensions();
	return (
		<View className='flex flex-1'>
			<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
				<HomeLicenceComponent width={width} height={height} />
				<CPDHome width={width} height={height} />
				<NursesAltComponent
					item={{
						width,
						height,
						title: "Student's Module",
						actionTitle: 'View All',
						more: '/studentshome',
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
						],
					}}
				/>
				<NursesAltComponent
					item={{
						width,
						height,
						title: "Practitioner's Module",
						actionTitle: 'View All',
						more: '/professionalhome',
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
								href: '/allknowledge',
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

export default AltHome;
