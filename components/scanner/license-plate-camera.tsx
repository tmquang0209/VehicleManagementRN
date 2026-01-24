import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import sign from 'jwt-encode';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

interface LicensePlateCameraProps {
	onClose?: () => void;
	onSuccess: (plate: string, imageUri: string) => void;
	title?: string;
}

export function LicensePlateCamera({ onClose, onSuccess, title = 'Quét Biển Số' }: LicensePlateCameraProps) {
	const [permission, requestPermission] = useCameraPermissions();
	const [enableTorch, setEnableTorch] = useState(false);
	const cameraRef = useRef<CameraView>(null);

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

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			// Create JWT
			const jwt = sign({}, 'TMQuang2026@@');
			const response = await axios.post('https://n8n-local.hqlab.dev/webhook/recognition-plate', formData, {
				headers: {
					Authorization: `Bearer ${jwt}`,
					'Content-Type': 'multipart/form-data',
				},
				timeout: 20000,
			});
			return response.data;
		},
		onError: (error) => {
			console.error('API Error:', error);
			alert('Lỗi kết nối máy chủ. Vui lòng thử lại.');
		},
	});

	const processImage = async (photo: { uri: string; width: number; height: number }) => {
		try {
			const cropRegion = getCropRegion(photo.width, photo.height);
			const manipResult = await manipulateAsync(photo.uri, [{ crop: cropRegion }, { resize: { width: 1000 } }], { compress: 0.8, format: SaveFormat.JPEG });

			const formData = new FormData();
			// @ts-ignore: React Native FormData
			formData.append('file', {
				uri: manipResult.uri,
				name: 'license_plate.jpg',
				type: 'image/jpeg',
			});

			const result = await mutation.mutateAsync(formData);

			if (result.license_plate && Array.isArray(result.license_plate) && result.license_plate.length > 0 && result.license_plate[0]) {
				onSuccess(result.license_plate[0], manipResult.uri);
			} else {
				alert('Không tìm thấy biển số. Vui lòng thử lại.');
			}
		} catch (error) {
			console.error('Processing Error:', error);
			if (!axios.isAxiosError(error)) {
				alert('Đã có lỗi xảy ra khi xử lý ảnh.');
			}
		}
	};

	const handleCapture = async () => {
		if (cameraRef.current && !mutation.isPending) {
			try {
				const photo = await cameraRef.current.takePictureAsync({
					quality: 0.8,
					skipProcessing: true,
				});

				if (photo?.uri) {
					await processImage(photo);
				}
			} catch (error) {
				console.error('Camera Error:', error);
			}
		}
	};

	if (!permission) {
		return <View style={styles.container} />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.permissionContainer}>
				<ThemedText style={styles.message}>Chúng tôi cần quyền truy cập camera để quét biển số</ThemedText>
				<TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
					<ThemedText style={styles.permissionButtonText}>Cấp quyền Camera</ThemedText>
				</TouchableOpacity>
				{onClose && (
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<ThemedText style={{ color: '#687076' }}>Đóng</ThemedText>
					</TouchableOpacity>
				)}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{onClose ? (
					<TouchableOpacity onPress={onClose} style={styles.backButton}>
						<MaterialCommunityIcons name="close" size={28} color="#fff" />
					</TouchableOpacity>
				) : (
					<View style={{ width: 36 }} /> // Spacer to balance title
				)}
				<ThemedText type="large" style={styles.headerTitle}>
					{title}
				</ThemedText>
				<View style={{ width: 36 }} />
			</View>

			<View style={styles.cameraContainer}>
				<CameraView ref={cameraRef} style={styles.camera} facing="back" enableTorch={enableTorch} onBarcodeScanned={undefined}>
					<View style={styles.overlay}>
						<View style={styles.overlayTop} />
						<View style={styles.overlayCenter}>
							<View style={styles.overlaySide} />
							<View style={styles.focusFrame}>
								<View style={[styles.corner, styles.cornerTL]} />
								<View style={[styles.corner, styles.cornerTR]} />
								<View style={[styles.corner, styles.cornerBL]} />
								<View style={[styles.corner, styles.cornerBR]} />
							</View>
							<View style={styles.overlaySide} />
						</View>
						<View style={styles.overlayBottom}>
							<View style={styles.controlsRow}>
								<View style={{ width: 48 }} />

								<TouchableOpacity style={styles.shutterBtn} onPress={handleCapture} disabled={mutation.isPending}>
									{mutation.isPending ? <ActivityIndicator size="large" color="#40B5A6" /> : <View style={styles.shutterInner} />}
								</TouchableOpacity>

								<TouchableOpacity style={styles.controlBtnSmall} onPress={() => setEnableTorch((prev) => !prev)}>
									<MaterialCommunityIcons name={enableTorch ? 'flashlight' : 'flashlight-off'} size={24} color={enableTorch ? '#FFEE58' : '#fff'} />
								</TouchableOpacity>
							</View>
							<ThemedText style={styles.hintText}>Di chuyển biển số vào khung hình</ThemedText>
						</View>
					</View>
				</CameraView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#fff',
	},
	message: {
		textAlign: 'center',
		marginBottom: 20,
	},
	permissionButton: {
		backgroundColor: '#40B5A6',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginBottom: 12,
	},
	permissionButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	closeButton: {
		padding: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#000',
		zIndex: 10,
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		color: '#fff',
		fontWeight: 'bold',
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
		height: 240,
	},
	overlaySide: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	focusFrame: {
		width: 320,
		borderColor: 'transparent',
		position: 'relative',
	},
	overlayBottom: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20,
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
	controlsRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
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
	hintText: {
		color: '#fff',
		marginTop: 10,
		opacity: 0.8,
	},
});
