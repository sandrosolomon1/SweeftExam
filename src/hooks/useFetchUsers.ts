import {useEffect, useState} from "react";
import SweeftdigitalService from "../services/Sweeftdigital.service";
import {User, UsersServerData} from "../interfaces/User";

export interface fetchUsersOptions {
    id: number
}

const sds = new SweeftdigitalService();

/** Custom hook for infinityScroll */
export default function useFetchUsers(page: number, size: number, options: fetchUsersOptions | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const updatePageState = async () => {
        try {
            let data: UsersServerData;

            setLoading(true);
            setError(false);

            if(options) {
                data = await sds.getAllUsersFriends(options.id, page, size);

                console.log(`userId of ${options.id} friends: `, data);
            } else {
                data = await sds.getAllUsers(page, size);

                console.log("Allusers: ", data);
            }

            setUsersList((prev) => [...prev, ...data.list]);

            setHasMore(data.pagination.total !== data.pagination.pageSize);

            setLoading(false);
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        updatePageState();
    },[page,size])

    return {loading, error, usersList, hasMore};
}