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
import { signupSchema, SignupSchemaType } from '@/schema';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignupScreen() {
	const router = useRouter();
	const theme = useColorScheme() ?? 'light';
	const iconColor = theme === 'dark' ? '#FFF' : '#000';

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupSchemaType>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			fullName: '',
			phoneNumber: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: SignupSchemaType) => {
		console.log('Signup Data:', data);
		// TODO: Implement actual signup logic here
		// await signup(data);
		router.replace('/');
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7FA" darkColor="#151718">
			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
					<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={24} color={iconColor} />
						{/* Ionicons color issue: It doesn't accept style color. I need to make it dynamic.
						    I'll use useThemeColor hook later or inline conditional.
							Actually for now let's use ThemedText first.
						*/}
						<ThemedText style={styles.backText} lightColor="#000" darkColor="#FFF">
							Quay lại
						</ThemedText>
					</TouchableOpacity>

					<View style={styles.header}>
						<ThemedText type="title" style={styles.title} lightColor="#1a1a1a" darkColor="#ECEDEE">
							Đăng Ký Tài Khoản
						</ThemedText>
						<ThemedText style={styles.subtitle} lightColor="#526D82" darkColor="#9BA1A6">
							Dành cho cư dân nhà trọ
						</ThemedText>
					</View>

					<View style={styles.formContainer}>
						<Controller
							control={control}
							name="fullName"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput label="Họ và tên" placeholder="Nhập họ và tên của bạn" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.fullName?.message} />
							)}
						/>

						<Controller
							control={control}
							name="phoneNumber"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput
									label="Số điện thoại"
									placeholder="Nhập số điện thoại"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									keyboardType="phone-pad"
									error={errors.phoneNumber?.message}
								/>
							)}
						/>

						<View style={styles.passwordContainer}>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, onBlur, value } }) => (
									<ThemedTextInput
										label="Mật khẩu"
										placeholder="******"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										isPassword
										keyboardType="numeric"
										maxLength={6}
										containerStyle={{ marginBottom: 8 }}
										error={errors.password?.message}
									/>
								)}
							/>
							<ThemedText style={styles.hintText} lightColor="#526D82" darkColor="#9BA1A6">
								Gợi ý: Sử dụng ngày sinh hoặc số dễ nhớ.
							</ThemedText>
						</View>

						<Controller
							control={control}
							name="confirmPassword"
							render={({ field: { onChange, onBlur, value } }) => (
								<ThemedTextInput
									label="Xác nhận mật khẩu"
									placeholder="******"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									isPassword
									keyboardType="numeric"
									maxLength={6}
									containerStyle={{ marginBottom: 8 }}
									error={errors.confirmPassword?.message}
								/>
							)}
						/>

						<ThemedButton
							title={isSubmitting ? 'ĐANG XỬ LÝ...' : 'TẠO TÀI KHOẢN'}
							onPress={handleSubmit(onSubmit)}
							style={{ marginTop: 20, marginBottom: 32, backgroundColor: '#00D64F' }}
							disabled={isSubmitting}
						/>

						<View style={styles.footerLinks}>
							<ThemedText>Bạn đã có tài khoản rồi? </ThemedText>
							<TouchableOpacity onPress={() => router.push('/(auth)/login')}>
								<ThemedText type="defaultSemiBold" style={styles.loginLink} lightColor="#000" darkColor="#FFF">
									Quay lại đăng nhập
								</ThemedText>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.helpSection}>
						<View style={styles.helpIconBg}>
							<Ionicons name="help" size={16} color="#FFF" />
						</View>
						<ThemedText style={styles.contactText} lightColor="#909090" darkColor="#9BA1A6">
							Cần hỗ trợ? Gọi 1900 1234
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
		paddingVertical: 20,
		justifyContent: 'center',
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginTop: 20,
	},
	backText: {
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 8,
	},
	header: {
		marginBottom: 32,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
	},
	formContainer: {
		width: '100%',
	},
	passwordContainer: {
		marginBottom: 20,
	},
	hintText: {
		fontSize: 12,
	},
	footerLinks: {
		alignItems: 'center',
		marginBottom: 40,
	},
	loginLink: {
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		borderBottomWidth: 2,
		borderBottomColor: '#00D64F',
		marginTop: 4,
	},
	helpSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		marginBottom: 20,
	},
	helpIconBg: {
		width: 20,
		height: 20,
		borderRadius: 4,
		backgroundColor: '#9DA8B5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contactText: {
		fontSize: 14,
		fontWeight: '500',
	},
});
