import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import UserListPage from "./pages/UserListPage";
import CategoryListPage from "./pages/CategogyListPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import CategoryAddPage from "./pages/CategoryAddPage";
import ProductAddPage from "./pages/ProductAddPage";
import UserListDisabledPage from "./pages/UserListDisabledPage";
import PrivateRouter from "./HOC/PrivateRouter";
import ProductListDisablePage from "./pages/ProductListDisablePage";
import CategogyListDisablePage from "./pages/CategogyListDisablePage";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import Statistic from "./pages/RevenuePage";

function App() {
  return (
    <Router>
      <Header></Header>
      <main>
        <Container className="py-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRouter />}>
              <Route
                path="/admin/categorylist"
                element={<CategoryListPage />}
              ></Route>

              <Route
                path="/admin/categorydisablelist"
                element={<CategogyListDisablePage />}
              ></Route>

              <Route
                path="/admin/category/add"
                element={<CategoryAddPage />}
              ></Route>
              <Route
                path="/admin/category/:_id/edit"
                element={<CategoryEditPage />}
              ></Route>
              <Route
                path="/admin/productlist"
                element={<ProductListPage />}
              ></Route>
              <Route
                path="/admin/product/add"
                element={<ProductAddPage />}
              ></Route>
              <Route
                path="/admin/product/disable"
                element={<ProductListDisablePage />}
              ></Route>
              <Route
                path="/admin/product/:slug/edit"
                element={<ProductEditPage />}
              ></Route>
              <Route path="/admin/userlist" element={<UserListPage />}></Route>
              <Route
                path="/admin/disabledusers"
                element={<UserListDisabledPage />}
              ></Route>
              <Route path="/admin/orderlist" element={<Order />}></Route>
              <Route path="/admin/revenue" element={<Statistic />}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
