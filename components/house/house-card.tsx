import { ThemedButton } from '@/components/themed-button';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HouseItem } from '@/interfaces/house';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type HouseCardProps = {
	item: HouseItem;
	onPress?: () => void;
};

export function HouseCard({ item, onPress }: HouseCardProps) {
	const theme = useColorScheme() ?? 'light';
	// Map status to display text and color
	const getStatusConfig = (status: HouseItem['status']) => {
		switch (status) {
			case 'active':
				return { text: 'ĐANG HOẠT ĐỘNG', color: '#28a745', bg: '#28a745' };
			case 'construction':
				return { text: 'ĐANG HOÀN THIỆN', color: '#687076', bg: '#9BA1A6' };
			case 'inactive':
			default:
				return { text: 'CHƯA HOẠT ĐỘNG', color: '#687076', bg: '#E6E8EB' };
		}
	};

	const statusConfig = getStatusConfig(item.status);

	return (
		<View style={[styles.card, { backgroundColor: theme === 'dark' ? '#151718' : '#fff', borderColor: theme === 'dark' ? '#333' : '#fff' }]}>
			{/* Image Section */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: item.imageUri || 'https://picsum.photos/400/200' }} style={styles.image} resizeMode="cover" />
				<View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
					<ThemedText type="small" style={styles.statusText}>
						{statusConfig.text}
					</ThemedText>
				</View>
			</View>

			{/* Info Section */}
			<View style={styles.content}>
				<ThemedText type="small" style={styles.subtitle}>
					CƠ SỞ {item.id}
				</ThemedText>
				<ThemedText type="title" style={styles.title}>
					{item.name}
				</ThemedText>

				<View style={styles.infoRow}>
					<ThemedIcon name="map-marker" size={16} color="gray" />
					<ThemedText type="default" style={styles.infoText}>
						{item.address}
					</ThemedText>
				</View>

				<View style={styles.infoRow}>
					<ThemedIcon name="office-building" size={16} color="gray" />
					<ThemedText type="default" style={styles.infoText}>
						Quy mô:{' '}
						<ThemedText type="defaultSemiBold" style={{ color: '#0056D2' }}>
							{item.totalRooms} phòng
						</ThemedText>
					</ThemedText>
				</View>

				{/* Action Button */}
				<ThemedButton
					title={item.status === 'active' ? 'VÀO QUẢN LÝ' : 'CHƯA HOẠT ĐỘNG'}
					onPress={onPress}
					style={[
						styles.button,
						item.status !== 'active' && styles.disabledButton,
						// Use specific blue from design if needed, default primary is close
					]}
					icon={item.status === 'active' ? <ThemedIcon name="chevron-right" size={20} color="white" /> : undefined}
					disabled={item.status !== 'active'}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		marginBottom: 20,
		overflow: 'hidden',
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
	},
	imageContainer: {
		height: 180,
		width: '100%',
		position: 'relative',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	statusBadge: {
		position: 'absolute',
		top: 12,
		right: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	statusText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 10,
	},
	content: {
		padding: 16,
	},
	subtitle: {
		color: '#0056D2', // Blue-ish
		textTransform: 'uppercase',
		fontWeight: '700',
		marginBottom: 4,
	},
	title: {
		fontSize: 20,
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
		gap: 8,
	},
	infoText: {
		color: '#687076',
		fontSize: 14,
		flex: 1,
	},
	button: {
		marginTop: 8,
		borderRadius: 24, // Pill shape
		height: 48,
	},
	disabledButton: {
		opacity: 0.5,
		backgroundColor: '#E6E8EB',
	},
});
