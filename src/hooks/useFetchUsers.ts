import {useEffect, useState} from "react";
import SweeftdigitalService from "../services/Sweeftdigital.service";
import {User, UsersServerData} from "../interfaces/User";

export interface fetchOptions {
    allUsers: boolean
    userId?: number
}

const sds = new SweeftdigitalService();

/** Custom hook for infinityScroll */
export default function useFetchUsers(page: number, size: number, options?: fetchOptions) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [friendsList, setFriendsList] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [userId,setUserId] = useState<number>();

    const updatePageState = async () => {
        try {
            let data: UsersServerData;

            setLoading(true);
            setError(false);

            if(options?.allUsers) {
                data = await sds.getAllUsers(page, size);

                setUsersList((prev) => [...prev, ...data.list]);
            } else {
                data = await sds.getAllUsersFriends(options?.userId as number, page, size);

                setUserId(prevUserId => {
                    if(prevUserId === options?.userId) {
                        setFriendsList((prev) => [...prev, ...data.list]);
                    } else {
                        setFriendsList(data.list);
                    }
                    return options?.userId;
                });
            }
            setHasMore(data.pagination.total !== data.pagination.pageSize);

            setLoading(false);
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        updatePageState();
    },[page,size,options?.userId])

    return {loading, error, usersList, friendsList, hasMore};
}