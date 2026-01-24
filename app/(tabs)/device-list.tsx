import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// Dummy Data
const VEHICLES = [
	{
		id: '1',
		plate: '59G1 - 123.45',
		room: '101',
		type: 'resident', // resident | guest
		image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop', // Motorcycle placeholder
	},
	{
		id: '2',
		plate: '29A - 999.99',
		room: '205',
		type: 'guest',
		image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop', // Car placeholder
	},
	{
		id: '3',
		plate: '43C1 - 567.89',
		room: '302',
		type: 'resident',
		image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop', // Scooter placeholder
	},
	{
		id: '4',
		plate: '15B2 - 442.10',
		room: '401',
		type: 'resident',
		image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop', // Car placeholder
	},
	{
		id: '5',
		plate: '36M1 - 888.88',
		room: '105',
		type: 'resident',
		image: 'https://images.unsplash.com/photo-1622185135505-2d795043906a?q=80&w=2074&auto=format&fit=crop',
	},
];

const FILTERS = ['Tất cả', 'Xe cư dân', 'Xe khách'];

export default function DeviceListScreen() {
	const [activeFilter, setActiveFilter] = useState('Tất cả');
	const theme = useColorScheme() ?? 'light';

	const renderItem = ({ item }: { item: (typeof VEHICLES)[0] }) => {
		const isGuest = item.type === 'guest';
		return (
			<ThemedView style={styles.card} lightColor="#fff" darkColor="#151718">
				<Image source={{ uri: item.image }} style={styles.vehicleImage} resizeMode="cover" />
				<View style={styles.cardContent}>
					<ThemedText type="large" style={styles.plateNumber} lightColor="#11181C" darkColor="#ECEDEE">
						{item.plate}
					</ThemedText>
					<View style={styles.detailsRow}>
						{isGuest ? (
							<View style={styles.guestBadge}>
								<ThemedText type="small" style={styles.guestText}>
									Xe khách
								</ThemedText>
							</View>
						) : (
							<View>
								<ThemedText type="small" style={styles.detailLabel}>
									Phòng
								</ThemedText>
								<ThemedText type="medium" style={styles.detailValue}>
									{item.room}
								</ThemedText>
							</View>
						)}

						<View style={styles.dividerDot} />

						{isGuest ? (
							<View>
								<ThemedText type="small" style={styles.detailLabelGuest} lightColor="#687076" darkColor="#9BA1A6">
									Phòng
								</ThemedText>
								<ThemedText type="medium" style={styles.detailValueGuest} lightColor="#687076" darkColor="#9BA1A6">
									{item.room}
								</ThemedText>
							</View>
						) : (
							<View>
								<ThemedText type="small" style={styles.detailLabel}>
									Xe cư dân
								</ThemedText>
							</View>
						)}
					</View>
				</View>
				<TouchableOpacity style={styles.moreButton}>
					{isGuest ? <MaterialCommunityIcons name="dots-vertical" size={24} color="#40B5A6" /> : <MaterialCommunityIcons name="chevron-right" size={24} color="#C4C4C4" />}
				</TouchableOpacity>
			</ThemedView>
		);
	};

	return (
		<ThemedSafeAreaView style={styles.container} edges={['top']} lightColor="#F5F7F9" darkColor="#000">
			{/* Header */}
			<View style={[styles.header, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
				<View style={styles.headerTitleContainer}>
					<MaterialCommunityIcons name="garage-variant" size={24} color="#40B5A6" />
					<ThemedText type="subtitle" style={styles.headerTitle} lightColor="#11181C" darkColor="#ECEDEE">
						Danh Sách Xe
					</ThemedText>
				</View>
				<TouchableOpacity style={[styles.searchButton, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]}>
					<MaterialCommunityIcons name="magnify" size={24} color="#40B5A6" />
				</TouchableOpacity>
			</View>

			{/* Filter Section */}
			<View style={[styles.filterContainer, { backgroundColor: theme === 'dark' ? '#000' : '#fff', borderBottomColor: theme === 'dark' ? '#333' : '#F0F0F0' }]}>
				{FILTERS.map((filter) => (
					<TouchableOpacity
						key={filter}
						style={[
							styles.filterChip,
							activeFilter === filter
								? styles.filterChipActive
								: {
										backgroundColor: theme === 'dark' ? '#000' : '#fff',
										borderColor: theme === 'dark' ? '#333' : '#E6E8EB',
									},
						]}
						onPress={() => setActiveFilter(filter)}
					>
						<ThemedText
							type="medium"
							style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}
							lightColor={activeFilter === filter ? '#fff' : '#11181C'}
							darkColor={activeFilter === filter ? '#fff' : '#ECEDEE'}
						>
							{filter}
						</ThemedText>
					</TouchableOpacity>
				))}
			</View>

			{/* List */}
			<FlatList data={VEHICLES} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />

			{/* FAB */}
			<TouchableOpacity style={styles.fab} onPress={() => router.push('/add-vehicle')}>
				<MaterialCommunityIcons name="plus" size={32} color="#fff" />
			</TouchableOpacity>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	headerTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	headerTitle: {
		fontWeight: 'bold',
	},
	searchButton: {
		padding: 8,
		borderRadius: 20,
	},
	filterContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 12,
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#F0F0F0',
	},
	filterChip: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 20,
		borderWidth: 1,
	},
	filterChipActive: {
		backgroundColor: '#40B5A6',
		borderColor: '#40B5A6',
	},
	filterText: {
		fontWeight: '600',
	},
	filterTextActive: {
		color: '#fff',
	},
	listContent: {
		padding: 20,
		paddingBottom: 100, // Space for FAB
	},
	card: {
		flexDirection: 'row',
		borderRadius: 20,
		padding: 12,
		marginBottom: 16,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 3,
	},
	vehicleImage: {
		width: 70,
		height: 70,
		borderRadius: 12,
		marginRight: 16,
	},
	cardContent: {
		flex: 1,
		justifyContent: 'center',
	},
	plateNumber: {
		fontWeight: 'bold',
		marginBottom: 4,
	},
	detailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	detailLabel: {
		color: '#40B5A6',
		marginBottom: 2,
	},
	detailValue: {
		fontWeight: '600',
		color: '#40B5A6',
	},
	dividerDot: {
		width: 2,
		height: 2,
		borderRadius: 1,
		backgroundColor: '#ccc',
		marginHorizontal: 12,
	},
	guestBadge: {
		backgroundColor: '#FDE8E8',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		marginRight: 0,
	},
	guestText: {
		color: '#E02424', // Red for guest
		fontWeight: 'bold',
	},
	detailLabelGuest: {
		color: '#687076',
	},
	detailValueGuest: {
		fontWeight: '600',
		color: '#687076',
	},
	moreButton: {
		padding: 8,
	},
	fab: {
		position: 'absolute',
		bottom: 24,
		right: 24,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#40B5A6',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
});
