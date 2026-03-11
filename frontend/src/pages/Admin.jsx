import styles from './admin.module.css';

const Admin = () => {
  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Fijo */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>OLD SPRINGFIELD</h2>
        </div>
        <nav className={styles.navContainer}>
          <div className={styles.navItemActive}>
             🍔 PRODUCTOS
          </div>
          <div className={styles.navItem}>
             📂 SECCIONES
          </div>
        </nav>
      </aside>

      {/* Area de Trabajo */}
      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <span className={styles.breadcrumb}>Dashboard / <b>Productos</b></span>
          <div className={styles.topbarRight}>
             <span className={styles.onlineStatus}>● ONLINE</span>
             <div className={styles.avatar}>🍩</div>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <h1 className={styles.mainTitle}>GESTIÓN DE MENÚ</h1>
            <button className={styles.addButton}>
              + AGREGAR PRODUCTO
            </button>
          </div>

          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Sección</th>
                <th>Precio</th>
                <th className={styles.textRight}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.productName}>Maggie Cheese</td>
                <td><span className={styles.sectionBadge}>BURGERS</span></td>
                <td className={styles.price}>$8.50</td>
                <td className={styles.actionsCell}>✏️ 🗑️</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Admin;