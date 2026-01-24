import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface DatePickerProps {
	mode?: 'date' | 'time' | 'datetime';
	display?: 'default' | 'compact' | 'spinner' | 'calendar' | 'inline';
	is24Hour?: boolean;
	value: Date;
	onChange: (event: DateTimePickerEvent, date?: Date | undefined) => void;
	onClose?: () => void;
}

export function DatePicker({ value, onChange, onClose, mode, display, is24Hour }: DatePickerProps) {
	const platform = Platform.OS;

	const [androidMode, setAndroidMode] = useState<'date' | 'time' | 'datetime'>(mode === 'datetime' ? 'date' : mode || 'date');
	const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

	if (platform === 'ios') {
		const iosDisplay = display === 'calendar' ? 'inline' : display;
		const isInline = iosDisplay === 'inline';

		return (
			<Modal transparent animationType="slide" visible={true} onRequestClose={onClose}>
				<View style={[styles.modalOverlay, isInline && { justifyContent: 'center', paddingHorizontal: 24 }]}>
					<TouchableOpacity style={styles.overlayClick} onPress={onClose} activeOpacity={1} />
					<View style={[styles.modalContent, isInline && { borderRadius: 16 }]}>
						{!isInline && (
							<View style={styles.header}>
								<TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
									<Text style={styles.doneButton}>Xong</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Main Picker */}
						<DateTimePicker
							locale="vi-VN"
							value={value}
							onChange={onChange}
							mode={isInline && mode === 'datetime' ? 'date' : mode}
							display={iosDisplay || 'inline'}
							style={styles.picker}
							themeVariant="light"
						/>

						{/* Additional Time Picker for Inline Datetime */}
						{isInline && mode === 'datetime' && (
							<View style={styles.timePickerContainer}>
								<DateTimePicker locale="vi-VN" value={value} onChange={onChange} mode="time" display="spinner" is24Hour={true} style={styles.picker} themeVariant="light" />
							</View>
						)}

						{isInline && (
							<View style={styles.footer}>
								<TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={{ flex: 1, alignItems: 'center' }}>
									<Text style={styles.doneButton}>Xong</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			</Modal>
		);
	}

	// Android Logic

	const handleAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (event.type === 'dismissed') {
			onClose?.();
			return;
		}

		if (mode === 'datetime') {
			if (androidMode === 'date') {
				// Step 1: Date picked
				const newDate = selectedDate || value;
				// Maintain original time
				const mergedDate = new Date(newDate);
				mergedDate.setHours(value.getHours());
				mergedDate.setMinutes(value.getMinutes());

				setTempDate(mergedDate);
				setAndroidMode('time');
			} else {
				// Step 2: Time picked
				const timeSource = selectedDate || value;
				// Base date is either what we just picked (tempDate) or original value
				const finalDate = new Date(tempDate || value);

				finalDate.setHours(timeSource.getHours());
				finalDate.setMinutes(timeSource.getMinutes());

				onChange(event, finalDate);
				onClose?.();
			}
		} else {
			onChange(event, selectedDate);
			onClose?.();
		}
	};

	return (
		<DateTimePicker
			value={tempDate || value}
			onChange={handleAndroidChange}
			mode={androidMode === 'datetime' ? 'date' : androidMode} // datetime not supported directly on Android, mapped to date/time steps
			display={display === 'inline' ? 'spinner' : display}
			is24Hour={is24Hour}
			positiveButton={{ label: 'Xác nhận', textColor: '#40B5A6' }}
			negativeButton={{ label: 'Hủy', textColor: '#F00' }}
		/>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	overlayClick: {
		...StyleSheet.absoluteFillObject,
		zIndex: 0,
	},
	modalContent: {
		zIndex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingBottom: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 10,
	},
	header: {
		height: 48,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E6E8EB',
		backgroundColor: '#F9FAFB',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	footer: {
		height: 48,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#E6E8EB',
	},
	doneButton: {
		color: '#40B5A6',
		fontSize: 16,
		fontWeight: '600',
	},
	picker: {
		backgroundColor: '#fff',
		width: '100%',
		alignSelf: 'center',
	},
	timePickerContainer: {
		borderTopWidth: 1,
		borderTopColor: '#E6E8EB',
		marginTop: 10,
	},
});
