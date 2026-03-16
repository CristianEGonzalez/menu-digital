import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import { apiFetch } from "../../services/apiFetch";
import AddMenuItem from "../../components/AddMenuItem/AddMenuItem";
import AddSection from "../../components/AddSection/AddSection";
import DeleteConfirmModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import AlertModal from "../../components/AlertModal/AlertModal";

const Admin = () => {
  const [activeView, setActiveView] = useState("productos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [seccionesParaSelect, setSeccionesParaSelect] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const showAlert = (title, message, type = "error") => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeView === "productos" ? "menuItems" : "sections";
      const url = showInactive ? `${endpoint}?all=true` : endpoint;
      const response = await apiFetch(url);
      setItems(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cargarSecciones = async () => {
      try {
        const data = await apiFetch("sections");
        setSeccionesParaSelect(data);
      } catch (e) {
        console.error("Error cargando secciones", e);
      }
    };
    cargarSecciones();
    fetchData();
  }, [activeView, showInactive]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = async (formData) => {
    try {
      const endpoint = activeView === "productos" ? "menuItems" : "sections";
      const isEditing = !!editingItem;

      const url = isEditing ? `${endpoint}/${editingItem._id}` : endpoint;
      const method = isEditing ? "PUT" : "POST";

      const dataToSend = new FormData();

      if (activeView === "productos") {
        dataToSend.append("name", formData.nombre);
        dataToSend.append("price", formData.precio);
        dataToSend.append("section", formData.seccion);
        if (formData.imagen) dataToSend.append("image", formData.imagen);

        formData.ingredientes.forEach((ing) => {
          if (ing.trim() !== "") dataToSend.append("ingredients", ing);
        });
      } else {
        dataToSend.append("title", formData.titulo);
        dataToSend.append("link", formData.link);
        if (formData.imagen) dataToSend.append("image", formData.imagen);
      }

      await apiFetch(url, method, dataToSend);
      closeModal();
      fetchData();

      showAlert(
        "¡Éxito!",
        "Los cambios se guardaron correctamente.",
        "success",
      );
    } catch (error) {
      showAlert("Error al guardar", error.message, "error");
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const endpoint =
        activeView === "productos"
          ? `menuItems/${itemToDelete._id}`
          : `sections/${itemToDelete._id}`;

      await apiFetch(endpoint, "DELETE");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      fetchData();
    } catch (error) {
      setIsDeleteModalOpen(false); // Cerramos el de pregunta
      showAlert("No se pudo eliminar", error.message, "warning");
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
      showAlert("Atención", error.message, "error");
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
            {loading ? (
              <p style={{ padding: "20px" }}>Cargando datos...</p>
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
                          {activeView === "productos" && (
                            <span className={styles.productName}>
                              {item.name}
                            </span>
                          )}
                        </div>
                      </td>

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

                      <td className={`${styles.price} ${styles.hideMobile}`}>
                        {activeView === "productos"
                          ? `$${item.price?.toLocaleString("es-AR")}`
                          : item.link}
                      </td>

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
                            <button
                              className={styles.editBtn}
                              onClick={() => handleEdit(item)}
                            >
                              ✏️
                            </button>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteClick(item)}
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

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || itemToDelete?.title}
        type={activeView}
      />

      {isModalOpen &&
        (activeView === "productos" ? (
          <AddMenuItem
            onClose={closeModal}
            onSave={handleSave}
            secciones={seccionesParaSelect}
            itemToEdit={editingItem}
          />
        ) : (
          <AddSection
            onClose={closeModal}
            onSave={handleSave}
            itemToEdit={editingItem}
          />
        ))}
    </div>
  );
};

export default Admin;
