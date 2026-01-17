import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const ScanButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
			<View style={styles.button}>
				<MaterialCommunityIcons name="qrcode-scan" size={30} color="#40B5A6" />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		top: -20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#40B5A6',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
		borderWidth: 4,
		borderColor: '#E6F7F5', // Light teal border to match design
	},
});
