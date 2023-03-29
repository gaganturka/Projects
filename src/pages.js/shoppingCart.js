import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { httpPost } from "../Action";
import { showError, showSucess } from "../helper.js/helper";
import { BackendUrl } from "../helper.js/helper";
const ShoppingCart = () => {
  const navigate = useNavigate()
  const [dataOfProducts, setDataOfProducts] = useState([]);
  const [totalPrice, setTotalPrice] =useState(0)

  useEffect(() => {
    getDataFromLocal();
  }, [])



  const getDataFromLocal = () => {
   let data = JSON.parse(localStorage.getItem("product"));
    httpPost(`products/cart`, data)
      .then(function (response) {
        console.log(response);
        if (response.statusCode == 400) {
          showError(response.message);
        } else {
          showSucess(response.message);
          setDataOfProducts(response.data.response);
          setTotalPrice(response.data.totalPrice)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeProduct = (e) => {
    console.log(e);
    let data = JSON.parse(localStorage.getItem("product"));
    for(let i=0; i<data.length; i++){
        if(data[i]?._id == e){
            data.splice(i,1)
            localStorage.setItem("product", JSON.stringify(data));
           
        }
        getDataFromLocal()
    }

  }
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
            {dataOfProducts.map((item, i)=> <>
               <tr>
                  <td className="align-middle">
                    <img   src={`${BackendUrl}static/${item?.productImage}`} alt="" /> {item?.title}
                  </td>
                  {console.log('dsad',item?.price)}
                  <td className="align-middle">{item?.price}</td>
                  <td className="align-middle">
                    <div className="input-group quantity mx-auto">
                      <div className="input-group-btn">
                        {/* <button className="btn btn-sm btn-primary btn-minus">
                          <i className="fa fa-minus"></i>
                        </button> */}
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-sm bg-secondary text-center"
                        value={item?.totalQuantity}
                      />
                      <div className="input-group-btn">
                        {/* <button className="btn btn-sm btn-primary btn-plus">
                          <i className="fa fa-plus"></i>
                        </button> */}
                      </div>
                    </div>
                  </td>
{/* {setPrice(+item?.price * +item?.totalQuantity)} */}
                  <td className="align-middle">{+item?.price * +item?.totalQuantity}</td>
                  <td className="align-middle">
                    <button className="btn btn-sm btn-primary" onClick={() => removeProduct(item._id)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr> </>)} 
             
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-5" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">{totalPrice}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">00.00</h6>
                </div>
              </div>
              {console.log('last element',dataOfProducts[dataOfProducts.length -1]?.totalPrice)}
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">{totalPrice}/-</h5>
                </div>
                <button className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
