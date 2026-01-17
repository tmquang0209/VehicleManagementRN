import { Switch } from 'react-native';

interface ThemedSwitchProps {
	value?: boolean;
	onValueChange?: (value: boolean) => void;
}

export function ThemedSwitch({ value, onValueChange }: ThemedSwitchProps) {
	return <Switch trackColor={{ false: '#767577', true: '#40B5A6' }} thumbColor={'#fff'} onValueChange={onValueChange} value={value} />;
}
