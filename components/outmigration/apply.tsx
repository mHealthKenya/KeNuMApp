import React, { FC, useEffect, useMemo, useState } from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import { truncateText } from '../../helpers/truncate';
import { County } from '../../models/counties';
import { User } from '../../models/user';
import { EmploymentStatus } from '../../models/employmentstatus';
import { EmploymentPeriod } from '../../models/employmentperiod';
import { MaritalStatus } from '../../models/maritalstatus';
import { PlanToReturn } from '../../models/plantoreturn';
import { OutMigrationReason } from '../../models/outmigration_reason';
import useApplyOutMigration from '../../services/outmigration/apply';
import { useRouter } from 'expo-router';
import { useToast } from '@gluestack-ui/themed';
import ToastError from '../shared/ToastError';
import { WorkStation } from '../../models/workstations';
import {  Country } from '../../models/countries';
import { WorkStationTypes } from '../../models/workStationTypes';
import { Employer } from '../../models/employers';
import OutMigrationPersonal from './category/personal';
import OutMigrationEmployment from './category/employment';
import OutMigrationTravel from './category/travel';
import { OutMigrationApplication } from '../../models/outmigrationapply';

const theme = {
	roundness: 12,
};

const ApplyOutComponent: FC<{
	counties: County[];
	countries: Country[] ;
	workstationType: WorkStationTypes | undefined
	user: User;
	employmentStatus: EmploymentStatus | undefined;
	employmentPeriod: EmploymentPeriod | undefined;
	marital_status: MaritalStatus | undefined;
	planToReturn: PlanToReturn | undefined;
	reasonToApply: OutMigrationReason | undefined;
	workstations: WorkStation[];
	loadingStations?: boolean,
	employers: Employer[]
}> = ({ counties, countries, user, employmentStatus, employmentPeriod, marital_status, planToReturn, reasonToApply, workstations, loadingStations, workstationType, employers }) => {

	const [currentStep, setCurrentStep] = useState(1);
  const initialFormData: OutMigrationApplication = {
		index_id: user.id || '',
		country_id: '',
		application_date: '',
		marital_status: '',
		dependants: '',
		employment_status: '',
		current_employer: '',
		workstation_type: '',
		workstation_id: '',
		workstation_name: '',
		department: '',
		current_position: '',
		experience_years: '',
		duration_current_employer: '',
		planning_return: '',
		form_attached: null,
		outmigration_reason: '',
		verification_cadres: '',
	};
	
	const [formData, setFormData] = useState(initialFormData);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleChange = (data: Partial<OutMigrationApplication>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };




	const router = useRouter();
	const toast = useToast();

	const successFn = () => {
		router.replace('/applyoutmigration');
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({ id }) => {
				return (
					<ToastError
						id={id}
						title='Application Error'
						description='Could not complete exam application. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const { mutate, isPending } = useApplyOutMigration(successFn, errorFn);


	
	const handleSubmit = () => {
    mutate(formData);
  };



	return (
		<View
			style={{
				flex: 1,
			}}>
			<KeyboardAvoidingView behavior='height'>
				<ScrollView
					nestedScrollEnabled={true}
					style={{
						paddingBottom: 20,
					}}>

				{currentStep === 1 && (<OutMigrationPersonal user={user} marital_status={marital_status} onNext={handleNext} onChange={handleChange} />)}

				{currentStep === 2 && (<OutMigrationEmployment counties={counties} workstationType={workstationType} employmentStatus={employmentStatus} employmentPeriod={employmentPeriod} workstations={workstations} loadingStations={loadingStations} employers={employers} onNext={handleNext} onChange={handleChange} user={user}/>)}

				{currentStep === 3 && (<OutMigrationTravel countries={countries} planToReturn={planToReturn} reasonToApply={reasonToApply} user={user}  onNext={handleNext} onChange={handleChange}/>)}

				<View className='p-2'>
						<Button mode='contained' style={styles.button} onPress={handleSubmit}>
							Submit Application
						</Button>
					</View>
					
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#f9f9f9',
	},
	button: {
		backgroundColor: '#0445b5',
		borderRadius: 12,
		padding: 3,
	},
});

export default ApplyOutComponent;
