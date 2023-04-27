import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
 
} from "./reducers/productReducer"
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
    getAllUsers,
  } from "./reducers/userReducer";
  import { cartReducer } from "./reducers/cartReducer";
import { 
  newOrderReducer ,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducer";
const reducer = combineReducers({
    products:productsReducer,
    product: productReducer,
    productDetails:productDetailsReducer,
    newReview: newReviewReducer,
    newProduct:newProductReducer,
    productReviews: productReviewsReducer,
  review: reviewReducer,
  


    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,
    order:orderReducer,
    allOrders:allOrdersReducer,


    
    cart: cartReducer,


    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  
 
  
 
  
})
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
    
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
    );
    
  
  export default store;