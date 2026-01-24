import { ThemedTextInput } from '@/components/text-input';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { forgotPasswordSchema, ForgotPasswordSchemaType } from '@/schema';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function ForgotPasswordScreen() {
	const router = useRouter();
	const theme = useColorScheme() ?? 'light';
	const iconColor = theme === 'dark' ? '#FFF' : '#000';
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordSchemaType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			phoneNumber: '',
		},
	});

	const handleSendCode = async (data: ForgotPasswordSchemaType) => {
		setLoading(true);
		console.log('Forgot Password Data:', data);
		// TODO: Implement send code logic
		Toast.success('Mã xác nhận đã được gửi đến số điện thoại của bạn');

		setTimeout(() => {
			setLoading(false);
		}, 2000);
		// await sendCode(data);
		// router.push('/verify-code');
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F9FAFB" darkColor="#151718">
			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
					<View style={styles.headerContainer}>
						<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
							<Ionicons name="chevron-back" size={28} color={iconColor} />
						</TouchableOpacity>
						<ThemedText type="title" color="blue" style={styles.headerTitle}>
							Quên Mật Khẩu
						</ThemedText>
					</View>

					<View style={styles.contentContainer}>
						<ThemedText type="title" style={styles.title} lightColor="#111827" darkColor="#ECEDEE">
							Nhập số điện thoại để lấy lại mật khẩu
						</ThemedText>

						<Controller
							control={control}
							name="phoneNumber"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput
									label="Số điện thoại"
									placeholder="09xx xxx xxx"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									keyboardType="phone-pad"
									leftIcon={<Ionicons name="call" size={20} color="#526D82" style={{ transform: [{ scaleX: -1 }] }} />}
									containerStyle={{ marginBottom: 24 }}
									error={errors.phoneNumber?.message}
								/>
							)}
						/>

						<ThemedButton title="GỬI MÃ XÁC NHẬN" onPress={handleSubmit(handleSendCode)} style={{ marginTop: 24, backgroundColor: '#44BBA4' }} loading={isSubmitting || loading} />

						<View style={styles.helpSection}>
							<ThemedText style={styles.helpText} lightColor="#000" darkColor="#ECEDEE">
								Cần hỗ trợ thêm?
							</ThemedText>
							<TouchableOpacity
								onPress={() => {
									/* Handle contact support */
								}}
							>
								<ThemedText style={styles.contactLink}>Liên hệ quản lý nhà trọ</ThemedText>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ThemedScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
		position: 'relative',
	},
	scrollContent: {
		flexGrow: 1,
	},
	keyboardView: {
		flex: 1,
		paddingHorizontal: 0,
	},
	backButton: {
		position: 'absolute',
		left: 0,
		zIndex: 1,
		padding: 8,
	},
	headerTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		paddingVertical: 5,
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		fontSize: 28,
		lineHeight: 36,
		marginBottom: 32,
		fontWeight: '800',
	},
	helpSection: {
		marginTop: 'auto',
		marginBottom: 40,
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB',
		borderStyle: 'dashed',
		paddingTop: 24,
		width: '100%',
	},
	helpText: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 4,
	},
	contactLink: {
		color: '#44BBA4', // Keep brand color
		fontSize: 14,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
});
