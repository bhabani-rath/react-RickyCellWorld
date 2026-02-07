import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { ProductProvider } from "./context/ProductContext";
import { InventoryProvider } from "./context/InventoryContext";
import { ShowcaseProvider } from "./context/ShowcaseContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Public Page Components
import Hero from "./pages/publicpage/Hero";
import BankOffersBar from "./pages/publicpage/BankOffersBar";
import Categories from "./pages/publicpage/Categories";
import FeaturedProducts from "./pages/publicpage/FeaturedProducts";
import BrandShowcase from "./pages/publicpage/BrandShowcase";
import TrustBadges from "./pages/publicpage/TrustBadges";
import CategoryListingPage from "./pages/publicpage/CategoryListingPage";
import ProductDetailPage from "./pages/publicpage/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import ShowcasePage from "./pages/admin/ShowcasePage";
import InventoryOverviewPage from "./pages/Inventory/InventoryOverviewPage";
import StockTransferPage from "./pages/Inventory/StockTransferPage";

// Superadmin Components
import SuperadminLayout from "./components/superadmin/SuperadminLayout";
import RoleManagementPage from "./components/superadmin/RoleManagement/RoleManagementPage";
import AddRolePage from "./components/superadmin/RoleManagement/AddRolePage";
import UserManagementPage from "./components/superadmin/UserManagement/UserManagementPage";
import AddUserPage from "./components/superadmin/UserManagement/AddUserPage";
import { Navigate } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Hero />
      <BankOffersBar />
      <Categories />
      <FeaturedProducts />
      <BrandShowcase />
      <TrustBadges />
    </>
  );
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      <StoreProvider>
        <Navbar />
        <Outlet />
      </StoreProvider>
      <Footer />
    </div>
  );
}

// Define the router with React Router 7 data router pattern
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "category", element: <CategoryListingPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "showcase", element: <ShowcasePage /> },
      { path: "inventory", element: <InventoryOverviewPage /> },
      { path: "inventory/transfer", element: <StockTransferPage /> },
    ],
  },
  {
    path: "/superadmin",
    element: <SuperadminLayout />,
    children: [
      { index: true, element: <Navigate to="roles" replace /> },
      { path: "roles", element: <RoleManagementPage /> },
      { path: "roles/add", element: <AddRolePage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "users/add", element: <AddUserPage /> },
    ],
  },
]);


function App() {
  return (
    <InventoryProvider>
      <ProductProvider>
        <ShowcaseProvider>
          <RouterProvider router={router} />
        </ShowcaseProvider>
      </ProductProvider>
    </InventoryProvider>
  );
}

export default App;
