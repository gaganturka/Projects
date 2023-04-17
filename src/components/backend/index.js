import Header from "./header";
import SideBar from "./sideBar";
// import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Backend = () => {

    return(<>
    <div className="dashboard-block">
        <Header/>
        <div className="dashboard-wrapper">
            <div className="dashboardsidebar">
            <SideBar/>
            </div>
            <div className="main-body">
                <Outlet/>
                
            </div>

        </div>
        {/* <div className="main-footer">
                    <Footer/>
                </div> */}
    </div>
    </>)

}

export default Backend