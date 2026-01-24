import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ThemedButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	icon?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function ThemedButton({ title, variant = 'primary', size = 'md', loading = false, icon, style, disabled, ...rest }: ThemedButtonProps) {
	const isDisabled = disabled || loading;

	const getBackgroundColor = () => {
		if (isDisabled && variant !== 'ghost' && variant !== 'outline') return '#E6E8EB';
		switch (variant) {
			case 'primary':
				return '#28a745';
			case 'secondary':
				return '#f8f9fa';
			case 'outline':
			case 'ghost':
				return 'transparent';
			case 'danger':
				return '#dc3545';
			default:
				return '#28a745';
		}
	};

	const getTextColor = () => {
		if (isDisabled) return '#9BA1A6';
		switch (variant) {
			case 'primary':
			case 'danger':
				return '#FFFFFF';
			case 'secondary':
				return '#212529';
			case 'outline':
			case 'ghost':
				return '#28a745';
			default:
				return '#FFFFFF';
		}
	};

	const getBorderColor = () => {
		if (isDisabled) return '#E6E8EB';
		if (variant === 'outline') return '#28a745';
		return 'transparent';
	};

	const getHeight = () => {
		switch (size) {
			case 'sm':
				return 36;
			case 'lg':
				return 56;
			case 'md':
			default:
				return 48;
		}
	};

	const getFontSize = () => {
		switch (size) {
			case 'sm':
				return 'small';
			case 'lg':
				return 'subtitle';
			case 'md':
			default:
				return 'defaultSemiBold';
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor: getBackgroundColor(),
					borderColor: getBorderColor(),
					height: getHeight(),
					borderWidth: variant === 'outline' ? 1 : 0,
				},
				style,
			]}
			disabled={isDisabled}
			activeOpacity={0.7}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color={getTextColor()} />
			) : (
				<>
					{icon}
					<ThemedText type={getFontSize() as any} style={[styles.text, { color: getTextColor(), marginLeft: icon ? 8 : 0 }]}>
						{title}
					</ThemedText>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		paddingHorizontal: 16,
	},
	text: {
		textAlign: 'center',
	},
});
