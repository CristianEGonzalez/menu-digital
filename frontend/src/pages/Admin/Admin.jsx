import { useState } from 'react';
import styles from './admin.module.css';
import { productos, secciones } from '../../data'; 
import AddMenuItem from '../../components/AddMenuItem/AddMenuItem';
import AddSection from '../../components/AddSection/AddSection';

const Admin = () => {
  const [activeView, setActiveView] = useState('productos'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>OLD SPRINGFIELD</h2>
        </div>
        <nav className={styles.navContainer}>
          <div 
            className={activeView === 'productos' ? styles.navItemActive : styles.navItem}
            onClick={() => setActiveView('productos')}
          >
             🍔 PRODUCTOS
          </div>
          <div 
            className={activeView === 'secciones' ? styles.navItemActive : styles.navItem}
            onClick={() => setActiveView('secciones')}
          >
             📂 SECCIONES
          </div>
        </nav>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <span className={styles.breadcrumb}>
            Dashboard / <b>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</b>
          </span>
          <div className={styles.topbarRight}>
             <span className={styles.onlineStatus}>● ONLINE</span>
             <div className={styles.avatar}>🍩</div>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <h1 className={styles.mainTitle}>
              {activeView === 'productos' ? 'GESTIÓN DE MENÚ' : 'GESTIÓN DE SECCIONES'}
            </h1>
            <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
              + AGREGAR {activeView === 'productos' ? 'PRODUCTO' : 'SECCIÓN'}
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.productTable}>
              <thead>
                {activeView === 'productos' ? (
                  <tr>
                    <th>Producto</th>
                    <th>Sección</th>
                    <th>Precio</th>
                    <th className={styles.textRight}>Acciones</th>
                  </tr>
                ) : (
                  <tr>
                    <th>Imagen Banner</th>
                    <th>Título</th>
                    <th>Slug / Link</th>
                    <th className={styles.textRight}>Acciones</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeView === 'productos' 
                  ? productos.map((prod, i) => (
                      <tr key={i}>
                        <td className={styles.productCell}>
                          <div className={styles.productInfo}>
                            {/* Ruta absoluta desde root suele ser mejor en Vite: /src/assets/... */}
                            <img src={`/src/assets/${prod.imagen}`} alt={prod.nombre} className={styles.productThumb} />
                            <span className={styles.productName}>{prod.nombre}</span>
                          </div>
                        </td>
                        <td><span className={styles.sectionBadge}>{prod.seccion}</span></td>
                        <td className={styles.price}>${prod.precio.toLocaleString('es-AR')}</td>
                        <td className={styles.actionsCell}>
                          <button className={styles.actionBtn}>✏️</button>
                          <button className={styles.actionBtn}>🗑️</button>
                        </td>
                      </tr>
                    ))
                  : secciones.map((sec, i) => (
                      <tr key={i}>
                        <td className={styles.productCell}>
                          <div className={styles.productInfo}>
                            <img src={`/src/assets/${sec.imagen}`} alt={sec.titulo} className={styles.sectionBannerThumb} />
                          </div>
                        </td>
                        <td className={styles.productName}>{sec.titulo}</td>
                        <td className={styles.price}>{sec.link}</td>
                        <td className={styles.actionsCell}>
                          <button className={styles.actionBtn}>✏️</button>
                          <button className={styles.actionBtn}>🗑️</button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Lógica de Modales Dinámicos */}
      {isModalOpen && (
        activeView === 'productos' ? (
          <AddMenuItem 
            onClose={() => setIsModalOpen(false)} 
            onSave={(data) => console.log("Nuevo Producto:", data)} 
          />
        ) : (
          <AddSection 
            onClose={() => setIsModalOpen(false)} 
            onSave={(data) => console.log("Nueva Sección:", data)} 
          />
        )
      )}
    </div>
  );
};

export default Admin;