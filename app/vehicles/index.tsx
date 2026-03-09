import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// --- MOCK DATA ---
type VehicleType = 'RESIDENT' | 'GUEST';

interface Vehicle {
	id: string;
	licensePlate: string;
	model: string;
	imageUrl: string;
	roomName: string;
	type: VehicleType;
	checkInTime: string;
}

const mockVehicles: Vehicle[] = [
	{
		id: 'v1',
		licensePlate: '29A-123.45',
		model: 'Honda SH',
		imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=200',
		roomName: 'P.101',
		type: 'RESIDENT',
		checkInTime: new Date().toISOString(),
	},
	{
		id: 'v2',
		licensePlate: '30K-999.00',
		model: 'Yamaha Exciter',
		imageUrl: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?auto=format&fit=crop&q=80&w=200',
		roomName: 'P.205',
		type: 'RESIDENT',
		checkInTime: new Date(Date.now() - 86400000).toISOString(),
	},
	{
		id: 'v3',
		licensePlate: '99H1-888.88',
		model: 'Honda Vision',
		imageUrl: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=200',
		roomName: 'P.101',
		type: 'GUEST',
		checkInTime: new Date(Date.now() - 3600000).toISOString(),
	},
	{
		id: 'v4',
		licensePlate: '15B1-456.78',
		model: 'VinFast Feliz S',
		imageUrl: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=200',
		roomName: 'P.302',
		type: 'RESIDENT',
		checkInTime: new Date(Date.now() - 172800000).toISOString(),
	},
	{
		id: 'v5',
		licensePlate: '17M3-222.33',
		model: 'Yamaha NVX',
		imageUrl: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=200',
		roomName: 'P.404',
		type: 'GUEST',
		checkInTime: new Date(Date.now() - 1800000).toISOString(),
	},
];

