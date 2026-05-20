/**
 * App component with routing — PROVIDED.
 * You do NOT need to modify this file.
 *
 * Routes:
 *   /              → ProductList page
 *   /products/:id  → ProductDetail page
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
