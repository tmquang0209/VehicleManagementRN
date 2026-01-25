import { ThemedTextInput } from '@/components/text-input';
import { ThemedButton } from '@/components/themed-button';
import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RoomFormValues, RoomSchema } from '@/schema/room.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const STATUS_OPTIONS = [
	{ id: 'empty', label: 'Trống', color: Colors.secondary },
	{ id: 'occupied', label: 'Đã thuê', color: Colors.primary },
	{ id: 'maintenance', label: 'Bảo trì', color: Colors.light.danger },
] as const;

export default function RoomFormScreen() {
	const params = useLocalSearchParams<{ id?: string; floor?: string; houseName?: string }>();
	const isEdit = !!params.id;

	const borderColor = useThemeColor({ light: '#E6E8EB', dark: '#333' }, 'text');
	const inputBg = useThemeColor({ light: '#fff', dark: '#151718' }, 'background');

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<RoomFormValues>({
		resolver: zodResolver(RoomSchema),
		defaultValues: {
			name: params.id || '',
			floor: params.floor || '1',
			price: '',
			area: '',
			status: 'empty',
		},
	});

	const status = watch('status');

	const onSubmit = (data: RoomFormValues) => {
		console.log('Valid Room Data:', data);
		alert(isEdit ? 'Cập nhật phòng thành công!' : 'Tạo phòng thành công!');
		router.back();
	};

	return (
		<ThemedSafeAreaView style={styles.container} edges={['top']}>
			<Stack.Screen options={{ headerShown: false }} />

			<Header title={isEdit ? `CHỈNH SỬA PHÒNG ${params.id}` : 'THÊM PHÒNG MỚI'} icon={isEdit ? 'pencil' : 'door-closed'} onBackPress={() => router.back()} />

			<ThemedScrollView contentContainerStyle={styles.content}>
				{params.houseName && (
					<View style={styles.houseBadge}>
						<ThemedIcon name="home-city" size={16} color={Colors.primary} />
						<ThemedText type="defaultSemiBold" style={{ color: Colors.primary, marginLeft: 8 }}>
							{params.houseName}
						</ThemedText>
					</View>
				)}

				<View style={styles.card}>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<ThemedTextInput label="Tên/Số phòng" placeholder="VD: P101, Phòng 202..." value={value} onChangeText={onChange} error={errors.name?.message} />
						)}
					/>

					<View style={styles.row}>
						<View style={{ flex: 1, marginRight: 12 }}>
							<Controller
								control={control}
								name="floor"
								render={({ field: { onChange, value } }) => (
									<ThemedTextInput label="Tầng" placeholder="VD: 1" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.floor?.message} />
								)}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Controller
								control={control}
								name="area"
								render={({ field: { onChange, value } }) => <ThemedTextInput label="Diện tích (m²)" placeholder="VD: 20" value={value} onChangeText={onChange} keyboardType="numeric" />}
							/>
						</View>
					</View>

					<Controller
						control={control}
						name="price"
						render={({ field: { onChange, value } }) => <ThemedTextInput label="Giá thuê (VNĐ)" placeholder="VD: 3.500.000" value={value} onChangeText={onChange} keyboardType="numeric" />}
					/>
				</View>

				{/* Status Selection */}
				<ThemedText type="subtitle" style={styles.sectionTitle}>
					TRẠNG THÁI
				</ThemedText>
				<View style={styles.statusContainer}>
					{STATUS_OPTIONS.map((opt) => (
						<TouchableOpacity
							key={opt.id}
							style={[
								styles.statusOption,
								{
									borderColor: status === opt.id ? opt.color : borderColor,
									backgroundColor: status === opt.id ? `${opt.color}15` : inputBg,
								},
							]}
							onPress={() => setValue('status', opt.id as any)}
						>
							<View style={[styles.statusDot, { backgroundColor: opt.color }]} />
							<ThemedText type="defaultSemiBold" style={{ color: status === opt.id ? opt.color : undefined }}>
								{opt.label}
							</ThemedText>
							{status === opt.id && (
								<View style={styles.checkIcon}>
									<ThemedIcon name="check-circle" size={20} color={opt.color} />
								</View>
							)}
						</TouchableOpacity>
					))}
				</View>

				<ThemedButton title="LƯU THÔNG TIN" onPress={handleSubmit(onSubmit)} style={styles.saveButton} icon={<ThemedIcon name="content-save" size={20} color="white" />} />

				{isEdit && (
					<ThemedButton
						title="XÓA PHÒNG NÀY"
						variant="danger"
						style={{ marginTop: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'red' }}
						icon={<ThemedIcon name="trash-can-outline" size={20} color="red" />}
						onPress={() => {
							alert('Đã xóa phòng!');
							router.back();
						}}
					/>
				)}
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
	houseBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#E6F0FF',
		alignSelf: 'flex-start',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.primary,
		marginBottom: 12,
		marginTop: 8,
	},
	card: {
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
	},
	statusContainer: {
		gap: 12,
		marginBottom: 24,
	},
	statusOption: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
	},
	statusDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 12,
	},
	checkIcon: {
		marginLeft: 'auto',
	},
	saveButton: {
		marginTop: 12,
	},
});
