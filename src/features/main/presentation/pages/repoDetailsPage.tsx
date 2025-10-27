import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Image, Text, View } from 'react-native';
import type { StaticScreenProps } from '@react-navigation/native';
import { CachedImage } from '@georstat/react-native-image-cache';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import ErrorState from '../components/errorState';
import UrlButton from '../components/urlButton';
import RepoDetailsViewModel from '../viewmodels/repoDetailsViewModel';
import { getContainer } from '../../../../di/container';
import TYPES from '../../../../di/types';

export type RepoDetailsPageProps = StaticScreenProps<{
    repoPath: string;
}> & {
    navigation: any;
};

const vm = getContainer().get<RepoDetailsViewModel>(TYPES.RepoDetailsViewModel);

const RepoDetailsPage = ({ route }: RepoDetailsPageProps) => {
    const { repoPath } = route.params;
    const [repoState, setRepoState] = useState(vm.getState());

    useEffect(() => {
        // First load Repo details when the component mounts
        vm.getDetails(repoPath);

        // Subscribe to updates from the ViewModel
        const unsubscribe = vm.subscribe(() => {
            setRepoState(vm.getState());
        });

        return () => {
            unsubscribe(); // Clean up the subscription on component unmount
        };
    }, [repoPath]);

    if (repoState.status === 'idle' || repoState.status === 'loading') {
        return <View style={styles.states}>
            <ActivityIndicator />
            <Text>Loading!</Text>
        </View>;
    }

    if (repoState.status === 'error') {
        return <ErrorState message={repoState.error?.message} />;
    }

    return (
        <View style={styles.root}>
            <CachedImage
                style={styles.avatar}
                imageStyle={{borderRadius: 64}}
                source={repoState.item?.owner.avatarUrl ?? ''}
            />
            <Text style={styles.repoName}>{repoState.item?.repoPath}</Text>
            <View style={styles.repoInfoRow}>
                <MaterialIcons name='star' color='orange' size={20} />
                <Text>Stars: {repoState.item?.stars}</Text>
            </View>
            <View style={styles.repoInfoRow}>
                <MaterialIcons name='fork-right' size={20} />
                <Text>Forks: {repoState.item?.forks}</Text>
            </View>
            <View style={styles.repoInfoRow}>
                <MaterialIcons name='bug-report' size={20} />
                <Text>Issues: {repoState.item?.issues}</Text>
            </View>
            <View style={styles.repoInfoRow}>
                <MaterialIcons name='link' size={20} />
                <Text>Link: <UrlButton url={repoState.item?.link ?? ''}>{repoState.item?.link}</UrlButton></Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Language:</Text>
            <Text style={styles.repoInfoRow}>{repoState.item?.language ?? 'N/A'}</Text>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Description:</Text>
            <Text style={styles.repoInfoRow}>{repoState.item?.description}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20
    },
    states: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    },
    avatar: {
        width: 128,
        height: 128,
    },
    repoName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    repoInfoRow: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        marginTop: 5,
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 20
    },
    sectionTitle: {
        fontWeight: 'bold'
    }
});
export default RepoDetailsPage;