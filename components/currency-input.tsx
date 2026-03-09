import React from 'react';
import { ThemedTextInput, ThemedTextInputProps } from './text-input';

interface CurrencyInputProps extends Omit<ThemedTextInputProps, 'onChangeText' | 'value'> {
	value?: string | number;
	onChangeText?: (text: string) => void;
}

const formatCurrency = (value: string) => {
	if (!value) return '';
	// Remove non-numeric characters (keep only digits)
	const number = value.replace(/\D/g, '');
	// Format with thousands separator using dot
	return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCurrency = (value: string) => {
	// Remove dots to get the raw numeric string
	return value.replace(/\./g, '');
};

export function CurrencyInput({ value, onChangeText, ...props }: CurrencyInputProps) {
	// Format the incoming value for display
	const displayValue = value !== undefined && value !== null ? formatCurrency(String(value)) : '';

	const handleChangeText = (text: string) => {
		// Get raw value without formatting
		const rawValue = parseCurrency(text);
		onChangeText?.(rawValue);
	};

	return <ThemedTextInput {...props} value={displayValue} onChangeText={handleChangeText} keyboardType="numeric" />;
}
