
// import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Authentication = () => {

    return(<>
    <div className="dashboard-block">
                <Outlet/>
    </div>
    </>)

}

export default Authentication