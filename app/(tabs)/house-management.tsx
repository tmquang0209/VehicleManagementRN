import { HouseCard } from '@/components/house/house-card';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { HouseItem } from '@/interfaces/house';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const MOCK_HOUSES: HouseItem[] = [
	{
		id: '1',
		name: 'NHÀ TRỌ AN BÌNH',
		address: '123 Đường ABC, Quận 1, TP.HCM',
		totalRooms: 20,
		status: 'active',
		imageUri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
	},
	{
		id: '2',
		name: 'NHÀ TRỌ HÒA BÌNH',
		address: '456 Đường XYZ, Quận 3, TP.HCM',
		totalRooms: 15,
		status: 'active',
		imageUri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	},
	{
		id: '3',
		name: 'KHU TRỌ TRƯỜNG SƠN',
		address: '789 Đường TS, Quận Tân Bình',
		totalRooms: 40,
		status: 'construction',
		imageUri: 'https://images.unsplash.com/photo-1574362848149-11496d64bd9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
	},
];

export default function HouseManagementScreen() {
	const router = useRouter();

	const handleHousePress = (house: HouseItem) => {
		if (house.status === 'active') {
			// Navigate to Room List (acting as details for the house)
			// Assuming room-list is still accessible. If it was removed from tabs, we might need to adjust route.
			// For now, let's try pushing to the existing route.
			router.push('/(tabs)/room-list');
		}
	};

	return (
		<ThemedSafeAreaView style={styles.container}>
			{/* Header */}
			<Header
				title="QUẢN LÝ NHÀ TRỌ"
				icon="home"
				rightComponent={
					<TouchableOpacity style={styles.addButton}>
						<ThemedIcon name="plus" size={24} color="white" />
					</TouchableOpacity>
				}
			/>

			<View style={styles.content}>
				<ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
					DANH SÁCH TÒA NHÀ
				</ThemedText>

				<FlatList
					data={MOCK_HOUSES}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <HouseCard item={item} onPress={() => handleHousePress(item)} />}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	addButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#0056D2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 50,
	},
	sectionTitle: {
		color: '#687076',
		fontSize: 14,
		textTransform: 'uppercase',
		marginTop: 16,
		marginBottom: 12,
	},
	listContent: {
		paddingBottom: 24,
	},
});
