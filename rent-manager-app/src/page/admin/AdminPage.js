import AsideAdmin from "./fagment/AsideAdmin";
import NavAdmin from "./fagment/NavAdmin";
import { Outlet } from "react-router-dom";
const AdminPage = (props) => {
    const { currentUser, onLogout } = props;
    return (
        <>
            <NavAdmin currentUser={currentUser} onLogout={onLogout} />
            <div className="row">
                <div className="col-2">
                    <AsideAdmin />
                </div>

                <div className="col-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminPage;