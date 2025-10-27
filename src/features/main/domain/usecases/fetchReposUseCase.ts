import { inject, injectable } from 'inversify';

import type GitRepoRepository from "../repos/gitRepoRepository";
import TYPES from '../../../../di/types';
import { Params } from "../types/requestParams";

@injectable()
export class FetchReposUseCase {
    constructor(
        @inject(TYPES.GitRepoRepository)
        private readonly repository: GitRepoRepository
    ) { }

    execute(params: Params) {
        return this.repository.fetchRepos(params.keyword, params.page);
    }
}