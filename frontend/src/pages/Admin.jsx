import React from 'react';
import styles from './admin.module.css';
// Importamos los datos estáticos
import { productos } from '../data'; 

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

          <div className={styles.tableWrapper}>
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
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td className={styles.productCell}>
                      <div className={styles.productInfo}>
                        <img 
                          src={`/src/assets/${producto.imagen}`} 
                          alt={producto.nombre} 
                          className={styles.productThumb}
                        />
                        <span className={styles.productName}>{producto.nombre}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.sectionBadge}>
                        {producto.seccion}
                      </span>
                    </td>
                    {/* Como en data.js no tenías precios, ponemos uno por defecto o '—' */}
                    <td className={styles.price}>
                      {producto.precio ? `$${producto.precio}` : "$0.00"}
                    </td>
                    <td className={styles.actionsCell}>
                      <button className={styles.actionBtn}>✏️</button>
                      <button className={styles.actionBtn}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;