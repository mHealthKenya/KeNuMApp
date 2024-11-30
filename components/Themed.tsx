/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {Text as DefaultText, View as DefaultView, useColorScheme} from 'react-native';

import React from 'react';
import Colors from '../constants/Colors';

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
	bold?: boolean;
	italic?: boolean;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
	props: {light?: string; dark?: string},
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme() ?? 'light';
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

export function Text(props: TextProps) {
	const {style, bold, italic, ...otherProps} = props;
	// const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

	return <DefaultText style={[style, {fontFamily: bold ? 'bold' : italic ? 'italic' : 'normal'}]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const {style, lightColor, darkColor, ...otherProps} = props;
	const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

	return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}
