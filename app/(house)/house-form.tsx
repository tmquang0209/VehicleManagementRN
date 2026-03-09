import { ThemedTextInput } from '@/components/text-input';

import { ThemedButton } from '@/components/themed-button';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HouseFormValues, HouseSchema } from '@/schema/house.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function HouseFormScreen() {
	const theme = useColorScheme() ?? 'light';

	// Form Setup
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<HouseFormValues>({
		resolver: zodResolver(HouseSchema),
		defaultValues: {
			name: '',
			address: '',
			manager: '',
			floors: '',
			roomsPerFloor: '',
			prefix: 'P',
		},
	});

	// Room Generation State
	const [generatedRooms, setGeneratedRooms] = useState<string[]>([]);
	const [showPreview, setShowPreview] = useState(false);

	const handleGeneratePreview = () => {
		const { floors, roomsPerFloor, prefix } = getValues();

		const numFloors = parseInt(floors || '0');
		const numRooms = parseInt(roomsPerFloor || '0');

		if (!numFloors || !numRooms) {
			Toast.error('Vui lòng nhập số tầng và số phòng hợp lệ');
			return;
		}

		const rooms: string[] = [];
		for (let f = 1; f <= numFloors; f++) {
			for (let r = 1; r <= numRooms; r++) {
				// Format: Prefix + Floor + RoomIndex (two digits if < 10)
				// e.g., P101, P102... P201
				const roomName = `${prefix}${f}${r.toString().padStart(2, '0')}`;
				rooms.push(roomName);
			}
		}
		setGeneratedRooms(rooms);
		setShowPreview(true);
	};

	const onSubmit = (data: HouseFormValues) => {
		console.log('Valid House Data:', data);
		console.log('Generated Rooms:', generatedRooms);

		Toast.success('Tạo nhà trọ và danh sách phòng thành công!');
		router.back();
	};

	return (
		<ThemedSafeAreaView style={styles.container} edges={['top']}>
			<Stack.Screen options={{ headerShown: false }} />

			<Header title="THÊM NHÀ TRỌ MỚI" icon="home-plus" onBackPress={() => router.back()} />

			<ThemedScrollView contentContainerStyle={styles.content}>
				{/* Section 1: House Info */}
				<ThemedText type="subtitle" style={styles.sectionTitle}>
					THÔNG TIN CHUNG
				</ThemedText>

				<View style={styles.card}>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => <ThemedTextInput label="Tên nhà trọ" placeholder="VD: Nhà trọ An Bình" value={value} onChangeText={onChange} error={errors.name?.message} />}
					/>

					<Controller
						control={control}
						name="address"
						render={({ field: { onChange, value } }) => <ThemedTextInput label="Địa chỉ" placeholder="VD: 123 Đường ABC..." value={value} onChangeText={onChange} error={errors.address?.message} />}
					/>

					<Controller
						control={control}
						name="manager"
						render={({ field: { onChange, value } }) => (
							<ThemedTextInput label="Người quản lý (Tùy chọn)" placeholder="Tên người quản lý" value={value} onChangeText={onChange} containerStyle={{ marginBottom: 0 }} />
						)}
					/>
				</View>

				{/* Section 2: Room Auto-Generation */}
				<ThemedText type="subtitle" style={styles.sectionTitle}>
					CẤU HÌNH PHÒNG TỰ ĐỘNG
				</ThemedText>
				<ThemedText type="small" style={styles.sectionDesc} lightColor="#687076" darkColor="#9BA1A6">
					Hệ thống sẽ tự động tạo danh sách phòng dựa trên số tầng và số phòng mỗi tầng.
				</ThemedText>

				<View style={styles.card}>
					<View style={styles.row}>
						<View style={{ flex: 1, marginRight: 12 }}>
							<Controller
								control={control}
								name="floors"
								render={({ field: { onChange, value } }) => (
									<ThemedTextInput label="Số tầng" placeholder="VD: 3" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.floors?.message} />
								)}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Controller
								control={control}
								name="roomsPerFloor"
								render={({ field: { onChange, value } }) => (
									<ThemedTextInput label="Phòng/Tầng" placeholder="VD: 5" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.roomsPerFloor?.message} />
								)}
							/>
						</View>
					</View>

					<Controller
						control={control}
						name="prefix"
						render={({ field: { onChange, value } }) => <ThemedTextInput label="Tiền tố phòng" placeholder="VD: P (-> P101)" value={value} onChangeText={onChange} />}
					/>

					<ThemedButton title="XEM TRƯỚC DANH SÁCH PHÒNG" variant="secondary" onPress={handleGeneratePreview} style={{ marginTop: 8 }} />
				</View>

				{/* Preview Section */}
				{showPreview && (
					<View style={styles.previewContainer}>
						<ThemedText type="defaultSemiBold" style={{ marginBottom: 12 }}>
							Sẽ tạo {generatedRooms.length} phòng:
						</ThemedText>
						<View style={styles.roomBadgeContainer}>
							{generatedRooms.map((r, index) => (
								<View key={index} style={[styles.roomBadge, { backgroundColor: theme === 'dark' ? '#1A2E35' : `${Colors.primary}15` }]}>
									<ThemedText type="small" style={{ color: Colors.primary, fontWeight: '600' }}>
										{r}
									</ThemedText>
								</View>
							))}
						</View>
					</View>
				)}

				<ThemedButton title="LƯU & TẠO NHÀ" onPress={handleSubmit(onSubmit)} style={styles.saveButton} icon={<ThemedIcon name="check" size={20} color="white" />} />
			</ThemedScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: 16,
		paddingBottom: 40,
	},
	sectionTitle: {
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.primary,
		marginBottom: 8,
		marginTop: 8,
	},
	sectionDesc: {
		marginBottom: 16,
		fontStyle: 'italic',
	},
	card: {
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
	},
	previewContainer: {
		marginTop: 8,
		marginBottom: 24,
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E6E8EB',
		borderStyle: 'dashed',
	},
	roomBadgeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	roomBadge: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
	},
	saveButton: {
		marginTop: 12,
		marginBottom: 40,
	},
});
