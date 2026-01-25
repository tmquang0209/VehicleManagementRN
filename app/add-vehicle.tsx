import { DatePicker } from '@/components/datepicker';
import { LicensePlateScanner } from '@/components/license-plate-scanner';
import { ThemedTextInput } from '@/components/text-input';
import { ThemedButton } from '@/components/themed-button';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// Constants
const RELATIONSHIPS = [
	{ id: 'owner', label: 'Chủ phòng' },
	{ id: 'family', label: 'Con cháu' },
	{ id: 'friend', label: 'Bạn bè' },
	{ id: 'guest', label: 'Khách' },
];

const ROOMS = ['101', '102', '201', '305', '404', '502'];

export default function AddVehicleScreen() {
	const theme = useColorScheme() ?? 'light';
	const [plate, setPlate] = useState('');
	const [selectedRoom, setSelectedRoom] = useState('');
	const [relationship, setRelationship] = useState('');
	const [date, setDate] = useState(new Date());

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showRoomDropdown, setShowRoomDropdown] = useState(false);
	const [showScanner, setShowScanner] = useState(false);
	const [vehicleImage, setVehicleImage] = useState<string | null>(null);
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';
	const backgroundColor = isDark ? '#000000' : '#F5F7F9';

	const handleDateChange = (event: any, selectedDate?: Date) => {
		const currentDate = selectedDate || date;
		if (Platform.OS === 'android') {
			setShowDatePicker(false);
		}
		setDate(currentDate);
	};

	const handleQuickDate = (type: 'now' | 'morning' | 'evening') => {
		const newDate = new Date();
		if (type === 'now') {
			setDate(newDate);
			return;
		}

		// Advance to tomorrow
		newDate.setDate(newDate.getDate() + 1);

		if (type === 'morning') {
			newDate.setHours(8, 0, 0, 0);
		} else if (type === 'evening') {
			newDate.setHours(19, 0, 0, 0);
		}
		setDate(newDate);
	};

	const handleAdd = () => {
		// Mock submission
		if (!plate || !selectedRoom || !relationship) {
			alert('Vui lòng điền đầy đủ thông tin');
			return;
		}
		alert('Thêm xe thành công!');
		router.back();
	};

	const inputBg = theme === 'dark' ? '#151718' : '#fff';
	const borderColor = theme === 'dark' ? '#333' : '#E6E8EB';
	const textColor = theme === 'dark' ? '#ECEDEE' : '#11181C';
	const placeholderColor = theme === 'dark' ? '#687076' : '#9BA1A6';

	return (
		<ThemedSafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
			<Stack.Screen options={{ headerShown: false }} />
			{/* Header */}
			<View style={[styles.header, { backgroundColor: theme === 'dark' ? '#151718' : '#fff', borderBottomColor: borderColor }]}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
					<ThemedIcon name="arrow-left" size={28} />
				</TouchableOpacity>
				<ThemedText type="subtitle" style={styles.headerTitle} lightColor="#11181C" darkColor="#ECEDEE">
					Thêm Xe Mới
				</ThemedText>
				<View style={{ width: 32 }} />
			</View>

			<ThemedScrollView>
				{/* Plate Number */}
				<View style={styles.inputGroup}>
					<ThemedTextInput label="Biển số xe" placeholder="VD: 59G1-123.45" value={plate} onChangeText={setPlate} autoCapitalize="characters" containerStyle={{ marginBottom: 0 }} />
				</View>

				{/* Vehicle Image Placeholder */}
				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold" style={styles.label}>
						Hình ảnh xe
					</ThemedText>
					<TouchableOpacity style={[styles.imagePlaceholder, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]} onPress={() => setShowScanner(true)}>
						{vehicleImage ? (
							<Image source={{ uri: vehicleImage }} style={styles.capturedImage} resizeMode="cover" />
						) : (
							<>
								<MaterialCommunityIcons name="camera" size={48} color="#40B5A6" />
								<ThemedText type="defaultSemiBold" style={styles.imagePlaceholderText}>
									CHỤP ẢNH XE
								</ThemedText>
							</>
						)}
					</TouchableOpacity>
				</View>

				<LicensePlateScanner
					visible={showScanner}
					onClose={() => setShowScanner(false)}
					onSuccess={(scannedPlate, imageUri) => {
						setPlate(scannedPlate);
						setVehicleImage(imageUri);
						setShowScanner(false);
					}}
				/>

				{/* Room Selector */}
				<View style={[styles.inputGroup, { zIndex: 10 }]}>
					<ThemedText type="defaultSemiBold" style={styles.label}>
						Phòng số
					</ThemedText>
					<TouchableOpacity style={[styles.dropdownTrigger, { backgroundColor: inputBg, borderColor: borderColor }]} onPress={() => setShowRoomDropdown(!showRoomDropdown)}>
						<ThemedText type="default" style={{ color: selectedRoom ? textColor : placeholderColor }}>
							{selectedRoom || 'Chọn số phòng...'}
						</ThemedText>
						<ThemedIcon name="chevron-down" size={24} lightColor="#9BA1A6" darkColor="#687076" />
					</TouchableOpacity>

					{showRoomDropdown && (
						<View style={[styles.dropdownMenu, { backgroundColor: inputBg, borderColor: borderColor }]}>
							{ROOMS.map((room) => (
								<TouchableOpacity
									key={room}
									style={[styles.dropdownItem, { borderBottomColor: theme === 'dark' ? '#222' : '#F5F7F9' }]}
									onPress={() => {
										setSelectedRoom(room);
										setShowRoomDropdown(false);
									}}
								>
									<ThemedText style={{ color: textColor }}>{room}</ThemedText>
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>

				{/* Relationship Selector */}
				<View style={styles.inputGroup}>
					<ThemedTextInput label="Quan hệ" placeholder="VD: Con cháu, Bạn bè..." value={relationship} onChangeText={setRelationship} />
					<View style={styles.chipContainer}>
						{RELATIONSHIPS.map((rel) => (
							<TouchableOpacity
								key={rel.id}
								style={[styles.chip, { backgroundColor: relationship === rel.label ? '#40B5A6' : theme === 'dark' ? '#222' : '#F5F7F9' }]}
								onPress={() => setRelationship(rel.label)}
							>
								<ThemedText
									type="small"
									style={[styles.chipText, relationship === rel.label && styles.chipTextActive]}
									lightColor={relationship === rel.label ? '#fff' : '#11181C'}
									darkColor={relationship === rel.label ? '#fff' : '#ECEDEE'}
								>
									{rel.label}
								</ThemedText>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Date Picker */}
				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold" style={styles.label}>
						Gửi đến ngày / giờ
					</ThemedText>
					<TouchableOpacity
						style={[styles.datePickerTrigger, { backgroundColor: inputBg, borderColor: borderColor }]}
						onPress={() => {
							setShowDatePicker(!showDatePicker);
						}}
					>
						<ThemedText type="default" style={{ fontSize: 16, color: textColor }}>
							{dayjs(date).format('HH:mm DD/MM/YYYY')}
						</ThemedText>
						<ThemedIcon name="calendar" size={24} />
					</TouchableOpacity>
					{showDatePicker && <DatePicker mode="datetime" display="inline" is24Hour={true} value={date} onChange={handleDateChange} onClose={() => setShowDatePicker(false)} />}

					{/* Quick Date Chips */}
					<View style={styles.quickDateContainer}>
						<TouchableOpacity style={[styles.quickDateChip, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]} onPress={() => handleQuickDate('now')}>
							<ThemedText type="small" style={styles.quickDateText}>
								Ngay bây giờ
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.quickDateChip, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]} onPress={() => handleQuickDate('morning')}>
							<ThemedText type="small" style={styles.quickDateText}>
								Sáng mai (8h)
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.quickDateChip, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]} onPress={() => handleQuickDate('evening')}>
							<ThemedText type="small" style={styles.quickDateText}>
								Tối mai (19h)
							</ThemedText>
						</TouchableOpacity>
					</View>

					<ThemedText type="small" style={styles.helperText}>
						Mặc định gửi qua đêm
					</ThemedText>
				</View>

				{/* Submit Button */}
				<ThemedButton title="XÁC NHẬN THÊM" onPress={handleAdd} style={{ marginTop: 12 }} />
			</ThemedScrollView>
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
		borderBottomWidth: 1,
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontWeight: 'bold',
	},
	inputGroup: {
		marginBottom: 24,
	},
	label: {
		marginBottom: 8,
	},
	imagePlaceholder: {
		height: 200,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: '#40B5A6',
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	capturedImage: {
		width: '100%',
		height: '100%',
	},
	imagePlaceholderText: {
		marginTop: 12,
		color: '#40B5A6',
		textTransform: 'uppercase',
	},
	dropdownTrigger: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderWidth: 1,
	},
	dropdownMenu: {
		position: 'absolute',
		top: '100%',
		left: 0,
		right: 0,
		borderRadius: 12,
		borderWidth: 1,
		marginTop: 4,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	dropdownItem: {
		padding: 16,
		borderBottomWidth: 1,
	},
	chipContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginTop: 8,
	},
	chip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	chipText: {
		fontWeight: '600',
	},
	chipTextActive: {
		color: '#fff',
	},
	datePickerTrigger: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderWidth: 1,
	},
	helperText: {
		marginTop: 8,
		color: '#9BA1A6',
		fontStyle: 'italic',
	},
	quickDateContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginTop: 12,
	},
	quickDateChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#40B5A6',
	},
	quickDateText: {
		color: '#40B5A6',
		fontWeight: '600',
	},
});
