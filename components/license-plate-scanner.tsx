import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LicensePlateCamera } from './scanner/license-plate-camera';

interface LicensePlateScannerProps {
	visible: boolean;
	onClose: () => void;
	onSuccess: (plate: string, imageUri: string) => void;
}

export function LicensePlateScanner({ visible, onClose, onSuccess }: LicensePlateScannerProps) {
	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
				<LicensePlateCamera onClose={onClose} onSuccess={onSuccess} />
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});
