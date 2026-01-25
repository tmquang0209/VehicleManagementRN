import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
					{isGuest ? (
						<ThemedIcon name="dots-vertical" size={24} color={theme === 'dark' ? 'white' : 'gray'} />
					) : (
						<ThemedIcon name="chevron-right" size={24} color={theme === 'dark' ? 'white' : 'gray'} />
					)}
				</TouchableOpacity>
			</ThemedView>
		);
	};

	return (
		<ThemedSafeAreaView style={styles.container}>
			{/* Header - Aligned with House Management */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<ThemedIcon name="garage-variant" size={24} color="primary" />
					<ThemedText type="subtitle" style={styles.headerTitle}>
						DANH SÁCH XE
					</ThemedText>
				</View>
				<View style={{ flexDirection: 'row', gap: 8 }}>
					<TouchableOpacity style={[styles.iconButton, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]}>
						<ThemedIcon name="magnify" size={24} color="primary" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-vehicle')}>
						<ThemedIcon name="plus" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.content}>
				{/* Filter Section */}
				<View style={styles.filterContainer}>
					{FILTERS.map((filter) => (
						<TouchableOpacity
							key={filter}
							style={[
								styles.filterChip,
								activeFilter === filter
									? styles.filterChipActive
									: {
											backgroundColor: theme === 'dark' ? '#151718' : '#fff',
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
			</View>
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
		paddingHorizontal: 16,
		paddingVertical: 12,
		// backgroundColor: matches house-management usually implicitly transparent or handled by container
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: '#E6F0FF', // Very light blue pill
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
	},
	headerTitle: {
		textTransform: 'uppercase',
		fontSize: 16,
		color: '#0056D2',
	},
	iconButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
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
	},
	filterContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 12,
	},
	filterChip: {
		paddingVertical: 6,
		paddingHorizontal: 16,
		borderRadius: 20,
		borderWidth: 1,
	},
	filterChipActive: {
		backgroundColor: '#0056D2',
		borderColor: '#0056D2',
	},
	filterText: {
		fontWeight: '600',
	},
	filterTextActive: {
		color: '#fff',
	},
	listContent: {
		padding: 16,
		paddingBottom: 40,
	},
	card: {
		flexDirection: 'row',
		borderRadius: 16,
		padding: 12,
		marginBottom: 12,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	vehicleImage: {
		width: 60,
		height: 60,
		borderRadius: 12,
		marginRight: 12,
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
		color: '#0056D2',
		marginBottom: 2,
	},
	detailValue: {
		fontWeight: '600',
		color: '#0056D2',
	},
	dividerDot: {
		width: 3,
		height: 3,
		borderRadius: 1.5,
		backgroundColor: '#ccc',
		marginHorizontal: 8,
	},
	guestBadge: {
		backgroundColor: '#FDE8E8',
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		marginRight: 0,
	},
	guestText: {
		color: '#E02424', // Red for guest
		fontWeight: 'bold',
		fontSize: 12,
	},
	detailLabelGuest: {
		color: '#687076',
	},
	detailValueGuest: {
		fontWeight: '600',
		color: '#687076',
	},
	moreButton: {
		padding: 4,
	},
});
