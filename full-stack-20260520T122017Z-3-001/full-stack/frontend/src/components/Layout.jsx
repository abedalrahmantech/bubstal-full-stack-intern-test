/**
 * Layout shell component — PROVIDED.
 * You do NOT need to modify this file (but you can if you want).
 */

import { Link } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: '16px 0',
    marginBottom: '24px',
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
  },
};

function Layout({ children }) {
  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link to="/" style={styles.logo}>
            Product Catalog
          </Link>
        </div>
      </header>
      <main style={styles.container}>
        <div style={styles.main}>{children}</div>
      </main>
    </>
  );
}

export default Layout;
