import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedTextInput } from '@/components/text-input';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { loginSchema, LoginSchemaType } from '@/schema';

export default function LoginScreen() {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			phoneNumber: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		console.log('Login Data:', data);
		// TODO: Implement actual login logic here
		// await login(data);
		router.replace('/');
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7FA" darkColor="#151718">
			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
					<View style={styles.header}>
						<ThemedText type="title" style={styles.title} color="primary">
							ĐĂNG NHẬP
						</ThemedText>
						<ThemedText style={styles.subtitle} color="secondary">
							Hệ thống quản lý xe
						</ThemedText>
					</View>

					<View style={styles.formContainer}>
						<Controller
							control={control}
							name="phoneNumber"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput
									label="Nhập số điện thoại"
									placeholder="0xxx xxx xxx"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									keyboardType="phone-pad"
									error={errors.phoneNumber?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput
									label="Mật khẩu"
									placeholder="• • • • • •"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									isPassword
									keyboardType="numeric"
									maxLength={6}
									error={errors.password?.message}
								/>
							)}
						/>

						<ThemedButton title={isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'} onPress={handleSubmit(onSubmit)} style={{ marginTop: 20, marginBottom: 24 }} disabled={isSubmitting} />

						<View style={styles.footerLinks}>
							<TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
								<ThemedText style={styles.forgotPassword} color="secondary">
									Quên mật khẩu?
								</ThemedText>
							</TouchableOpacity>

							<View style={styles.signupContainer}>
								<ThemedText color="secondary">Chưa có tài khoản? </ThemedText>
								<TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
									<ThemedText type="defaultSemiBold" style={styles.signupLink} color="primary">
										Đăng ký ngay
									</ThemedText>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={styles.helpSection}>
						<View style={styles.helpContent}>
							<Ionicons name="headset-outline" size={24} color="#0056D2" />
							<ThemedText style={styles.helpText} color="primary">
								Cần hỗ trợ?
							</ThemedText>
						</View>
						<ThemedText style={styles.contactText} color="secondary">
							Gọi cho quản lý:{' '}
							<ThemedText type="defaultSemiBold" color="secondary">
								1900 1234
							</ThemedText>
						</ThemedText>
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
	scrollContent: {
		flexGrow: 1,
	},
	keyboardView: {
		flex: 1,
		paddingHorizontal: 4,
		justifyContent: 'center',
		paddingVertical: 40,
	},
	header: {
		alignItems: 'center',
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		marginBottom: 8,
		textAlign: 'center',
		padding: 5,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
	},
	formContainer: {
		width: '100%',
	},
	footerLinks: {
		alignItems: 'center',
		gap: 12,
	},
	forgotPassword: {
		textDecorationLine: 'underline',
		fontSize: 16,
	},
	signupContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	signupLink: {
		textDecorationLine: 'underline',
	},
	helpSection: {
		marginTop: 60,
		backgroundColor: '#E6EEFA',
		borderRadius: 16,
		padding: 16,
		alignItems: 'center',
	},
	helpContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
		gap: 8,
	},
	helpText: {
		fontSize: 16,
		fontWeight: '600',
	},
	contactText: {
		fontSize: 14,
	},
});
