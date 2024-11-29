import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Topbar.css';
import "boxicons/css/boxicons.min.css";

interface TopbarProp {
    active: boolean; 
}

const Topbar: React.FC<TopbarProps> = ({ active }) => {
    const [userImage, setUserImage] = useState("../img/default.png");

    useEffect(() => {
        const storedImage = sessionStorage.getItem("user_image");
        if (storedImage) {
        setUserImage(storedImage);
        }
    }, []);

    return (
        <div className={`topbar ${active ? "active" : ""}`}>
            <div className="title">
                <span className="toptitle">PC Studio</span>
            </div>
            <div className="user">
                <img
                    id="userImage"
                    src={userImage}
                    alt="User Profile Picture"
                    className="userImage"
                />
            </div>
        </div>
    );
};

export default Topbar;