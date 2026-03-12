import { useState } from 'react';
import styles from './admin.module.css';
import { productos, secciones } from '../../data'; 
import AddMenuItem from '../../components/AddMenuItem/AddMenuItem';
import AddSection from '../../components/AddSection/AddSection';

const Admin = () => {
  const [activeView, setActiveView] = useState('productos'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Nuevo estado

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.adminContainer}>
      {/* Overlay para cerrar el sidebar en mobile al tocar fuera */}
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarActive : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>OLD SPRINGFIELD</h2>
          <button className={styles.closeSidebar} onClick={toggleSidebar}>✕</button>
        </div>
        <nav className={styles.navContainer}>
          <div 
            className={activeView === 'productos' ? styles.navItemActive : styles.navItem}
            onClick={() => { setActiveView('productos'); setIsSidebarOpen(false); }}
          >
             🍔 PRODUCTOS
          </div>
          <div 
            className={activeView === 'secciones' ? styles.navItemActive : styles.navItem}
            onClick={() => { setActiveView('secciones'); setIsSidebarOpen(false); }}
          >
             📂 SECCIONES
          </div>
        </nav>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.menuBtn} onClick={toggleSidebar}>☰</button>
            <span className={styles.breadcrumb}>
              Dashboard / <b>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</b>
            </span>
          </div>
          <div className={styles.topbarRight}>
             <span className={styles.onlineStatus}>● ONLINE</span>
             <div className={styles.avatar}>🍩</div>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <h1 className={styles.mainTitle}>
              {activeView === 'productos' ? 'PRODUCTOS' : 'SECCIONES'}
            </h1>
            <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
              + <span className={styles.btnText}>AGREGAR</span>
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.productTable}>
              <thead>
                {activeView === 'productos' ? (
                  <tr>
                    <th>Producto</th>
                    <th>Sección</th>
                    <th className={styles.hideMobile}>Precio</th>
                    <th className={styles.textRight}>Acciones</th>
                  </tr>
                ) : (
                  <tr>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th className={styles.hideMobile}>Link</th>
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
                            <img src={`/menuImages/${prod.imagen}`} alt={prod.nombre} className={styles.productThumb} />
                            <span className={styles.productName}>{prod.nombre}</span>
                          </div>
                        </td>
                        <td><span className={styles.sectionBadge}>{prod.seccion}</span></td>
                        <td className={`${styles.price} ${styles.hideMobile}`}>${prod.precio.toLocaleString('es-AR')}</td>
                        <td className={styles.actionsCell}>
                          <button className={styles.actionBtn}>✏️</button>
                          <button className={styles.actionBtn}>🗑️</button>
                        </td>
                      </tr>
                    ))
                  : secciones.map((sec, i) => (
                      <tr key={i}>
                        <td className={styles.productCell}>
                          <img src={`/bannerImages/${sec.imagen}`} alt={sec.titulo} className={styles.sectionBannerThumb} />
                        </td>
                        <td className={styles.productName}>{sec.titulo}</td>
                        <td className={`${styles.price} ${styles.hideMobile}`}>{sec.link}</td>
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

      {isModalOpen && (
        activeView === 'productos' ? (
          <AddMenuItem onClose={() => setIsModalOpen(false)} onSave={(d) => console.log(d)} />
        ) : (
          <AddSection onClose={() => setIsModalOpen(false)} onSave={(d) => console.log(d)} />
        )
      )}
    </div>
  );
};

export default Admin;