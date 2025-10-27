import React, { useCallback } from 'react';
import { Alert, Linking, Pressable, Text, StyleSheet, type ViewProps } from 'react-native';

export type UrlButtonProps = ViewProps & {
    url: string;
};

const UrlButton = ({ url, ...rest }: UrlButtonProps) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <Pressable onPress={handlePress}>
            <Text style={styles.linkText} {...rest}></Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    linkText: {
        color: 'blue',
        textDecorationLine: 'none',
        marginBottom: -4,
    },
});

export default UrlButton;