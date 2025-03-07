import React from "react"
import { NavLink, useLocation } from "react-router-dom";
const AsideAdmin = () => {
    const { pathname } = useLocation();
    return (
        <nav id="sidebarMenu" className="w-100 collapse d-lg-block sidebar collapse bg-white">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                    <NavLink to={"/admin/dashboard"} className={`list-group-item list-group-item-action py-2 ${pathname === "/admin" ? "active" : ""}`} data-mdb-ripple-init aria-current="true">
                        <i className="fas fa-tachometer-alt fa-fw me-3" /><span>Thống kê</span>
                    </NavLink>
                    <NavLink to={"/admin/account-manager"} className="list-group-item list-group-item-action py-2" data-mdb-ripple-init>
                        <i className="fas fa-chart-area fa-fw me-3" /><span>Quản lý tài khoản</span>
                    </NavLink>
                    <NavLink to={"/admin/room-manager"} className="list-group-item list-group-item-action py-2" data-mdb-ripple-init><i className="fas fa-lock fa-fw me-3" /><span>Quản lý phòng trọ</span></NavLink>
                    <NavLink to={"/admin/category-manager"} className="list-group-item list-group-item-action py-2" data-mdb-ripple-init>
                        <i className="fas fa-chart-area fa-fw me-3" /><span>Quản lý danh mục</span>
                    </NavLink>               
                </div>
            </div>
        </nav>
    )
}

export default AsideAdmin;