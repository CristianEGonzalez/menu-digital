import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import { apiFetch } from "../../services/apiFetch";
import AddMenuItem from "../../components/AddMenuItem/AddMenuItem";
import AddSection from "../../components/AddSection/AddSection";

const Admin = () => {
  const [activeView, setActiveView] = useState("productos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Función para cargar datos desde la API
  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeView === "productos" ? "menuItems" : "sections";
      // Si queremos ver inactivos, le avisamos a la API
      const url = showInactive ? `${endpoint}?all=true` : endpoint;
      const response = await apiFetch(url);
      setItems(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Asegurate de que useEffect escuche a showInactive
  useEffect(() => {
    fetchData();
  }, [activeView, showInactive]);

  // Función para guardar (POST)
  const handleSave = async (formData) => {
    try {
      const endpoint = activeView === "productos" ? "menuItems" : "sections";

      // 1. Usamos FormData porque enviamos un archivo (imagen)
      const dataToSend = new FormData();

      // Mapeamos los campos del formulario al FormData
      if (activeView === "productos") {
        dataToSend.append("name", formData.nombre);
        dataToSend.append("price", formData.precio);
        dataToSend.append("section", formData.seccion); // Aquí enviamos el ID o nombre según el back
        dataToSend.append("image", formData.imagen);
        // Los ingredientes los mandamos como string separado por comas si tu back lo espera así
        dataToSend.append("ingredients", formData.ingredientes);
      } else {
        // Lógica para secciones si también llevan imagen
        dataToSend.append("title", formData.titulo);
        dataToSend.append("link", formData.link);
        dataToSend.append("image", formData.imagen);
      }
      // 2. Llamada a la API
      await apiFetch(endpoint, "POST", dataToSend);
      // 3. Éxito: Cerramos modal y refrescamos la tabla
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar este elemento?"))
      return;

    try {
      const endpoint =
        activeView === "productos" ? `menuItems/${id}` : `sections/${id}`;
      await apiFetch(endpoint, "DELETE");

      // Refrescamos la lista para que desaparezca de la tabla
      fetchData();
    } catch (error) {
      // Si el backend nos manda el error 400 (bloqueo), lo mostramos aquí
      alert(error.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      const endpoint =
        activeView === "productos"
          ? `menuItems/${id}/restore`
          : `sections/${id}/restore`;
      await apiFetch(endpoint, "PATCH");
      fetchData();
    } catch (error) {
      alert("Error al restaurar: " + error.message);
    }
  };

  return (
    <div className={styles.adminContainer}>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarActive : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>OLD SPRINGFIELD</h2>
          <button className={styles.closeSidebar} onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <nav className={styles.navContainer}>
          <div
            className={
              activeView === "productos" ? styles.navItemActive : styles.navItem
            }
            onClick={() => {
              setActiveView("productos");
              setIsSidebarOpen(false);
            }}
          >
            🍔 PRODUCTOS
          </div>
          <div
            className={
              activeView === "secciones" ? styles.navItemActive : styles.navItem
            }
            onClick={() => {
              setActiveView("secciones");
              setIsSidebarOpen(false);
            }}
          >
            📂 SECCIONES
          </div>
        </nav>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.menuBtn} onClick={toggleSidebar}>
              ☰
            </button>
            <span className={styles.breadcrumb}>
              Dashboard /{" "}
              <b>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</b>
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
              {activeView === "productos" ? "PRODUCTOS" : "SECCIONES"}
            </h1>

            <div className={styles.headerActions}>
              {/* Contenedor del Toggle */}
              <label className={styles.toggleWrapper}>
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={() => setShowInactive(!showInactive)}
                  className={styles.hiddenCheckbox}
                />
                <div className={styles.customToggle}>
                  <div className={styles.toggleCircle}></div>
                </div>
                <span className={styles.toggleText}>Mostrar eliminados</span>
              </label>

              <button
                className={styles.addButton}
                onClick={() => setIsModalOpen(true)}
              >
                + <span className={styles.btnText}>AGREGAR</span>
              </button>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            {/* Agregamos un loading por si la conexión con Docker tarda un poquito */}
            {loading ? (
              <p style={{ padding: "20px" }}>
                Cargando datos de la base de datos...
              </p>
            ) : (
              <table className={styles.productTable}>
                <thead>
                  {activeView === "productos" ? (
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
                  {items.map((item) => (
                    <tr key={item._id}>
                      {/* COLUMNA 1: IMAGEN */}
                      <td className={styles.productCell}>
                        <div className={styles.productInfo}>
                          <img
                            src={`${API_URL}/uploads/images/${item.image}`}
                            alt={item.name || item.title}
                            className={
                              activeView === "productos"
                                ? styles.productThumb
                                : styles.sectionBannerThumb
                            }
                          />
                          {/* Si es producto, mostramos el nombre acá. Si es sección, lo dejamos para la siguiente columna */}
                          {activeView === "productos" && (
                            <span className={styles.productName}>
                              {item.name}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* COLUMNA 2: SECCIÓN (en productos) o TÍTULO (en secciones) */}
                      <td>
                        {activeView === "productos" ? (
                          <span className={styles.sectionBadge}>
                            {item.section?.title || "Sin sección"}
                          </span>
                        ) : (
                          <span className={styles.productName}>
                            {item.title}
                          </span>
                        )}
                      </td>

                      {/* COLUMNA 3: PRECIO o LINK */}
                      <td className={`${styles.price} ${styles.hideMobile}`}>
                        {activeView === "productos"
                          ? `$${item.price?.toLocaleString("es-AR")}`
                          : item.link}
                      </td>

                      {/* COLUMNA 4: ACCIONES */}
                      <td className={styles.actionsCell}>
                        {item.isActive === false ? (
                          <button
                            className={styles.restoreBtn}
                            onClick={() => handleRestore(item._id)}
                          >
                            🔄 Restaurar
                          </button>
                        ) : (
                          <>
                            <button className={styles.actionBtn}>✏️</button>
                            <button
                              className={styles.actionBtn}
                              onClick={() => handleDelete(item._id)}
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {isModalOpen &&
        (activeView === "productos" ? (
          /* Conectamos el onSave con la función handleSave que llama a apiFetch */
          <AddMenuItem
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        ) : (
          <AddSection
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        ))}
    </div>
  );
};

export default Admin;
