import { inject, injectable } from 'inversify';

import type GitRepoRepository from "../repos/gitRepoRepository";
import TYPES from '../../../../di/types';

@injectable()
export class GetRepoDetailsUseCase {
    constructor(
        @inject(TYPES.GitRepoRepository)
        private readonly repository: GitRepoRepository
    ) { }

    execute(path: string) {
        return this.repository.getRepoDetails(path);
    }
}