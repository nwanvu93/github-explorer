import buildUrl from '../../src/utils/url-builder';

describe('Url Builder', () => {
    it('return full url after build', async () => {
        const testData = { q: 'github-explorer', page: 3 };
        const result = buildUrl('https://api.github.com', testData);

        expect(result).toEqual('https://api.github.com?q=github-explorer&page=3');
    });
});