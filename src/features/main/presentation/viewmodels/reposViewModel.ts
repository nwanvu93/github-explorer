import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { inject, injectable } from "inversify";

import { FetchReposUseCase } from '../../domain/usecases';
import { Params } from '../../domain/types/requestParams';
import { ReposState } from '../../domain/types';
import Configs from '../../../../common/configs';
import TYPES from '../../../../di/types';

@injectable()
class GitRepoViewModel {
    constructor(
        @inject(TYPES.FetchReposUseCase) private _fetchReposUC: FetchReposUseCase
    ) { }

    // Current page for fetching data
    private currentPage: number = 1;

    // Async thunk for fetching repos
    private fetchReposThunk = createAsyncThunk(
        'repo/fetchRepos',
        async (params: Params, thunkAPI) => {
            const res = await this._fetchReposUC.execute(params);
            if (res.isSuccess) {
                return res.data;
            } else {
                thunkAPI.abort(res.error?.message);
            }
        }
    );

    // Define slice for repos state
    private reposSlice = createSlice({
        name: 'repos',
        initialState: {
            items: [],
            status: 'idle',
            canLoadMore: true,
            error: null
        } as ReposState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(this.fetchReposThunk.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(this.fetchReposThunk.fulfilled, (state, action) => {
                    state.status = 'success';
                    const newData = action.payload ?? [];
                    if (this.currentPage == 1) {
                        state.items = newData;
                    } else {
                        state.items = [...state.items, ...newData];
                    }
                    state.canLoadMore = newData.length == Configs.PAGE_SIZE;
                })
                .addCase(this.fetchReposThunk.rejected, (state, action) => {
                    state.status = 'error';
                    state.canLoadMore = false;
                    state.error = action.error;
                });
        },
    });

    // Create Redux store
    private store = configureStore({
        reducer: {
            reposReducer: this.reposSlice.reducer,
        },
    });

    // Get the current state
    getState() {
        return this.store.getState().reposReducer;
    }

    // Dispatch action to load repos
    fetchRepos(keyword: string) {
        this.currentPage = 1;
        this.fetch(keyword);
    }

    // Dispatch action to load more repos
    fetchMoreRepos(keyword: string) {
        this.currentPage++;
        this.fetch(keyword);
    }

    private fetch(keyword: string) {
        const params: Params = { keyword: keyword, page: this.currentPage };
        this.store.dispatch(this.fetchReposThunk(params));
    }

    // Subscribe to state changes
    subscribe(callback: any) {
        return this.store.subscribe(callback);
    }
}

export default GitRepoViewModel;