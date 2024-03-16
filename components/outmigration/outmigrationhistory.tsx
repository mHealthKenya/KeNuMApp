import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Divider, List, Searchbar } from 'react-native-paper';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import globalStyles from '../../styles/global';
import { OutmigrationApplicationHistory } from '../../models/outmigrationapplicationhistory';
import EmptyList from '../shared/EmptyList';
import { useSearch } from '../../providers/search';
import { User } from '../../models/user';
import { useAuth } from '../../providers/auth';
import useOutMigrationHistorys from '../../services/outmigration/outmigrationapplicationhistory';
import { useOutMigrationFetched } from '../../providers/outmigrationprovider';

export const currencyFormatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
});

export const OutMigrationItenAccordion: FC<{
	title: string;
	content: string;
	desc: string;
	availableWidth: number;
}> = ({ title, content, desc, availableWidth }) => {
	const [expanded, setExpanded] = useState('');
	const [show, setShow] = useState(false);

	const contentSrc = content
const contentArr = contentSrc.split(',');

const result = contentArr.map(item => {
    const initials = item.split(' ').map(word => word.charAt(0)).join('');
    return initials;
});

const extractor = (t: string) => {
	let name = ''
	const item = t.split(', ');
	for(const i of item){
		name += i.charAt(0).toUpperCase();
	}
	return name
}

const list = contentArr.map((item) => {
	return {
		item,
		short: extractor(content)
	}
})

  const handlePress = (id: string) => {setExpanded(id); setShow(!show)}
	return (
		<>
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
					<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
					</View>
					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View style={stylesAccordion.container}>
				<List.Section style={stylesAccordion.section}>
  {list.map((item, index) => {
    return (
      <List.Accordion
        key={index}
        title={item.short}
        expanded={item.short === expanded && show}
        onPress={() => handlePress(item.item)}
        style={stylesAccordion.accordion}
        titleStyle={stylesAccordion.accordionTitle}
      >
            <List.Item
              title={item.item}
              titleStyle={stylesAccordion.itemTitle}
              key={index}
            />
          
      </List.Accordion>
    )
  })}
</List.Section>

    </View>
					</View>
				</View>
		
		</>
		)

		
}

export const OutMigrationItem: FC<{
	title: string;
	content: string;
	availableWidth: number;
}> = ({ title, content, availableWidth }) => {
	return (
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
				<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
					</View>
					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View
					style={[
						{
							flex: 1,
							padding: 10,
						},
					]}>
					<Text style={styles.normalText}>{content}</Text>
				</View>
			</View>
		</View>
	);
};

export const OutMigrationItemDouble: FC<{
	title: string;
	subtitle: string;
	subtitle1: string;
	content: string;
	content1: string;
	availableWidth: number;
}> = ({ title, content, availableWidth, subtitle, subtitle1, content1 }) => {
	return (
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
				<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
					</View>

					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View
					style={[
						globalStyles.row,
						{
							flex: 1,
							padding: 10,
							justifyContent: 'space-between',
						},
					]}>
					<View style={[globalStyles.column, { width: availableWidth * 0.35 }]}>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.mutedText}>{subtitle}</Text>
						</View>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.normalText}>{content}</Text>
						</View>
					</View>

					<View style={[globalStyles.column, { width: availableWidth * 0.35 }]}>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.mutedText}>{subtitle1}</Text>
						</View>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.normalText}>{content1}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const Application: FC<{
	application: OutmigrationApplicationHistory;
	action: (item: OutmigrationApplicationHistory) => void;
}> = ({ application, action }) => {
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable style={[styles.card]} onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<OutMigrationItem
					availableWidth={availableWidth}
					title='Country'
					content={application.country_name}
				/>
				<OutMigrationItem
					availableWidth={availableWidth}
					title='Cadre'
					content={application.verification_cadres}
				/>
				<OutMigrationItenAccordion availableWidth={availableWidth} title='Cadre'
					content={application.verification_cadres} desc={application.verification_cadres} />
				<OutMigrationItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.application_date)).format(
						'DD/MM/YYYY'
					)}
				/>
				<OutMigrationItem
					availableWidth={availableWidth}
					title='Tracking  Number'
					content={application.tracking_number || 'Unavailable'}
				/>
				<OutMigrationItem
					availableWidth={availableWidth}
					title='Status'
					content={application.application_status}
				/>
				

				<OutMigrationItemDouble
					title='Invoice'
					subtitle='Invoice Number'
					content={application.invoice_no}
					subtitle1='Amount'
					content1={currencyFormatter.format(+application.amount_due)}
					availableWidth={availableWidth}
				/>

				<OutMigrationItemDouble
					title='Amount'
					subtitle='Amount Paid'
					content={currencyFormatter.format(+application.amount_paid)}
					subtitle1='Balance Due'
					content1={currencyFormatter.format(+application.balance_due)}
					availableWidth={availableWidth}
				/>
			</View>
		</Pressable>
	);
};

