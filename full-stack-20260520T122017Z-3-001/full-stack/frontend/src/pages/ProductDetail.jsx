import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const data = await api.get(`/api/products/${id}`);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <p>
        <Link to="/">&larr; Back to product list</Link>
      </p>

      {loading && <p>Loading product...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && product && (
        <article>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              style={{ maxWidth: '400px', width: '100%', borderRadius: '8px' }}
            />
          )}
          <h1 data-testid="product-detail-name">{product.name}</h1>
          <p data-testid="product-detail-price">${Number(product.price).toFixed(2)}</p>
          <dl>
            <dt>Description</dt>
            <dd>{product.description || 'No description provided.'}</dd>
            <dt>SKU</dt>
            <dd>{product.sku}</dd>
            <dt>Category</dt>
            <dd>{product.category_name || 'Uncategorized'}</dd>
            <dt>Stock</dt>
            <dd>{product.quantity}</dd>
          </dl>
        </article>
      )}
    </div>
  );
}

export default ProductDetail;
