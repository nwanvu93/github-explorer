import BaseMapper from './baseMapper';
import OwnerMapper from './ownerMapper';
import GitRepo from "../../domain/entities/gitRepo";


export default class GitRepoMapper extends BaseMapper<any, GitRepo> {
    mapFrom(data: any): GitRepo {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
            link: data.html_url,
            language: data.language,
            repoPath: data.full_name,
            owner: new OwnerMapper().mapFrom(data.owner),
        }
    }
}