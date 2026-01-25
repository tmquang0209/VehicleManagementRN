import { ThemedButton } from '@/components/themed-button';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RoomItem } from '@/interfaces/room';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type RoomCardProps = {
	item: RoomItem;
	onPress?: () => void;
};

export function RoomCard({ item, onPress }: RoomCardProps) {
	const theme = useColorScheme() ?? 'light';
	const isOccupied = item.status === 'occupied';
	const statusColor = isOccupied ? Colors.primary : Colors.secondary;

	return (
		<View style={[styles.card, { backgroundColor: theme === 'dark' ? '#151718' : '#fff', borderColor: theme === 'dark' ? '#333' : '#E6E8EB' }]}>
			<View style={styles.cardHeader}>
				<View>
					<ThemedText type="title" style={styles.roomTitle}>
						PHÒNG {item.id}
					</ThemedText>
					<View style={styles.statusRow}>
						<ThemedIcon name={isOccupied ? 'check-circle' : 'door-open'} size={16} color={statusColor} />
						<ThemedText type="default" style={[styles.statusText, { color: statusColor }]}>
							{isOccupied ? 'Đang ở' : 'Trống'}
						</ThemedText>
					</View>
				</View>

				<View style={[styles.iconCircle, { backgroundColor: isOccupied ? `${Colors.primary}15` : `${Colors.secondary}15` }]}>
					<ThemedIcon name={isOccupied ? 'account' : 'bed-empty'} size={28} color={statusColor} style={{ opacity: 1 }} lightColor={statusColor} darkColor={statusColor} />
				</View>
			</View>

			<View style={styles.divider} />

			<View style={styles.infoSection}>
				<ThemedText type="small" style={styles.label}>
					NGƯỜI ĐẠI DIỆN:
				</ThemedText>
				<ThemedText type="defaultSemiBold" style={[styles.representative, !isOccupied && styles.placeholderText]}>
					{item.representative || 'Chưa có khách'}
				</ThemedText>
			</View>

			<ThemedButton
				title={isOccupied ? 'CHI TIẾT' : 'XẾP PHÒNG'}
				onPress={onPress}
				style={[styles.actionButton, { backgroundColor: statusColor, borderColor: statusColor }]}
				// Keep text white for contrast on teal button
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	roomTitle: {
		marginBottom: 4,
		paddingVertical: 5,
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	statusText: {
		fontWeight: '500',
	},
	iconCircle: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider: {
		height: 1,
		backgroundColor: '#F5F7F9', // Very subtle divider
		marginVertical: 16,
	},
	infoSection: {
		marginBottom: 16,
	},
	label: {
		color: '#687076',
		marginBottom: 4,
		textTransform: 'uppercase',
		fontSize: 12,
		fontWeight: '600',
	},
	representative: {
		fontSize: 16,
	},
	placeholderText: {
		color: '#9BA1A6',
		fontStyle: 'italic',
	},
	actionButton: {
		borderRadius: 24, // Pill shape
		height: 44,
	},
});
