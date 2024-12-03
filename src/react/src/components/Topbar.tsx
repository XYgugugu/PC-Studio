import React, { useEffect, useState } from "react";
import './Topbar.css';
import "boxicons/css/boxicons.min.css";
import defaultImage from "../img/default.png";

interface TopbarProp {
    active: boolean; 
}

const Topbar: React.FC<TopbarProp> = ({ active }) => {
    const [userImage, setUserImage] = useState(defaultImage);

    useEffect(() => {
        const storedImage = sessionStorage.getItem("user_image");
        if (storedImage) {
            setUserImage(storedImage);
        } else {
            setUserImage(defaultImage);
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
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImage; // Set to default image if loading fails
                }}
            />
            </div>
        </div>
    );
};

export default Topbar;