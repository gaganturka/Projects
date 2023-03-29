import { useNavigate , Link} from "react-router-dom"


const NavBar = () => {
  const navigate = useNavigate()
    return(<>
    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
  <a href="" className="text-decoration-none d-block d-lg-none">
    <h1 className="m-0 display-5 font-weight-semi-bold">
      <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
    </h1>
  </a>
  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
    <div className="navbar-nav mr-auto py-0">
    <Link to="/" className="nav-item nav-link active">Home</Link>
      <Link to="/shop" className="nav-item nav-link">Shop</Link>
      <Link to="/shopDetails" className="nav-item nav-link">Shop Detail</Link>
      <Link to="/profile" className="nav-item nav-link">Profile</Link>
      <div className="nav-item dropdown">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Pages</a>
        <div className="dropdown-menu rounded-0 m-0">
        <Link to="/shoppingCart" className="dropdown-item">Shopping Cart</Link>
        <Link to="/checkout"className="dropdown-item">Checkout</Link>
        </div>
      </div>
      <Link to="/contact" className="nav-item nav-link">Contact</Link>
    </div>
    <div className="navbar-nav ml-auto py-0">
    <Link to="/log-in" className="nav-item nav-link">Login</Link>
    <Link to="/register" className="nav-item nav-link">Register</Link>
    </div>
  </div>
</nav>
    </>)
}

export default NavBar