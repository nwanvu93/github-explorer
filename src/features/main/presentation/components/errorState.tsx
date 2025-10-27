import { StyleSheet, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

export type ErrorStateProps = {
    message: string | undefined | null
}
const ErrorState = ({ message, ...rest }: ErrorStateProps) => {
    const navigation = useNavigation();

    return <View style={styles.root} {...rest}>
        <MaterialIcons name='error-outline' color='#d24646' size={64} />
        <Text style={{ color: '#d24646', textAlign: 'center' }}>
            {message ?? 'Unknow Error'}
            {'\nTry again later.'}
        </Text>
        {
            navigation.canGoBack() &&
            < Button title='Go back' onPress={() => navigation.goBack()} />
        }

    </View>;
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    }
});
export default ErrorState;