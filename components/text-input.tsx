import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from './themed-text';

export interface ThemedTextInputProps extends TextInputProps {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
	inputContainerStyle?: StyleProp<ViewStyle>;
	isPassword?: boolean;
}

export function ThemedTextInput({ label, error, leftIcon, rightIcon, containerStyle, inputContainerStyle, isPassword = false, secureTextEntry, style, ...props }: ThemedTextInputProps) {
	const theme = useColorScheme() ?? 'light';
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Theme colors
	const borderColor = error ? '#EF4444' : isFocused ? '#0056D2' : theme === 'light' ? '#E5E7EB' : '#2C2C2C';
	const backgroundColor = theme === 'light' ? '#FFFFFF' : '#1A1D1E';
	const textColor = theme === 'light' ? '#11181C' : '#ECEDEE';
	const placeholderColor = theme === 'light' ? '#9CA3AF' : '#687076';

	const handleFocus = (e: any) => {
		setIsFocused(true);
		props.onFocus?.(e);
	};

	const handleBlur = (e: any) => {
		setIsFocused(false);
		props.onBlur?.(e);
	};

	const showPasswordToggle = isPassword;
	const isSecure = isPassword && !isPasswordVisible;

	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<ThemedText type="defaultSemiBold" style={styles.label}>
					{label}
				</ThemedText>
			)}

			<View
				style={[
					styles.inputContainer,
					{
						borderColor,
						backgroundColor,
					},
					inputContainerStyle,
				]}
			>
				{leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

				<TextInput
					style={[styles.input, { color: textColor }, leftIcon ? { paddingLeft: 0 } : {}, style]}
					placeholderTextColor={placeholderColor}
					secureTextEntry={isSecure || secureTextEntry}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>

				{showPasswordToggle && (
					<TouchableOpacity style={styles.rightIconContainer} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
						<Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={theme === 'light' ? '#687076' : '#9BA1A6'} />
					</TouchableOpacity>
				)}

				{!showPasswordToggle && rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
			</View>

			{error && (
				<ThemedText style={styles.errorText} color="danger">
					{error}
				</ThemedText>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
		width: '100%',
	},
	label: {
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 48,
	},
	input: {
		flex: 1,
		height: '100%',
		fontSize: 16,
	},
	leftIconContainer: {
		marginRight: 8,
	},
	rightIconContainer: {
		marginLeft: 8,
		padding: 4,
	},
	errorText: {
		marginTop: 4,
		fontSize: 12,
	},
});
