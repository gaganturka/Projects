
const SideBar = () => {
    return(<>
    <div className="col-lg-3 d-none d-lg-block">
  <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical">
    <h6 className="m-0">Categories</h6>
    <i className="fa fa-angle-down text-dark"></i>
  </a>
  <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
    <div className="navbar-nav w-100 overflow-hidden" >
      <div className="nav-item dropdown">
        <a href="#" className="nav-link" data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i>
        </a>
        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
          <a href="" className="dropdown-item">Men's Dresses</a>
          <a href="" className="dropdown-item">Women's Dresses</a>
          <a href="" className="dropdown-item">Baby's Dresses</a>
        </div>
      </div>
      <a href="" className="nav-item nav-link">Shirts</a>
      <a href="" className="nav-item nav-link">Jeans</a>
      <a href="" className="nav-item nav-link">Swimwear</a>
      <a href="" className="nav-item nav-link">Sleepwear</a>
      <a href="" className="nav-item nav-link">Sportswear</a>
      <a href="" className="nav-item nav-link">Jumpsuits</a>
      <a href="" className="nav-item nav-link">Blazers</a>
      <a href="" className="nav-item nav-link">Jackets</a>
      <a href="" className="nav-item nav-link">Shoes</a>
    </div>
  </nav>
</div>
    </>)
}

export default SideBar