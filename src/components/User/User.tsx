import React, {useEffect, useState} from 'react';
import {useLocation, useParams, Link} from "react-router-dom";
import SweeftdigitalService from "../../services/Sweeftdigital.service";
import {FullUser} from "../../interfaces/User";
import Users from "../Users/Users";

const sds = new SweeftdigitalService();

const User = (): JSX.Element => {
    const {userid} = useParams();

    const location = useLocation();
    const [history,setHistory] = useState<Array<{ path: string, userName: string }>>([]);

    const [currentUser,setCurrentUser] = useState<FullUser | null>(null);

    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        if (typeof userid === "string") {
            sds.getSingleUser(parseInt(userid)).then(user => {
               setCurrentUser(user);

               setHistory(prevState => [...prevState, {
                   path: location.pathname,
                   userName: `${currentUser?.prefix}.${currentUser?.name} ${currentUser?.lastName}`
               }])
            });
        }
    },[userid]);

    return (
        <div className="user-page-wrapper">
            {loading && "Loading ..."}
            <div className="profile">
                <img src={`${currentUser?.imageUrl}/${currentUser?.id}`} alt={currentUser?.title}/>
                <div className="info br">
                    <div className="online">info</div>
                    <div className="id">
                        <div className="bold">{currentUser?.prefix+'.'+currentUser?.name+' '+currentUser?.lastName}</div>
                        <p>{currentUser?.title}</p>
                    </div>
                    <div className="contacts">
                        <ul>
                            <li>Email: {currentUser?.email}</li>
                            <li>Ip Address: {currentUser?.ip}</li>
                            <li>Job Area: {currentUser?.jobArea}</li>
                            <li>Job Type: {currentUser?.jobType}</li>
                        </ul>
                    </div>
                </div>
                <div className="address br">
                    <div className="online">address</div>
                    <div className="address-info">
                        <div className="bold">{currentUser?.company.name+' '+currentUser?.company.suffix}</div>
                        <ul>
                            <li>City: {currentUser?.address.city}</li>
                            <li>Country: {currentUser?.address.country}</li>
                            <li>State: {currentUser?.address.state}</li>
                            <li>Street Address: {currentUser?.address.streetAddress}</li>
                            <li>ZIP: {currentUser?.address.zipCode}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="route-history">
                {history.map((value,idx) => {
                    if(value.userName.includes("undefined")) return <></>;

                    return (
                        <>
                            <span> - </span>
                            <Link key={idx} to={value.path}>{value.userName}</Link>
                        </>
                    )
                })}
            </div>
            <div className="friends">
                <h2>Friends</h2>
                <div className="users">
                    <Users options={{allUsers: false, userId: parseInt(userid as string)}} />
                </div>
            </div>
        </div>
    )
}

export default User;
