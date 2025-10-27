import Owner from "./owner";

class GitRepo {
    id: number;
    name: string;
    description: string;
    stars: number;
    forks: number;
    issues: number;
    link: string;
    language: string;
    repoPath: string;
    owner: Owner;

    constructor(
        id: number,
        name: string,
        description: string,
        stars: number,
        forks: number,
        issues: number,
        link: string,
        language: string,
        repoPath: string,
        owner: Owner
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stars = stars;
        this.forks = forks;
        this.issues = issues;
        this.link = link;
        this.language = language;
        this.repoPath = repoPath;
        this.owner = owner;
    }
}
export default GitRepo;