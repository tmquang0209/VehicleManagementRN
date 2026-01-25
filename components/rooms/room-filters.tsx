import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type FilterType = 'all' | 'empty';

type RoomFiltersProps = {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

export function RoomFilters({ filter, setFilter }: RoomFiltersProps) {
	const theme = useColorScheme() ?? 'light';
	const isDark = theme === 'dark';

	return (
		<View style={styles.filterContainer}>
			<TouchableOpacity
				style={[
					styles.filterButton,
					filter === 'all' ? { backgroundColor: Colors.primary } : { backgroundColor: isDark ? '#151718' : '#fff', borderWidth: 1, borderColor: isDark ? '#333' : '#E6E8EB' },
				]}
				onPress={() => setFilter('all')}
			>
				<ThemedText type="defaultSemiBold" style={[styles.filterText, filter === 'all' ? styles.filterTextActive : { color: isDark ? '#9BA1A6' : '#687076' }]}>
					TẤT CẢ
				</ThemedText>
			</TouchableOpacity>
			<View style={{ width: 12 }} />
			<TouchableOpacity
				style={[
					styles.filterButton,
					filter === 'empty' ? { backgroundColor: Colors.secondary } : { backgroundColor: isDark ? '#151718' : '#fff', borderWidth: 1, borderColor: isDark ? '#333' : '#E6E8EB' },
				]}
				onPress={() => setFilter('empty')}
			>
				<ThemedText type="defaultSemiBold" style={[styles.filterText, filter === 'empty' ? styles.filterTextActive : { color: isDark ? '#9BA1A6' : '#687076' }]}>
					TRỐNG
				</ThemedText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	filterButton: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	filterText: {
		fontSize: 14,
	},
	filterTextActive: {
		color: '#fff',
	},
});
