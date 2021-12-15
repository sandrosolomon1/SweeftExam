import React, {useState} from 'react';
import "./Users.module.scss";
import UserGridElement from "./UserGridElement/UserGridElement";
import useFetchUsers, {fetchOptions} from "../../hooks/useFetchUsers";
import {useNavigate} from "react-router-dom";
import InfinityScroll from "../../services/InfinityScroll.service";
import {User} from "../../interfaces/User";

interface Props {
    options?: fetchOptions
}

/** pagination default values */
const PAGE_SIZE = 10;
const PAGE = 1;

const Users = (props: Props): JSX.Element => {
    const navigate = useNavigate();
    let List: User[];

    const [pageSize,setPageSize] = useState<number>(PAGE_SIZE);
    const [page,setPage] = useState<number>(PAGE);

    const {loading, error, usersList, friendsList, hasMore} = useFetchUsers(page, pageSize, props.options);

    const lastUserRef = InfinityScroll(loading,hasMore,setPage);

    function NavigateToUserPage(userId: number | undefined): void {
        navigate(`/user/${userId}`);
    }

    if(props.options?.allUsers) {
        List = usersList;
    } else {
        List = friendsList;
    }

    return (
        <div className="users-grid">
            {List.map((user,idx) => {
                if(List.length-1 === idx) {
                    return (
                        <div key={idx} ref={lastUserRef} onClick={() => NavigateToUserPage(user.id)}>
                            <UserGridElement User={user} />
                        </div>
                    )
                }
                return (
                    <div key={idx} onClick={() => NavigateToUserPage(user.id)}>
                        <UserGridElement User={user} />
                    </div>
                )
            })}
            <div className="loading">{loading && "...loading"}</div>
            <div className="error">{error && "error"}</div>
        </div>
    );
};

export default Users;
