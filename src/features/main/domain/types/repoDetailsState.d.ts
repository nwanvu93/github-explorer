import GitRepo from "../entities/gitRepo"
import { Status } from "./status"

export type RepoDetailsState = {
    item: GitRepo | null | undefined,
    status: Status,
    error: any | null | undefined,
}