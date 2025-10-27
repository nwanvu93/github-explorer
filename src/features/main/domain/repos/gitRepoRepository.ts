import { BaseResponse } from "../../../../common/network/response";
import GitRepo from "../entities/gitRepo";

interface GitRepoRepository {
    fetchRepos(keyword: string, page: number): Promise<BaseResponse<GitRepo[]>>
    getRepoDetails(path: string): Promise<BaseResponse<GitRepo>>
}

export default GitRepoRepository;