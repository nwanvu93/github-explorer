import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';

import GitRepoRepository from '../features/main/domain/repos/gitRepoRepository';
import GitRepoRepositoryImpl from '../features/main/data/network/gitRepoRepositoryImpl';
import { FetchReposUseCase, GetRepoDetailsUseCase } from '../features/main/domain/usecases';

import GitRepoViewModel from '../features/main/presentation/viewmodels/reposViewModel';
import RepoDetailsViewModel from '../features/main/presentation/viewmodels/repoDetailsViewModel';

let _container: Container | null = null;

export const getContainer = (): Container => {
    if (!_container) {
        _container = new Container({ defaultScope: 'Singleton' });

        // Bind Repositories
        _container.bind<GitRepoRepository>(TYPES.GitRepoRepository).to(GitRepoRepositoryImpl);

        // Bind UseCases
        _container.bind<FetchReposUseCase>(TYPES.FetchReposUseCase).to(FetchReposUseCase);
        _container.bind<GetRepoDetailsUseCase>(TYPES.GetRepoDetailsUseCase).to(GetRepoDetailsUseCase);

        // Bind ViewModels
        _container.bind<GitRepoViewModel>(TYPES.GitRepoViewModel).to(GitRepoViewModel);
        _container.bind<RepoDetailsViewModel>(TYPES.RepoDetailsViewModel).to(RepoDetailsViewModel);

    }
    return _container;
};