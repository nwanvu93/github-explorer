import { FetchReposUseCase } from '../../src/features/main/domain/usecases/fetchReposUseCase';
import type GitRepoRepository from '../../src/features/main/domain/repos/gitRepoRepository';
import { Params } from '../../src/features/main/domain/types/requestParams';
import GitRepo from '../../src/features/main/domain/entities/gitRepo';

describe('FetchReposUseCase', () => {
    let mockRepo: jest.Mocked<GitRepoRepository>;
    let useCase: FetchReposUseCase;

    beforeEach(() => {
        mockRepo = {
            fetchRepos: jest.fn(),
        } as unknown as jest.Mocked<GitRepoRepository>;

        useCase = new FetchReposUseCase(mockRepo);
    });

    it('call repository.fetchRepos with correct params', async () => {
        const params: Params = { keyword: 'react-native', page: 1 };

        await useCase.execute(params);

        expect(mockRepo.fetchRepos).toHaveBeenCalledTimes(1);
        expect(mockRepo.fetchRepos).toHaveBeenCalledWith('react-native', 1);
    });

    it('return data from repository', async () => {
        const dumpData = [{ id: 1, name: 'react-native' } as GitRepo];
        mockRepo.fetchRepos.mockResolvedValue(dumpData);

        const params: Params = { keyword: '', page: 1 };
        const result = await useCase.execute(params);

        expect(result).toEqual([{ id: 1, name: 'react-native' }]);
    });
});