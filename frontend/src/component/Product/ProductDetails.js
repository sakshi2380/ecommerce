import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { toast } from "react-toastify";
import ReactStars from "react-star-rating-component";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { isAutheticated ,getLocalStorage} from "../../auth/helper";
import { Navigate, useParams } from 'react-router-dom';
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { addItemToCart , removeItemFromCart } from "../../helper/cartHelper"
import { createReview } from "../../auth/helper";



const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  // const { success, error: reviewError } = useSelector(
  //   (state) => state.newReview
  // );
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

console.log(product.Stock);
console.log(quantity,"nfurg");
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
  const qty = quantity + 1;
  
    setQuantity(qty);
  };
  console.log(quantity,"nvhdhhgyrg");

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    //addItemToCart(product, () => setRedirect(true));
    alert.success("Item Added To Cart");
  };
  const getARedirect = redirect => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };
  const review = {
    productId:product._id,
    ratings:rating,
    comment:comment

  } 
  const token = getLocalStorage("token");
  const {name,_id } = isAutheticated();
 
  console.log(name);
  const reviewSubmitHandler = () => {
    createReview(_id,name,token,review)
    .then((response) => {
      console.log(response, "123");
      if (response.success == true) {
        console.log("true");
        
         
      } 
     
    })
    .catch((err) => {
      toast.error("Something went wrong");
    });

    setOpen(false);
  };

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (reviewError) {
    //   alert.error(reviewError);
    //   dispatch(clearErrors());
    // }
   
    dispatch(getProductDetails(id));
  }, [dispatch,id, error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel  sx={{ height:500, width:500}}>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                   
                    <span>{quantity}</span>
                    {/* <input readOnly type="number" value={quantity} /> */}
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;