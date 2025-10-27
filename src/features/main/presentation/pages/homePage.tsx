import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    TextInput,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getContainer } from '../../../../di/container';
import GitRepoViewModel from '../viewmodels/reposViewModel';
import type { RepoDetailsPageProps } from './repoDetailsPage';
import ErrorState from '../components/errorState';
import RepoItem from '../components/repoItem';
import TYPES from '../../../../di/types';


type RootStackParamList = {
    Home: undefined;
    Details: RepoDetailsPageProps['route']['params'];
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

const vm = getContainer().get<GitRepoViewModel>(TYPES.GitRepoViewModel);

const HomePage = () => {
    const [keyword, setKeyword] = useState('');

    const [reposState, setReposState] = useState(vm.getState());

    useEffect(() => {
        // Subscribe to updates from the ViewModel
        const unsubscribe = vm.subscribe(() => {
            setReposState(vm.getState());
        });

        return () => {
            unsubscribe(); // Clean up the subscription on component unmount
        };
    }, []);

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const openDetails = (path: string) => navigation.navigate(
        'Details',
        { repoPath: path }
    );

    const doLoadMore = useCallback(() => {
        if (keyword.length == 0) return;
        if (reposState.status === 'success' && reposState.canLoadMore) {
            vm.fetchMoreRepos(keyword);
        }
    }, [keyword, reposState]);

    const doSearch = useCallback(() => {
        if (keyword.length == 0) return;
        vm.fetchRepos(keyword);
    }, [keyword]);

    const renderFooterList = useMemo(() => {
        var element = <View />;
        if (reposState.status === 'success' && reposState.items.length == 0) {
            element = <Text>No repository matches with keyword '{keyword}'</Text>
        } else if (
            (reposState.status === 'loading' || reposState.status === 'success') &&
            reposState.canLoadMore
        ) {
            element = <ActivityIndicator />;
        } else if (!reposState.canLoadMore) {
            element = <Text>You have seen all!</Text>
        }

        return <View style={styles.footer}>{element}</View>;
    }, [reposState]);

    return (
        <View style={styles.root}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter keyword to search repositories"
                    onChangeText={setKeyword}
                    onEndEditing={doSearch}
                    clearButtonMode='while-editing'
                    value={keyword}
                />
                <Button title="Search" onPress={doSearch} />
            </View>
            {
                reposState.status !== 'error' &&
                <FlatList
                    style={styles.list}
                    data={reposState.items}
                    renderItem={({ item }) => <RepoItem
                        data={item}
                        onPress={(_) => openDetails(item.repoPath)}
                    />}
                    keyExtractor={item => `${item.id}`}
                    refreshControl={
                        <RefreshControl
                            refreshing={reposState.status === 'loading'}
                            onRefresh={doSearch}
                        />
                    }
                    ItemSeparatorComponent={({ highlighted }) => (
                        <View
                            style={[styles.listDivider, highlighted && { marginLeft: 0 }]}
                        />
                    )}
                    onEndReachedThreshold={0.3}
                    onEndReached={doLoadMore}
                    ListFooterComponent={renderFooterList}
                />
            }

            {
                reposState.status === 'error' &&
                <ErrorState message={reposState.error?.message} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingStart: 16,
        paddingEnd: 16,
        marginEnd: 20
    },
    list: {
        width: '100%',
        flex: 1,
    },
    listDivider: {
        width: '100%',
        height: 2,
        color: 'gray',
    },
    footer: {
        alignItems: "center",
        padding: 10,
        marginBottom: 50,
    }
});

export default HomePage;