const OutMigrationHistoryComponent: FC<{
	applications: OutmigrationApplicationHistory[];
	refetch: () => void;
	isRefreshing: boolean;
}> = ({ applications, refetch, isRefreshing }) => {
  const { user } = useAuth();
	const { handleMigrate } = useOutMigrationFetched();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const { search, handleSearch } = useSearch();

	const [item, setItem] = useState<OutmigrationApplicationHistory | null>(null);

	const handleItem = (item: OutmigrationApplicationHistory) => {
		setItem(item);
		handleMigrate(item);
		handlePresentModal();
	};

	const filtered = useMemo(
		() =>
			applications.filter((item) =>
				item.country_name.toLowerCase().includes(search.toLowerCase())

			),
		[applications, search]
	);

	return (
		<BottomSheetModalProvider>
			<View style={[globalStyles.container]}>
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}>
					<View style={styles.bottomSheet}>
						<BottomSheetView style={[styles.contentContainer]}>
							<PayForApplication item={item} />
						</BottomSheetView>

						<View style={[styles.contentContainer]}>
							<DownloadInvoice item={item} />
						</View>

						<BottomSheetView style={[styles.contentContainer]}>
							<DownloadReceipt item={item} />
						</BottomSheetView>
					</View>
				</BottomSheetModal>
				<Searchbar
					placeholder='Search by Country'
					onChangeText={handleSearch}
					value={search}
					style={styles.searchBar}
				/>
				<FlatList
					data={filtered}
					renderItem={({ item }) => (
						<Application application={item} action={() => handleItem(item)} />
					)}
					keyExtractor={(item) => item.application_id}
					showsVerticalScrollIndicator={false}
					onRefresh={() => refetch()}
					refreshing={isRefreshing}
					ListEmptyComponent={
						<EmptyList message='Could not find any Out Migration applications in your account' />
					}
				/>
			</View>
		</BottomSheetModalProvider>
	);
};

export default OutMigrationHistoryComponent;



const styles = StyleSheet.create({
	box: {
		padding: 20,
		margin: 4,
	},

	card: {
		// backgroundColor: '#dcf0fa',
		backgroundColor: '#FFFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#b1c4e5',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	itemText: {
		textAlign: 'left',
	},

	titleText: {
		fontSize: 14,
		color: '#356bc4',
		letterSpacing: 2,
	},

	normalText: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
	},

	mutedText: {
		color: '#b6b6b6',
		fontSize: 14,
	},

	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},

	bottomSheet: {
		flex: 1,
		padding: 10,
		gap: 10,
	},

	contentContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});


const stylesAccordion = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: 'white',
	},
	section: {
	  marginBottom: 10,
	},
	accordion: {
	  backgroundColor: 'white',
	},
	accordionTitle: {
	  fontSize: 16, 
	  fontWeight: 'normal', 
	},
	itemTitle: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
	},
  });