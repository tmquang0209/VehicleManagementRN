import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { router, Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Animated, Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextRecognition from 'react-native-text-recognition';

const TOAST_DURATION = 3000;

export default function ScanScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [enableTorch, setEnableTorch] = useState(false);
	const cameraRef = useRef<CameraView>(null);

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

	const getCropRegion = (imageWidth: number, imageHeight: number) => {
		const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

		const frameWidth = 300;
		const frameHeight = 200;

		const scaleX = imageWidth / screenWidth;
		const scaleY = imageHeight / screenHeight;

		const cropWidth = frameWidth * scaleX;
		const cropHeight = frameHeight * scaleY;

		const originX = (imageWidth - cropWidth) / 2;
		const originY = (imageHeight - cropHeight) / 2;

		return {
			originX: Math.max(0, originX),
			originY: Math.max(0, originY),
			width: Math.min(imageWidth, cropWidth),
			height: Math.min(imageHeight, cropHeight),
		};
	};

	const processImage = async (photo: { uri: string; width: number; height: number }, isAuto = false) => {
		try {
			const cropRegion = getCropRegion(photo.width, photo.height);
			const manipResult = await manipulateAsync(photo.uri, [{ crop: cropRegion }, { resize: { width: 1000 } }], { compress: 1, format: SaveFormat.JPEG });

			const resultText = await TextRecognition.recognize(manipResult.uri);
			const fullText = resultText.join(' ').replaceAll('\n', '').replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll('-', '');
			const cleanText = fullText.replace(/[^A-Z0-9]/g, '');

			const plateRegex = /\d{2}[A-Z][A-Z0-9]?\d{4,5}/g;
			const matches = cleanText.match(plateRegex);
			console.log('OCR Result:', cleanText, 'Matches:', matches);

			if (matches && matches.length > 0) {
				const found = matches[0].replace('\n', ' ');
				setResult({
					licensePlate: found,
					isValid: true,
					ownerName: 'Đang lấy dữ liệu...',
					ownerAddress: '---',
				});
				setScanned(true);
				showToast(`Biển số hợp lệ: ${found}`, 'success');
			} else {
				if (!isAuto) {
					showToast('Không tìm thấy biển số', 'error');
				} else {
					showToast('Không tìm thấy biển số', 'error');
				}
			}
		} catch (error) {
			console.error('OCR Error:', error);
			if (!isAuto) {
				showToast('Lỗi nhận diện', 'error');
			}
		}
	};

	const handleManualTrigger = async () => {
		if (cameraRef.current && !processing) {
			setProcessing(true);
			try {
				const photo = await cameraRef.current.takePictureAsync({
					quality: 0.8,
					skipProcessing: true,
				});

				if (photo?.uri) {
					await processImage(photo, false);
				}
			} catch (error) {
				console.error('Camera Error:', error);
				setProcessing(false);
			}
		}
	};

	const handleReset = () => {
		setScanned(false);
		setResult(null);
		setProcessing(false);
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

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

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
					<Text style={styles.toastText}>{toastMessage}</Text>
				</Animated.View>
			)}

			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
					<MaterialCommunityIcons name="chevron-left" size={32} color="#11181C" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Quét Biển Số</ThemedText>
				<View style={{ width: 32 }} />
			</View>

			<View style={styles.cameraContainer}>
				<CameraView ref={cameraRef} style={styles.camera} facing="back" enableTorch={enableTorch} onBarcodeScanned={undefined}>
					{/* Overlay */}
					<View style={styles.overlay}>
						<View style={styles.overlayTop} />
						<View style={styles.overlayCenter}>
							<View style={styles.overlaySide} />
							<View style={styles.focusFrame}>
								<View style={[styles.corner, styles.cornerTL]} />
								<View style={[styles.corner, styles.cornerTR]} />
								<View style={[styles.corner, styles.cornerBL]} />
								<View style={[styles.corner, styles.cornerBR]} />

								{!scanned && (
									<View style={styles.scanLineContainer}>
										<Text style={styles.scanningText}>{processing ? 'Đang xử lý...' : 'Căn chỉnh biển số vào khung'}</Text>
									</View>
								)}
							</View>
							<View style={styles.overlaySide} />
						</View>
						<View style={styles.overlayBottom}>
							{/* Camera Controls */}
							{!scanned && (
								<View style={styles.controlsRow}>
									<TouchableOpacity style={styles.controlBtnSmall}>
										<MaterialCommunityIcons name="image-outline" size={24} color="#fff" />
									</TouchableOpacity>

									<TouchableOpacity style={styles.shutterBtn} onPress={handleManualTrigger} disabled={processing}>
										{processing ? <ActivityIndicator size="large" color="#40B5A6" /> : <View style={styles.shutterInner} />}
									</TouchableOpacity>

									<TouchableOpacity style={styles.controlBtnSmall} onPress={() => setEnableTorch((prev) => !prev)}>
										<MaterialCommunityIcons name={enableTorch ? 'flashlight' : 'flashlight-off'} size={24} color={enableTorch ? '#FFEE58' : '#fff'} />
									</TouchableOpacity>
								</View>
							)}
						</View>
					</View>
				</CameraView>
			</View>

			{/* Result Card (Bottom Sheet style) */}
			{scanned && result && (
				<GestureDetector gesture={panGesture}>
					<Reanimated.View style={[styles.resultContainer, animatedStyle]}>
						<View style={styles.handleBarContainer}>
							<View style={styles.handleBar} />
						</View>
						<View style={styles.resultHeader}>
							<ThemedText style={styles.resultLabel}>KẾT QUẢ QUÉT</ThemedText>
							<View style={styles.badge}>
								<Text style={styles.badgeText}>HỢP LỆ</Text>
							</View>
						</View>

						<Text style={styles.licensePlate}>{result.licensePlate}</Text>

						<View style={styles.userInfoCard}>
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
								}}
								style={styles.avatar}
							/>
							<View>
								<ThemedText style={styles.userName}>{result.ownerName}</ThemedText>
								<ThemedText style={styles.userAddress}>{result.ownerAddress}</ThemedText>
							</View>
						</View>

						<TouchableOpacity style={[styles.actionBtn, styles.btnApprove]} onPress={() => alert('Approved')}>
							<MaterialCommunityIcons name="check-circle-outline" size={24} color="#fff" />
							<Text style={styles.btnText}>CHO XE VÀO</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.actionBtn, styles.btnCancel]} onPress={handleReset}>
							<MaterialCommunityIcons name="close-circle-outline" size={24} color="#EF4444" />
							<Text style={[styles.btnText, { color: '#EF4444' }]}>HỦY</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.manualLink}>
							<ThemedText style={styles.manualLinkText}>Nhập tay nếu không quét được</ThemedText>
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
		backgroundColor: '#fff',
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
		fontSize: 18,
		fontWeight: 'bold',
		color: '#11181C',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	cameraContainer: {
		flex: 1,
		backgroundColor: '#000',
	},
	camera: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
	},
	overlayTop: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	overlayCenter: {
		flexDirection: 'row',
		height: 240, // Increased Frame height
	},
	overlaySide: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	focusFrame: {
		width: 320, // Increased Frame width
		borderColor: 'transparent',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlayBottom: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'flex-end',
		paddingBottom: 50,
	},
	corner: {
		position: 'absolute',
		width: 30,
		height: 30,
		borderColor: '#fff',
		borderWidth: 4,
		borderRadius: 4,
	},
	cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
	cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
	cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
	cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
	scanLineContainer: {
		alignItems: 'center',
		position: 'absolute',
		bottom: -40,
	},
	scanningText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '500',
		textAlign: 'center',
		opacity: 0.8,
	},
	controlsRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: 20,
	},
	controlBtnSmall: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	shutterBtn: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 4,
		borderColor: 'rgba(255,255,255,0.5)',
	},
	shutterInner: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: '#40B5A6',
		borderWidth: 2,
		borderColor: '#fff',
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
		fontSize: 14,
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
		fontSize: 12,
	},
	licensePlate: {
		fontSize: 36,
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
		fontSize: 16,
		fontWeight: 'bold',
		color: '#11181C',
		marginBottom: 2,
	},
	userAddress: {
		fontSize: 14,
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
		fontSize: 16,
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
		fontSize: 14,
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
		fontSize: 15,
		fontWeight: '600',
		marginLeft: 12,
		flex: 1,
	},
});
