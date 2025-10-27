import { GetRepoDetailsUseCase } from '../../src/features/main/domain/usecases/getRepoDetailsUseCase';
import type GitRepoRepository from '../../src/features/main/domain/repos/gitRepoRepository';
import GitRepo from '../../src/features/main/domain/entities/gitRepo';

describe('GetRepoDetailsUseCase', () => {
    let mockRepo: jest.Mocked<GitRepoRepository>;
    let useCase: GetRepoDetailsUseCase;

    beforeEach(() => {
        mockRepo = {
            getRepoDetails: jest.fn(),
        } as unknown as jest.Mocked<GitRepoRepository>;

        useCase = new GetRepoDetailsUseCase(mockRepo);
    });

    it('call repository.getRepoDetails with correct params', async () => {
        const params: string = 'nwanvu93/github-explorer';

        await useCase.execute(params);

        expect(mockRepo.getRepoDetails).toHaveBeenCalledTimes(1);
        expect(mockRepo.getRepoDetails).toHaveBeenCalledWith('nwanvu93/github-explorer');
    });

    it('return data from repository', async () => {
        const dumpData = { id: 1, name: 'github-explorer' } as GitRepo;
        mockRepo.getRepoDetails.mockResolvedValue(dumpData);

        const result = await useCase.execute('');

        expect(result).toEqual({ id: 1, name: 'github-explorer' });
    });
});