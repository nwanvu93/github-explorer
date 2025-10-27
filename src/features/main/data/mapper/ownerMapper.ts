import BaseMapper from './baseMapper';
import Owner from "../../domain/entities/owner";

export default class OwnerMapper extends BaseMapper<any, Owner> {
    mapFrom(data: any): Owner {
        return {
            avatarUrl: data.avatar_url,
        }
    }
}