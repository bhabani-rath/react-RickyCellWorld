import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { ProductProvider } from './context/ProductContext';
import { InventoryProvider } from './context/InventoryContext';
import { ShowcaseProvider } from './context/ShowcaseContext';

// Eager load layouts for instant navigation feel
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';
import SuperadminLayout from './components/superadmin/SuperadminLayout';
import StoreManagerLayout from './components/store-manager/StoreManagerLayout';

// Lazy load all pages
const HomePage = lazy(() => import('./pages/publicpage/HomePage')); // Combine Hero+Categories+etc into one page
const CategoryListingPage = lazy(() => import('./pages/publicpage/CategoryListingPage'));
const ProductDetailPage = lazy(() => import('./pages/publicpage/ProductDetailPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

// Admin pages
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const ShowcasePage = lazy(() => import('./pages/admin/ShowcasePage'));
const InventoryOverviewPage = lazy(() => import('./pages/Inventory/InventoryOverviewPage'));
const StockTransferPage = lazy(() => import('./pages/Inventory/StockTransferPage'));

// Superadmin pages
const RoleManagementPage = lazy(() => import('./components/superadmin/RoleManagement/RoleManagementPage'));
const AddRolePage = lazy(() => import('./components/superadmin/RoleManagement/AddRolePage'));
const UserManagementPage = lazy(() => import('./components/superadmin/UserManagement/UserManagementPage'));
const AddUserPage = lazy(() => import('./components/superadmin/UserManagement/AddUserPage'));

// Loader component
import RDWLoader from './components/common/RDWLoader';

// Wrapper for lazy components with RDWLoader
const Lazy = ({ children }) => (
  <Suspense fallback={<RDWLoader progress={50} />}>{children}</Suspense>
);

// Layouts
function PublicLayout() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      <StoreProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </StoreProvider>
    </div>
  );
}

// Route definitions
const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Lazy><HomePage /></Lazy> },
      { path: 'category', element: <Lazy><CategoryListingPage /></Lazy> },
      { path: 'product/:id', element: <Lazy><ProductDetailPage /></Lazy> },
    ],
  },
  {
    path: '/login',
    element: <Lazy><LoginPage /></Lazy>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Lazy><DashboardPage /></Lazy> },
      { path: 'loader', element: <Lazy><RDWLoader /></Lazy> },
      { path: 'products', element: <Lazy><ProductsPage /></Lazy> },
      { path: 'showcase', element: <Lazy><ShowcasePage /></Lazy> },
      { path: 'inventory', element: <Lazy><InventoryOverviewPage /></Lazy> },
      { path: 'inventory/transfer', element: <Lazy><StockTransferPage /></Lazy> },
    ],
  },
  {
    path: '/superadmin',
    element: <SuperadminLayout />,
    children: [
      { index: true, element: <Navigate to="roles" replace /> },
      { path: 'roles', element: <Lazy><RoleManagementPage /></Lazy> },
      { path: 'roles/add', element: <Lazy><AddRolePage /></Lazy> },
      { path: 'users', element: <Lazy><UserManagementPage /></Lazy> },
      { path: 'users/add', element: <Lazy><AddUserPage /></Lazy> },
    ],
  },
  {
    path: '/store-manager',
    element: <StoreManagerLayout />,
    children: [
      { index: true, element: <Lazy><DashboardPage /></Lazy> },
      { path: 'products', element: <Lazy><ProductsPage /></Lazy> },
      { path: 'inventory', element: <Lazy><InventoryOverviewPage /></Lazy> },
      { path: 'inventory/transfer', element: <Lazy><StockTransferPage /></Lazy> },
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