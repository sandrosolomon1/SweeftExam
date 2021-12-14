import React from 'react';
import {User} from "../../../interfaces/User";

interface Props {
    User: User
}

const UserGridElement = (props: Props) => {
    const {User} = props;

    return (
      <div className="user-grid-element">
          <img src={User.imageUrl} alt={User.title}/>
          <div className="info">
              <div className="bold">{User.prefix + User.name}</div>
              <p>{User.title}r</p>
          </div>
      </div>
    )
};

export default UserGridElement;
