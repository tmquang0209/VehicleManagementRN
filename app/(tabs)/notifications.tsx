import { ThemedText } from '@/components/themed-text';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { StyleSheet } from 'react-native';

export default function NotificationsScreen() {
	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#fff" darkColor="#151718">
			<ThemedText type="subtitle" style={styles.title} lightColor="#11181C" darkColor="#ECEDEE">
				Thông báo
			</ThemedText>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
	},
});
