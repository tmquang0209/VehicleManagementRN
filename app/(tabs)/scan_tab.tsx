import { View } from 'react-native';

/**
 * This is a dummy component.
 * The tab press is intercepted in _layout.tsx to navigate to the actual /scan modal.
 */
export default function ScanTabPlaceholder() {
	return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
}