export default function VehicleListScreen() {
	const theme = useColorScheme() ?? 'light';
	const activeColors = Colors[theme];

	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState<'ALL' | 'RESIDENT' | 'GUEST'>('ALL');

	// --- FILTER LOGIC ---
	const filteredVehicles = mockVehicles.filter((v) => {
		const matchesSearch =
			v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) || v.roomName.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesType = activeFilter === 'ALL' || v.type === activeFilter;

		return matchesSearch && matchesType;
	});

	// --- RENDER COMPONENTS ---
	const renderFilterTabs = () => (
		<View style={styles.filterTabsContainer}>
			{(['ALL', 'RESIDENT', 'GUEST'] as const).map((filter) => {
				const isActive = activeFilter === filter;
				const label = filter === 'ALL' ? 'Tất cả' : filter === 'RESIDENT' ? 'Xe cư dân' : 'Xe khách';

				return (
					<TouchableOpacity
						key={filter}
						style={[styles.filterTab, isActive && [styles.filterTabActive, { backgroundColor: activeColors.primary }]]}
						onPress={() => setActiveFilter(filter)}
						activeOpacity={0.7}
					>
						<ThemedText
							type="defaultSemiBold"
							style={[styles.filterTabText, isActive && styles.filterTabTextActive]}
							lightColor={isActive ? '#fff' : '#687076'}
							darkColor={isActive ? '#000' : '#9BA1A6'}
						>
							{label}
						</ThemedText>
					</TouchableOpacity>
				);
			})}
		</View>
	);

	const renderVehicleCard = ({ item }: { item: Vehicle }) => {
		const isGuest = item.type === 'GUEST';

		return (
			<TouchableOpacity onPress={() => router.push(`/vehicles/${item.id}` as any)} activeOpacity={0.7}>
				<ThemedView style={styles.card} lightColor="#fff" darkColor="#151718">
					<View style={styles.cardContent}>
						{/* Image */}
						<Image source={{ uri: item.imageUrl }} style={styles.vehicleImage} />

						{/* Layout Props */}
						<View style={styles.cardDetails}>
							{/* Header Row */}
							<View style={styles.cardHeader}>
								<ThemedText type="subtitle" style={styles.licensePlate}>
									{item.licensePlate}
								</ThemedText>
								<View style={[styles.badge, isGuest ? styles.badgeGuest : styles.badgeResident]}>
									<ThemedText type="small" style={[styles.badgeText, isGuest ? styles.badgeTextGuest : styles.badgeTextResident]}>
										{isGuest ? 'Khách' : 'Cư dân'}
									</ThemedText>
								</View>
							</View>

							{/* Model */}
							<ThemedText type="default" style={styles.vehicleModel} lightColor="#687076" darkColor="#9BA1A6">
								{item.model}
							</ThemedText>

							{/* Bottom Row */}
							<View style={styles.cardBottomRow}>
								<View style={styles.roomBadge}>
									<MaterialCommunityIcons name="door-open" size={14} color={activeColors.primary} />
									<ThemedText type="small" style={[styles.roomName, { color: activeColors.primary }]}>
										{item.roomName}
									</ThemedText>
								</View>

								{/* Only show check-in time for guests */}
								{isGuest && (
									<View style={styles.timeInfo}>
										<MaterialCommunityIcons name="clock-outline" size={14} color="#687076" />
										<ThemedText type="small" style={styles.timeText} lightColor="#687076" darkColor="#9BA1A6">
											{dayjs(item.checkInTime).format('HH:mm - DD/MM')}
										</ThemedText>
									</View>
								)}
							</View>
						</View>
					</View>
				</ThemedView>
			</TouchableOpacity>
		);
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			<Header title="QUẢN LÝ XE" onBackPress={() => router.back()} />

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<View style={[styles.searchBox, { backgroundColor: theme === 'light' ? '#fff' : '#1A1D1E' }]}>
					<ThemedIcon name="magnify" size={24} color="#687076" />
					<TextInput
						style={[styles.searchInput, { color: activeColors.text }]}
						placeholder="Tìm biển số, phòng, tên xe..."
						placeholderTextColor="#9BA1A6"
						value={searchQuery}
						onChangeText={setSearchQuery}
						clearButtonMode="while-editing"
					/>
				</View>
			</View>

			{/* Tabs filter */}
			{renderFilterTabs()}

			{/* List */}
			<FlatList
				data={filteredVehicles}
				keyExtractor={(item) => item.id}
				renderItem={renderVehicleCard}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<ThemedIcon name="bike-fast" size={64} color="#ECEDEE" />
						<ThemedText type="defaultSemiBold" style={{ marginTop: 12 }} lightColor="#687076" darkColor="#9BA1A6">
							Không tìm thấy xe nào phù hợp
						</ThemedText>
					</View>
				}
			/>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		zIndex: 1,
	},
	searchBox: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		height: 48,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		fontSize: 16,
		fontFamily: 'Inter-Medium',
	},
	filterTabsContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		marginBottom: 16,
		gap: 8,
	},
	filterTab: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#E6E8EB',
	},
	filterTabActive: {
		borderColor: 'transparent',
	},
	filterTabText: {
		fontSize: 14,
	},
	filterTabTextActive: {
		fontWeight: '700',
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 40,
		gap: 12,
	},
	card: {
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
		overflow: 'hidden',
	},
	cardContent: {
		flexDirection: 'row',
		padding: 12,
		alignItems: 'center',
	},
	vehicleImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		backgroundColor: '#F5F7F9',
	},
	cardDetails: {
		flex: 1,
		marginLeft: 12,
		justifyContent: 'center',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	licensePlate: {
		fontWeight: '700',
		fontSize: 18,
	},
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	badgeResident: {
		backgroundColor: '#E6F0FF',
	},
	badgeText: {
		// Added base badgeText style
		fontSize: 11,
		fontWeight: '700',
	},
	badgeTextResident: {
		color: '#0066FF',
	},
	badgeGuest: {
		backgroundColor: '#FFF0D4',
	},
	badgeTextGuest: {
		color: '#D47A00',
	},
	vehicleModel: {
		fontSize: 14,
		marginBottom: 8,
	},
	cardBottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	roomBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 102, 255, 0.05)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		gap: 4,
	},
	roomName: {
		fontWeight: '700',
		fontSize: 13,
	},
	timeInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	timeText: {
		fontSize: 13,
		fontWeight: '500',
	},
	emptyContainer: {
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
