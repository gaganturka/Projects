const productModel = require("../model/productModel");
const validator = require("../helper/helper");
const aws = require("./aws");
const moment = require("moment");
const Joi = require("joi");
const { sendSucess, sendError } = require("../helper/helper");

const createProduct = async function (req, res) {
  try {
    const requestBody = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().alphanum().min(3).required().label("title"),
      description: Joi.string().min(15).required().label("description"),
      price: Joi.number().required(),
      availableSizes: Joi.string().required(),
      color: Joi.string().required(),
      category: Joi.string().required(),
      totalQuantity: Joi.number().required(),
    });

    const result = schema.validate(requestBody);

    if (result.error == null) {
      if (req.files?.productImage) {
        requestBody["productImage"] = `public/${req.files?.productImage[0]?.filename}`
      }
      let feather = [];
      for (let i = 0; i < req.files?.featherImages?.length; i++) {
        feather.push(`public/${req.files?.featherImages[i]?.filename}`);
      }
      requestBody["featherImages"] = feather;

      if (requestBody.isDeleted) {
        requestBody["isDeleted"] = false;
      }

      if (requestBody.deletedAt) {
        requestBody["deletedAt"] = null;
      }

      console.log("request", requestBody);

      const product = await productModel.create(requestBody);
      if (product) {
        return res
          .status(201)
          .send({ status: true, message: "Success", data: product });
      } else {                                                                                       
        sendError();
      }
    } else {
      sendError(result.error, res);
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getSpecificProduct = async function (req, res) { 
  try {
    let fillterQuery = {
      isDeleted: false,
    };

    let queryParams = req.query;
    console.log('fillterQuery', fillterQuery)

    if (validator.isValidObject(queryParams)) {

      console.log('fillterQuery', fillterQuery)

      const { size, name, priceGreaterThan, priceLessThan, priceSort } =
        queryParams;

      if (size) {
        if (validator.isValid(size)) {
          const convetSizeInUpperCase = size.toUpperCase();
          let array = convetSizeInUpperCase.split(",").map((x) => x.trim());
          for (let i = 0; i < array.length; i++) {
            if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i])) {
              return res.status(400).send({
                status: false,
                message:
                  'availableSizes should be among ["S", "XS","M","X", "L","XXL", "XL"]',
              });
            
          }
          fillterQuery["availableSizes"] = array;
        }
      }

      if (name) {
        if (!validator.isValid(name)) {
          return res
            .status(400)
            .send({ status: false, message: "plz enter a valid name" });
        }
        fillterQuery["title"] = {};
        fillterQuery["title"]["$regex"] = name;
      }

      if (priceGreaterThan) {
        if (!validator.isValid(priceGreaterThan)) {
          return res
            .status(400)
            .send({ status: false, message: "plz enter a valid name" });
        }
        if (!/^[1-9][0-9.]*$/.test(priceGreaterThan)) {
          return res
            .status(400)
            .send({ status: false, message: "Please Provide Valid Price" });
        }

        fillterQuery["price"] = {
          $gte: Number(priceGreaterThan),
        };  
      }
      if (priceLessThan) {
        if (!validator.isValid(priceLessThan)) {
          return res
            .status(400)
            .send({ status: false, message: "plz enter a valid name" });
        }
        if (!/^[1-9][0-9.]*$/.test(priceLessThan)) {
          return res
            .status(400)
            .send({ status: false, message: "Please Provide Valid Price" });
        }

        if (priceGreaterThan) {
          fillterQuery["price"] = {
            $gte: Number(priceGreaterThan),
            $lte: Number(priceLessThan),
          };
        } else {
          fillterQuery["price"] = {
            $lte: Number(priceLessThan),
          };
        }
      }


      if (priceSort) {
        if (!(priceSort == 1 || priceSort == -1)) {
          return res
            .status(400)
            .send({ status: false, message: "pricesort should be 1 or -1" });
        }
      }
      let filterProduct = await productModel
        .find(fillterQuery)
        .sort({ price: priceSort });
      if (filterProduct.length === 0) {
        return res.status(400).send({
          status: true,
          message: "No product found",
        });
      }
      return res.status(200).send({
        statu: true,
        message: "products details",
        data: filterProduct,
      });
    }}

    let filterProduct = await productModel.find(fillterQuery);

    if (filterProduct.length === 0) {
      return res.status(400).send({
        status: true,
        message: "No product found",
      });
    }
    return res.status(200).send({
      statu: true,
      message: "products details",
      data: filterProduct,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}


const getProductByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log("asddsadasdd", productId);
    const queryParam = req.query;

    if (!validator.isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: true, message: "Invalid productId" });
    }

    const getDataByProductId = await productModel.findById({ _id: productId });

    if (!getDataByProductId) {
      return res.status(404).send({
        status: true,
        message: `This ${productId} productId not exist `,
      });
    }

    if (getDataByProductId.isDeleted === true) {
      return res
        .status(404)
        .send({ status: true, message: "product is already deleted" });
    }

    return res.status(200).send({
      status: true,
      message: "product details",
      data: getDataByProductId,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const ProductForCart = async (req, res) => {
  try {
    const requestBody = req.body;
    console.log(requestBody);
    let response =[]
    for (let i = 0; i < requestBody.length; i++) {
      const getDataByProductId = await productModel.findOne({ _id: requestBody[i]?._id }).lean()
      getDataByProductId['totalQuantity'] = requestBody[i]?.quantity
      response.push(getDataByProductId)
    }
    let totalPrice = 0
 
    response.map((item) => {
      totalPrice = totalPrice +  ( +item.price * +item.totalQuantity)
      console.log('totalPrice', totalPrice)
    })
    
    return res.status(200).send({
        status: true,
        message: "product details",
        data: {response, totalPrice},
      });

  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const updatedProduct = async function (req, res) {
  try {
    const { productId } = req.params;

    const queryParam = req.query;
    if (!validator.queryParam(queryParam)) {
      return res.status(400).send({ status: false, message: "page not found" });
    }

    //check id correct
    if (!validator.isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: false, message: " NO such Product id are avilable " });
    }
    const product = await productModel.findById(productId);

    //RETURN error if no product found releated to this id
    if (!product) {
      return res
        .status(404)
        .send({ status: false, message: "Product not found" });
    }

    if (product.isDeleted == "true") {
      return res
        .status(404)
        .send({ status: false, message: "product is already deleted" });
    }

    const requestBody = req.body;
    const files = req.files;

    if (!validator.isValidObject(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter data for updation" });
    }

    const {
      title,
      description,
      style,
      price,
      currencyId,
      isFreeShipping,
      currencyFormat,
      installments,
    } = requestBody;
    let availableSizes = requestBody.availableSizes;

    if (description) {
      if (!validator.isValid(description)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter proper description" });
      }
    }

    if (style) {
      if (!validator.isValidString(style)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter proper style" });
      }
    }

    if (currencyId) {
      if (currencyId != "INR") {
        return res
          .status(400)
          .send({ status: false, message: "currencyId should be a INR " });
      }
    }

    if (currencyFormat) {
      if (currencyFormat != "₹") {
        return res
          .status(400)
          .send({ status: false, message: "currencyFormat shoulb be a ₹" });
      }
    }

    if (price) {
      if (!validator.isValid(price)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter proper price !!" });
      }

      if (!/^[1-9][0-9.]*$/.test(price)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter proper price" });
      }
    }

    if (isFreeShipping) {
      if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
        return res.status(400).send({
          status: false,
          message: "isFreeShipping should be a boolean value",
        });
      }
    }

    if (availableSizes) {
      if (validator.isValid(availableSizes)) {
        const convetSizeInUpperCase = availableSizes.toUpperCase();

        let array = convetSizeInUpperCase.split(",").map((x) => x.trim());
        for (let i = 0; i < array.length; i++) {
          if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i])) {
            return res.status(400).send({
              status: false,
              message:
                'availableSizes should be among ["S", "XS","M","X", "L","XXL", "XL"]',
            });
          }
        }
        requestBody["availableSizes"] = array;
      }
    }

    if (installments) {
      if (!/^[0-9]*$/.test(installments)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter proper installments" });
      }
    }

    if (title) {
      if (!validator.isValid(title)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter valid title !!" });
      }

      if (!validator.isValidString(title)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter valid title" });
      }

      const titleInUse = await productModel.findOne({ title: title });
      if (titleInUse) {
        return res.status(400).send({
          status: false,
          message: "title is used, enter different title",
        });
      }
    }

    //with the help of AWS we upplode the image
    if (files && files.length > 0) {
      const link = await aws.getNewProductImageLink(req, res);
      requestBody["productImage"] = link;
    }

    if (requestBody.isDeleted) {
      requestBody["isDeleted"] = false;
    }
    if (requestBody.deletedAt) {
      requestBody["deletedAt"] = null;
    }

    //Simply UPDATE THE PRODUCT (ALL THING IN PRODUCT ),PRODUCT IMAGE,
    const updateProduct = await productModel.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      requestBody,
      { new: true }
    );
    if (!updateProduct) {
      return res.status(200).send({
        status: false,
        message: "product not found Product was all Ready Deleted",
      });
    }

    return res.status(200).send({
      status: true,
      message: "updated product successfully",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const queryParam = req.query;
    if (!validator.queryParam(queryParam)) {
      return res.status(400).send({ status: false, message: "page not found" });
    }

    if (!validator.isValidObjectId(productId)) {
      return res.status(400).send({
        status: true,
        message: "Invalid productId",
      });
    }
    const deletedProductId = await productModel.findById({
      _id: productId,
    });

    if (!deletedProductId) {
      return res.status(404).send({
        status: true,
        message: `This ${productId} productId does not exist `,
      });
    }

    if (deletedProductId.isDeleted !== false) {
      return res.status(404).send({
        status: true,
        message: `This ${productId} productId is already Deleted `,
      });
    }

    await productModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: moment().format(),
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      Error: err.message,
    });
  }
};

module.exports.createProduct = createProduct;
module.exports.getSpecificProduct = getSpecificProduct;
module.exports.getProductByProductId = getProductByProductId;
module.exports.updatedProduct = updatedProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.ProductForCart = ProductForCart;
