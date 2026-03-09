import { RoomCard } from '@/components/rooms/room-card';
import { RoomFilters } from '@/components/rooms/room-filters';
import { ThemedTextInput } from '@/components/text-input';
import { ThemedIcon } from '@/components/themed-icon'; // Assuming this wraps MCI
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { Colors } from '@/constants/theme';
import { RoomItem } from '@/interfaces/room';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const MOCK_ROOMS: RoomItem[] = [
	{ id: '101', status: 'occupied', representative: 'NGUYỄN VĂN A' },
	{ id: '102', status: 'empty', representative: null },
	{ id: '201', status: 'occupied', representative: 'TRẦN THỊ B' },
	{ id: '202', status: 'empty', representative: null },
	{ id: '301', status: 'occupied', representative: 'LÊ VĂN C' },
	{ id: '302', status: 'empty', representative: null },
];

export default function RoomScreen() {
	const [filter, setFilter] = useState<'all' | 'empty'>('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const houseName = 'NHÀ TRỌ AN BÌNH'; // Mock Building Name

	const filteredRooms = MOCK_ROOMS.filter((room) => {
		const matchesStatus = filter === 'all' ? true : room.status === 'empty';
		const matchesSearch = room.id.toLowerCase().includes(searchQuery.toLowerCase()) || (room.representative && room.representative.toLowerCase().includes(searchQuery.toLowerCase()));

		return matchesStatus && matchesSearch;
	});

	return (
		<ThemedSafeAreaView style={styles.container}>
			{/* Header */}
			<Header
				title={houseName}
				icon="office-building"
				onBackPress={() => router.back()}
				rightComponent={
					<TouchableOpacity
						onPress={() => {
							setIsSearching(!isSearching);
							if (isSearching) setSearchQuery(''); // Clear search on close
						}}
						style={styles.iconButton}
					>
						<ThemedIcon name={isSearching ? 'close' : 'magnify'} size={24} />
					</TouchableOpacity>
				}
			/>

			{/* Search Bar */}
			{isSearching && (
				<View style={styles.searchContainer}>
					<ThemedTextInput
						placeholder="Tìm theo số phòng, tên người thuê..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						autoFocus
						containerStyle={{ marginBottom: 0 }}
						leftIcon={<ThemedIcon name="magnify" size={24} />}
					/>
				</View>
			)}

			{/* Filters */}
			<RoomFilters filter={filter} setFilter={setFilter} />

			{/* List */}
			<FlatList
				data={filteredRooms}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<RoomCard
						item={item}
						onPress={() =>
							router.push({
								pathname: '/room-details',
								params: {
									id: item.id,
									representative: item.representative,
									status: item.status,
								},
							})
						}
					/>
				)}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<View style={styles.emptyContainer}>
						<ThemedIcon name="magnify-remove-outline" size={48} color="gray" />
						<ThemedText style={{ marginTop: 12, opacity: 0.6 }}>Không tìm thấy phòng nào</ThemedText>
					</View>
				)}
			/>

			{/* Floating Action Button */}
			<TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/room-form', params: { houseName } })}>
				<ThemedIcon name="plus" size={30} color="white" />
			</TouchableOpacity>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iconButton: {
		padding: 4,
	},
	searchContainer: {
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	houseNameContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: `${Colors.primary}15`,
		marginHorizontal: 16,
		marginVertical: 8,
		borderRadius: 8,
		alignItems: 'center',
	},
	houseName: {
		color: Colors.primary,
		textTransform: 'uppercase',
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 100, // Space for footer
	},
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 40,
	},
	fab: {
		position: 'absolute',
		bottom: 110, // Adjusted to clear Tab Bar (80px) + spacing
		right: 24,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 8,
		zIndex: 10,
	},
});
