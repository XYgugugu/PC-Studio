import React from "react";

const Topbar: React.FC = () => {
    const userImage = sessionStorage.getItem('user_image') || '../../img/user_image_default.png';

    return (
        <div className="title">
            <span className="toptitle">
                PC Studio
            </span>
            <div className="user">
                <img src={userImage} alt="User Profile" className="userImage"/>
            </div>
        </div>
    );
};

export default Topbar;