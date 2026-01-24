import { LicensePlateCamera } from '@/components/scanner/license-plate-camera';
import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOAST_DURATION = 3000;

export default function ScanScreen() {
	const [scanned, setScanned] = useState(false);
	// Toast State
	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'success' | 'error'>('success');
	const fadeAnim = useRef(new Animated.Value(0)).current;

	// Swipe/Animation State
	const translateY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	// Mock result for UI demonstration
	const [result, setResult] = useState<any | null>(null);

	const showToast = (message: string, type: 'success' | 'error') => {
		setToastMessage(message);
		setToastType(type);
		setToastVisible(true);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();

		setTimeout(() => {
			hideToast();
		}, TOAST_DURATION);
	};

	const hideToast = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setToastVisible(false);
		});
	};

	const handleSuccess = (plate: string, imageUri: string) => {
		console.log('Scanned:', plate);
		setResult({
			licensePlate: plate,
			isValid: true,
			ownerName: 'Đang lấy dữ liệu...',
			ownerAddress: '---',
		});
		setScanned(true);
		showToast(`Biển số hợp lệ: ${plate}`, 'success');
	};

	const handleReset = () => {
		setScanned(false);
		setResult(null);
		hideToast();
		// Reset translation for next time
		translateY.value = 0;
	};

	const panGesture = Gesture.Pan()
		.onChange((event) => {
			if (event.translationY > 0) {
				translateY.value = event.translationY;
			}
		})
		.onEnd(() => {
			if (translateY.value > 150) {
				runOnJS(handleReset)();
			} else {
				translateY.value = withSpring(0);
			}
		});

	return (
		<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
			<Stack.Screen options={{ headerShown: false }} />

			{/* custom Toast */}
			{toastVisible && (
				<Animated.View
					style={[
						styles.toastContainer,
						{
							opacity: fadeAnim,
							backgroundColor: toastType === 'success' ? '#40B5A6' : '#EF4444',
						},
					]}
				>
					<MaterialCommunityIcons name={toastType === 'success' ? 'check-circle' : 'alert-circle'} size={24} color="#fff" />
					<ThemedText type="defaultSemiBold" style={styles.toastText}>
						{toastMessage}
					</ThemedText>
				</Animated.View>
			)}

			<LicensePlateCamera onClose={() => router.back()} onSuccess={handleSuccess} />

			{/* Result Card (Bottom Sheet style) */}
			{scanned && result && (
				<GestureDetector gesture={panGesture}>
					<Reanimated.View style={[styles.resultContainer, animatedStyle]}>
						<View style={styles.handleBarContainer}>
							<View style={styles.handleBar} />
						</View>
						<View style={styles.resultHeader}>
							<ThemedText type="medium" style={styles.resultLabel}>
								KẾT QUẢ QUÉT
							</ThemedText>
							<View style={styles.badge}>
								<ThemedText type="small" style={styles.badgeText}>
									HỢP LỆ
								</ThemedText>
							</View>
						</View>

						<ThemedText type="extraLarge" style={styles.licensePlate}>
							{result.licensePlate}
						</ThemedText>

						<View style={styles.userInfoCard}>
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
								}}
								style={styles.avatar}
							/>
							<View>
								<ThemedText type="defaultSemiBold" style={styles.userName}>
									{result.ownerName}
								</ThemedText>
								<ThemedText type="medium" style={styles.userAddress}>
									{result.ownerAddress}
								</ThemedText>
							</View>
						</View>

						<TouchableOpacity style={[styles.actionBtn, styles.btnApprove]} onPress={() => alert('Approved')}>
							<MaterialCommunityIcons name="check-circle-outline" size={24} color="#fff" />
							<ThemedText type="defaultSemiBold" style={styles.btnText}>
								CHO XE VÀO
							</ThemedText>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.actionBtn, styles.btnCancel]} onPress={handleReset}>
							<MaterialCommunityIcons name="close-circle-outline" size={24} color="#EF4444" />
							<ThemedText type="defaultSemiBold" style={[styles.btnText, { color: '#EF4444' }]}>
								HỦY
							</ThemedText>
						</TouchableOpacity>

						<TouchableOpacity style={styles.manualLink} onPress={() => router.push('/add-vehicle')}>
							<ThemedText type="medium" style={styles.manualLinkText}>
								Nhập tay nếu không quét được
							</ThemedText>
						</TouchableOpacity>
					</Reanimated.View>
				</GestureDetector>
			)}
		</SafeAreaView>
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
		backgroundColor: '#fff',
		zIndex: 10,
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontWeight: 'bold',
		color: '#11181C',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	// Result Card CSS
	resultContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		elevation: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		paddingBottom: 40,
	},
	handleBarContainer: {
		alignItems: 'center',
		marginBottom: 20,
	},
	handleBar: {
		width: 40,
		height: 4,
		backgroundColor: '#E1E3E5',
		borderRadius: 2,
	},
	resultHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	resultLabel: {
		color: '#687076',
		fontWeight: '600',
		textTransform: 'uppercase',
	},
	badge: {
		backgroundColor: '#E6F7F5',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	badgeText: {
		color: '#40B5A6',
		fontWeight: 'bold',
	},
	licensePlate: {
		fontWeight: '800',
		color: '#11181C',
		marginBottom: 24,
		textAlign: 'center',
		letterSpacing: 2,
	},
	userInfoCard: {
		flexDirection: 'row',
		backgroundColor: '#F5F7F9',
		padding: 16,
		borderRadius: 16,
		alignItems: 'center',
		marginBottom: 24,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginRight: 16,
		borderWidth: 2,
		borderColor: '#fff',
	},
	userName: {
		fontWeight: 'bold',
		color: '#11181C',
		marginBottom: 2,
	},
	userAddress: {
		color: '#687076',
	},
	actionBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		borderRadius: 16,
		marginBottom: 12,
		// Shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	btnApprove: {
		backgroundColor: '#40B5A6',
	},
	btnCancel: {
		backgroundColor: '#FEF2F2',
		borderWidth: 1,
		borderColor: '#FDE8E8',
	},
	btnText: {
		fontWeight: 'bold',
		color: '#fff',
		marginLeft: 8,
	},
	manualLink: {
		alignItems: 'center',
		marginTop: 8,
	},
	manualLinkText: {
		color: '#40B5A6',

		fontWeight: '500',
	},
	toastContainer: {
		position: 'absolute',
		top: 60,
		left: 20,
		right: 20,
		padding: 16,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 9999,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 10,
	},
	toastText: {
		color: '#fff',

		fontWeight: '600',
		marginLeft: 12,
		flex: 1,
	},
});
