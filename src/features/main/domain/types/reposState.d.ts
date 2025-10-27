import GitRepo from "../entities/gitRepo"
import { Status } from "./status"

export type ReposState = {
    items: GitRepo[],
    status: Status,
    canLoadMore: boolean,
    error: any | undefined | null,
}