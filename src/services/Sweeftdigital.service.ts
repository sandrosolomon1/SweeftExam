import http from "../axios/http-common";
import {
    FullUser, UsersServerData
} from "../interfaces/User";

class SweeftdigitalService {
    getAllUsers(page: number, size: number): Promise<UsersServerData> {
        return http.get<UsersServerData>(`/user/${page}/${size}`);
    }

    getSingleUser(userId: number): Promise<FullUser> {
        return http.get<FullUser>(`/user/${userId}`);
    }

    getAllUsersFriends(userId: number, page: number, size: number): Promise<UsersServerData> {
        return http.get<UsersServerData>(`/user/${userId}/friends/${page}/${size}`);
    }
}

export default SweeftdigitalService;