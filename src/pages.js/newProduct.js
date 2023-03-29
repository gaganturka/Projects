import { useState } from "react";
import { httpPost } from "../Action";
import { showError, showSucess } from "../helper.js/helper";
import firebase from "firebase";
import { BackendUrl } from "../helper.js/helper";
import { auth } from "../helper.js/firebase";
import { useNavigate, Link } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [photo, setPhoto] = useState([]);
  const [data, setData] = useState({
    title: "",
    color: "",
    description: "",
    price: "",
    category: "",
    availableSizes: "",
    totalQuantity: "",
  });

  const [image, setImage] = useState(null);

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const formData = new FormData();

  const submit = async (e) => {
    e.preventDefault();
    formData.delete("productImage")
          formData.delete("featherImages")

    formData.append("title", data?.title);
    formData.append("color", data?.color);
    formData.append("description", data?.description);
    formData.append("price", data?.price);
    formData.append("category", data?.category);
    formData.append("availableSizes", data?.availableSizes);
    formData.append("totalQuantity", data?.totalQuantity);
    formData.append("productImage", image);
    for (let i = 0; i < photo.length; i++) {
      formData.append("featherImages", photo[i]);
    } 

 

    httpPost("products", formData)
      .then(function (response) {
        console.log(response);
        if (response.statusCode == 400) {
          showError(response.message);
        } else {
          showSucess(response.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const images = (e) => {
    setPhoto(e.target.files);
   
  };

  return (
    <>
      {console.log("qdasdasa", image)}
      <div className="container">
        <form className="form-horizontal" role="form">
          <h2>Add Product</h2>
          <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">
              Title
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="title"
                placeholder="Title"
                name="title"
                value={data.title}
                className="form-control"
                autoFocus
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="col-sm-3 control-label">
              Price
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                id="price"
                name="price"
                value={data.price}
                placeholder="Price"
                className="form-control"
                autoFocus
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="totalQuantity" className="col-sm-3 control-label">
              TotalQuantity
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                id="totalQuantity"
                name="totalQuantity"
                value={data.totalQuantity}
                placeholder="TotalQuantity"
                className="form-control"
                autoFocus
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availableSizes" className="col-sm-3 control-label">
              Available Sizes
            </label>
            <div className="col-sm-9">
              <select
                id="availableSizes"
                name="availableSizes"
                className="form-control"
                onChange={onChange}
              >
                <option value="">Please choose an option</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="color" className="col-sm-3 control-label">
              Color
            </label>
            <div className="col-sm-9">
              <select
                id="Color"
                name="color"
                className="form-control"
                onChange={onChange}
              >
                <option value="">Please choose an option</option>
                <option value="red">Red</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-sm-3 control-label">
              Description
            </label>
            <div className="col-sm-9">
              <textarea
                type="text"
                id="description"
                name="description"
                value={data.description}
                placeholder="Description"
                className="form-control"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="col-sm-3 control-label">
              category
            </label>
            <div className="col-sm-9">
              <select
                id="category"
                name="category"
                className="form-control"
                onChange={onChange}
              >
                <option value="">Please choose an option</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="children">Children</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="col-sm-3 control-label">
              Product Image
            </label>
            <div className="col-sm-9">
              <input
                type="file"
                id="productImage"
                name="productImage"
                // value={image?.name}
                placeholder="Product Image"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="col-sm-3 control-label">
              Feather Images
            </label>
            <div className="col-sm-9">
              <input
                type="file"
                id="productImage"
                multiple
                name="productImage"
                // value={image?.name}
                placeholder="Product Image"
                className="form-control"
                // onChange={(e) => setImage(e.target.files[0])}
                onChange={images}
              />
            </div>
          </div>

          {image ? (
            <>
              <div className="form-group">
                <button
                  className="col-sm-offset-3"
                  onClick={(e) => setImage("")}
                >
                  Delete image
                </button>
                <img
                  className="img-fluid"
                  src={`${URL.createObjectURL(image)}`}
                />
              </div>
            </>
          ) : (
            ""
          )}

          <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3"></div>
          </div>
          <button
            type="submit"
            onClick={submit}
            className="btn btn-primary btn-block"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Product;
