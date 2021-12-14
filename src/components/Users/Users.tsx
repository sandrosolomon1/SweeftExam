import React, {useState} from 'react';
import "./Users.module.scss";
import UserGridElement from "./UserGridElement/UserGridElement";
import useFetchUsers, {fetchUsersOptions} from "../../hooks/useFetchUsers";
import {useNavigate} from "react-router-dom";
import InfinityScroll from "../../services/InfinityScroll.service";

interface Props {
    options?: fetchUsersOptions
}

/** page_size pagination default value */
const PAGE_SIZE = 20;

const Users = (props: Props) => {
    const navigate = useNavigate();

    const [pageSize,setPageSize] = useState<number>(PAGE_SIZE);

    const {loading, error, usersList, hasMore} = useFetchUsers(0, pageSize, props.options);

    const lastUserRef = InfinityScroll(loading,hasMore,setPageSize);

    function NavigateToUserPage(userId: number | undefined): void {
        navigate(`/user/${userId}`);
    }

    return (
        <div className="users-grid">
            {usersList.map((user,idx) => {
                if(usersList.length-1 === idx) {
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
