import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { inject } from 'inversify';

import { GetRepoDetailsUseCase } from '../../domain/usecases';
import { RepoDetailsState } from '../../domain/types';
import TYPES from '../../../../di/types';

class RepoDetailsViewModel {
    constructor(
        @inject(TYPES.GetRepoDetailsUseCase) private _getRepoDetailsUC: GetRepoDetailsUseCase
    ) { }

    // Async thunk for fetching repo details
    private fetchDetailsThunk = createAsyncThunk(
        'repo/fetchRepoDetails',
        async (path: string, thunkAPI) => {
            const res = await this._getRepoDetailsUC.execute(path);
            if (res.isSuccess) {
                return res.data;
            } else {
                thunkAPI.abort(res.error?.message);
            }
        }
    );

    // Define slice for repo details state
    private slice = createSlice({
        name: 'repo-details',
        initialState: {
            item: null,
            status: 'idle',
            error: null
        } as RepoDetailsState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(this.fetchDetailsThunk.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(this.fetchDetailsThunk.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.item = action.payload;
                })
                .addCase(this.fetchDetailsThunk.rejected, (state, action) => {
                    state.status = 'error';
                    state.error = action.error;
                });
        },
    });

    // Create Redux store
    private store = configureStore({
        reducer: {
            detailsReducer: this.slice.reducer,
        },
    });

    // Get the current state
    getState() {
        return this.store.getState().detailsReducer;
    }

    // Dispatch action to load repo details
    getDetails(path: string) {
        this.store.dispatch(this.fetchDetailsThunk(path));
    }

    // Subscribe to state changes
    subscribe(callback: any) {
        return this.store.subscribe(callback);
    }
}

export default RepoDetailsViewModel;