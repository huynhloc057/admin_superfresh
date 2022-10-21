import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
