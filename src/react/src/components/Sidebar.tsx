import React from "react";
import './Sidebar.css';
import "boxicons/css/boxicons.min.css";

interface SidebarProp {
    onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProp> = ({ onSelect }) => {
    return (
        <div className="sidebar">
            <div className="top">
                <div className="logo">
                    <i className='bx bx-laptop'></i>
                    <span>PCStudio</span>
                </div>
            </div>

            <ul>
                <li onClick={() => onSelect("Customize")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">Customize</span>
                    </div>
                    <span className="tooltip">Customize</span>
                </li>

                <li onClick={() => onSelect("CPU")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">CPU</span>
                    </div>
                    <span className="tooltip">CPU</span>
                </li>

                <li onClick={() => onSelect("CPU_Cooler")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">CPU_Cooler</span>
                    </div>
                    <span className="tooltip">CPU_Cooler</span>
                </li>

                <li onClick={() => onSelect("Motherboard")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">Motherboard</span>
                    </div>
                    <span className="tooltip">Motherboard</span>
                </li>

                <li onClick={() => onSelect("Storage")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">Storage</span>
                    </div>
                    <span className="tooltip">Storage</span>
                </li>

                <li onClick={() => onSelect("GPU")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">GPU</span>
                    </div>
                    <span className="tooltip">GPU</span>
                </li>

                <li onClick={() => onSelect("RAM")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">RAM</span>
                    </div>
                    <span className="tooltip">RAM</span>
                </li>

                <li onClick={() => onSelect("PowerSupply")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">PowerSupply</span>
                    </div>
                    <span className="tooltip">PowerSupply</span>
                </li>
                <li onClick={() => onSelect("AdvSearch")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">AdvSearch</span>
                    </div>
                    <span className="tooltip">AdvSearch</span>
                </li>

                <li onClick={() => onSelect("PClist")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">PClist</span>
                    </div>
                    <span className="tooltip">PClist</span>
                </li>

                <li onClick={() => onSelect("Manufacturer")}>
                    <div className="menu-item">
                        <i className="bx bxs-component"></i>
                        <span className="nav-item">Manufacturer</span>
                    </div>
                    <span className="tooltip">Manufacturer</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;