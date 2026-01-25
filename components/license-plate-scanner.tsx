import React from 'react';
import { Modal } from 'react-native';
import { LicensePlateCamera } from './scanner/license-plate-camera';

interface LicensePlateScannerProps {
	visible: boolean;
	onClose: () => void;
	onSuccess: (plate: string, imageUri: string) => void;
}

export function LicensePlateScanner({ visible, onClose, onSuccess }: LicensePlateScannerProps) {
	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
			<LicensePlateCamera onClose={onClose} onSuccess={onSuccess} />
		</Modal>
	);
}
