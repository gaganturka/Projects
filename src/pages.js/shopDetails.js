import { useEffect, useState } from "react";
import { json, Navigate, useNavigate, useParams } from "react-router-dom";
import { httpget } from "../Action";
import { showError, showSucess, images } from "../helper.js/helper";
import { BackendUrl } from "../helper.js/helper";
import ImageGallery from "react-image-gallery";

const ShopDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [gallery, setGallery] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  useEffect(() => {
    productData();
  }, []);

  const productData = async () => {
    httpget(`products/${id}`)
      .then(function (response) {
        console.log(response);
        if (response.statusCode == 400) {
          showError(response.message);
        } else {
          showSucess(response.message);
          setData(response.data);
          const original = images(response?.data?.featherImages);
          setGallery(original);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addTOCArt = () => {
    let product = 
      {
        _id: id,
        quantity: productQuantity,
      };
    let conc = true
    let getProducts = localStorage.getItem("product");

    if (getProducts == null) {
      product = JSON.stringify([product]);

      localStorage.setItem("product", product);
    } else {
      getProducts = JSON.parse(getProducts);
      for (let i = 0; i < getProducts.length; i++) {
        if (getProducts[i]._id == id) {
          getProducts[i] = product;
          conc = false;
          console.log(getProducts[i])
        }
      }
      if (conc) {
        getProducts =getProducts.concat(product);
      }
      console.log(conc);
      conc = true

      localStorage.setItem("product", JSON.stringify(getProducts));
    navigate('/shoppingCart')
    }
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner border">
                <div className="carousel-item carousel-item-next carousel-item-left">
                  <img
                    className="w-100 h-100"
                    src={`${BackendUrl}static/${data?.productImage}`}
                    alt="Imageee"
                  />
                </div>
                {/* <div className="carousel-item"> 
            <img className="w-100 h-100" src="/img/product-4.jpg" alt="Image"/>
          </div> */}
              </div>
            
            </div>
          </div>
          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{data?.title}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star-half-alt"></small>
                <small className="far fa-star"></small>
              </div>
              <small className="pt-1">(50 Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">{data?.price}</h3>
            <p className="mb-4">{data?.description}</p>
            <div className="d-flex mb-3">
              <p className="text-dark font-weight-medium mb-0 mr-3">
                Sizes :{" "}
                {data?.availableSizes?.length > 0
                  ? data?.availableSizes[0]
                  : ""}
              </p>
            </div>
            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">
                Colors : {data?.color}
              </p>
            </div>
            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">
                Product left in stock : <h1>{data?.totalQuantity}</h1>
              </p>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3">
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-minus"
                    onClick={() =>
                      setProductQuantity(
                        productQuantity > 1 ? +productQuantity - 1 : 1
                      )
                    }
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary text-center"
                  value={productQuantity}
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-plus"
                    onClick={() =>
                      setProductQuantity(
                        productQuantity > +data?.totalQuantity - 1
                          ? data?.totalQuantity
                          : +productQuantity + 1
                      )
                    }
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary px-3"
                onClick={() => addTOCArt()}
              >
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="row px-xl-5">
          <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
              <a
                className="nav-item nav-link active"
                data-toggle="tab"
                href="#tab-pane-1"
              >
                Description
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                Information
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-3"
              >
                Reviews (0)
              </a>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <h4 className="mb-3">Product Description</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <p>
                      Dolore magna est eirmod sanctus dolor, amet diam et eirmod
                      et ipsum. Amet dolore tempor consetetur sed lorem dolor
                      sit lorem tempor. Gubergren amet amet labore sadipscing
                      clita clita diam clita. Sea amet et sed ipsum lorem elitr
                      et, amet et labore voluptua sit rebum. Ea erat sed et diam
                      takimata sed justo. Magna takimata justo et amet magna et.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-2">
                    <h4 className="mb-3">Additional Information</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            {" "}
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.{" "}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            {" "}
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.{" "}
                          </li>
                          <li className="list-group-item px-0">
                            {" "}
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-3">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="mb-4">
                          1 review for "Colorful Stylish Shirt"
                        </h4>
                        <div className="media mb-4">
                          <img
                            src="/img/user.jpg"
                            alt="Image"
                            className="img-fluid mr-3 mt-1"
                          />
                          <div className="media-body">
                            <h6>
                              John Doe{" "}
                              <small>
                                {" "}
                                - <i>01 Jan 2045</i>
                              </small>
                            </h6>
                            <div className="text-primary mb-2">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star-half-alt"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <p>
                              Diam amet duo labore stet elitr ea clita ipsum,
                              tempor labore accusam ipsum et no at. Kasd diam
                              tempor rebum magna dolores sed sed eirmod ipsum.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h4 className="mb-4">Leave a review</h4>
                        <small>
                          Your email address will not be published. Required
                          fields are marked *
                        </small>
                        <div className="d-flex my-3">
                          <p className="mb-0 mr-2">Your Rating * :</p>
                          <div className="text-primary">
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                          </div>
                        </div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="message">Your Review *</label>
                            <textarea
                              id="message"
                              cols="30"
                              rows="5"
                              className="form-control"
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="name">Your Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Your Email *</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                            />
                          </div>
                          <div className="form-group mb-0">
                            <input
                              type="submit"
                              value="Leave Your Review"
                              className="btn btn-primary px-3"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <h2>Feather Images</h2>
                <ImageGallery items={gallery} />;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
