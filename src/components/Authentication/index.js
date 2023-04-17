
// import Footer from "./footer";
import { Outlet } from "react-router-dom";
import Header from "../Auth/Header";

const Authentication = () => {
    

    return(<>
        <Header/>

    <div className="dashboard-block">

                <Outlet/>
    </div>
    </>)

}

export default Authentication