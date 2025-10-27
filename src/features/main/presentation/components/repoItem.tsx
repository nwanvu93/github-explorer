import { StyleSheet, Image, TouchableOpacity, Text, View, type TouchableOpacityProps } from 'react-native';
import { CachedImage } from '@georstat/react-native-image-cache';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import GitRepo from '../../domain/entities/gitRepo';

type RepoItemProps = TouchableOpacityProps & {
    data: GitRepo;
};
const RepoItem = ({ data, ...rest }: RepoItemProps) => {
    return <TouchableOpacity style={styles.root} {...rest}>
        <CachedImage
            style={styles.avatar}
            source={data.owner.avatarUrl}
        />
        <View style={styles.content}>
            <Text
                style={[styles.contentTitle, styles.contentText]}
                numberOfLines={1}>
                {data.name}
            </Text>
            <Text
                style={styles.contentText}
                numberOfLines={2}>
                {data.description}
            </Text>
            <View style={styles.stars}>
                <MaterialIcons name='star' color='orange' size={18} />
                <Text>{data.stars}</Text>
            </View>
        </View>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        marginEnd: 20
    },
    content: {
        flex: 1,
        gap: 2
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    contentText: {
        flex: 1,
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    }
});
export default RepoItem;