import { injectable } from 'inversify';

import GitRepoRepository from "../../domain/repos/gitRepoRepository";
import Configs from '../../../../common/configs';
import { BaseResponse } from '../../../../common/network/response';
import { ApiError } from '../../../../common/network/apiError';
import { getStorage } from '../../../../common/storage/storage';
import buildUrl from '../../../../utils/url-builder';
import GitRepo from "../../domain/entities/gitRepo";
import GitRepoMapper from "../mapper/gitRepoMapper";

@injectable()
class GitRepoRepositoryImpl implements GitRepoRepository {

    async fetchRepos(keyword: string, page: number): Promise<BaseResponse<GitRepo[]>> {
        const params = {
            [Configs.PARAM.QUERY]: keyword,
            [Configs.PARAM.PAGE]: page,
            [Configs.PARAM.PAGE_SIZE]: Configs.PAGE_SIZE
        };

        const url = buildUrl(`${Configs.BASE_URL}/search/repositories`, params);

        try {
            // Check cached data from local storage
            const cachedJson = getStorage().getString(url);
            if (cachedJson) {
                const cachedItems = JSON.parse(cachedJson);
                const mapper = new GitRepoMapper();
                return BaseResponse.success(mapper.mapArray(cachedItems));
            }
        } catch (_) {
            // ignored this catch
        }

        try {
            const response = await fetch(url);

            if (response.status < 300) {
                const json = await response.json();
                const items = json.items || json;

                // Cache data to local storage
                getStorage().set(url, JSON.stringify(items));

                const mapper = new GitRepoMapper();
                return BaseResponse.success(mapper.mapArray(items));
            } else {
                return BaseResponse.failure(ApiError.unknown());
            }
        } catch (error) {
            if (error instanceof TypeError) {
                return BaseResponse.failure(ApiError.network());
            } else {
                return BaseResponse.failure(ApiError.unknown());
            }
        }
    }

    async getRepoDetails(path: string): Promise<BaseResponse<GitRepo>> {
        const url = `${Configs.BASE_URL}/repos/${path}`;
        try {
            // Check cached data from local storage
            const cachedJson = getStorage().getString(url);
            if (cachedJson) {
                const cachedObj = JSON.parse(cachedJson);
                const mapper = new GitRepoMapper();
                return BaseResponse.success(mapper.mapFrom(cachedObj));
            }
        } catch (_) {
            // ignored this catch
        }

        try {
            const response = await fetch(url);

            if (response.status < 300) {
                const json = await response.json();
                
                // Cache data to local storage
                getStorage().set(url, JSON.stringify(json));

                const mapper = new GitRepoMapper();
                return BaseResponse.success(mapper.mapFrom(json));
            } else {
                return BaseResponse.failure(
                    ApiError.unknown('Repository not found!')
                );
            }
        } catch (error) {
            if (error instanceof TypeError) {
                return BaseResponse.failure(ApiError.network());
            } else {
                return BaseResponse.failure(ApiError.unknown());
            }
        }
    }
}

export default GitRepoRepositoryImpl;