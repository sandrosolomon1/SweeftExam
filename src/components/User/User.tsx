import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SweeftdigitalService from "../../services/Sweeftdigital.service";
import {FullUser} from "../../interfaces/User";
import Users from "../Users/Users";

const sds = new SweeftdigitalService();

const User = (): JSX.Element => {
    const {userid} = useParams();

    const [currentUser,setCurrentUser] = useState<FullUser | null>(null);

    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        setLoading(true);
        if (typeof userid === "string") {
            sds.getSingleUser(parseInt(userid)).then(user => {
               setCurrentUser(user);
               setLoading(false);
            });
        }
    },[userid])

    return (
        <div className="user-page-wrapper">
            {loading && "Loading ..."}
            <div className="profile">
                <img src={currentUser?.imageUrl} alt={currentUser?.title}/>
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
            <div className="route-history"></div>
            <div className="friends">
                <h2>Friends</h2>
                <div className="users">
                    <Users options={{id: parseInt(userid as string)}} />
                </div>
            </div>
        </div>
    )
}

export default User;
