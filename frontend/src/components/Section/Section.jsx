import { useState } from 'react';
import Card from '../Card/Card';
import styles from './section.module.css';

// Usamos la URL del backend para las imágenes
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Section = ({ seccion, todosLosProductos, agregarAlPedido }) => {
    const [productsVisible, setProductsVisible] = useState(false);

    const toggleProductsVisibility = () => {
        setProductsVisible(!productsVisible);
    };

    // La imagen ahora viene de la carpeta uploads del backend
    const bannerImageUrl = `${API_URL}/uploads/images/${seccion.image}`;

    // Filtramos los productos que pertenecen a esta sección por su ID
    // Importante: Chequeá si p.section es un objeto (populate) o un ID
    const productosFiltrados = todosLosProductos.filter(p => {
        const sectionId = p.section?._id || p.section; 
        return sectionId === seccion._id && p.isActive !== false;
    });

    return (
        <section className={styles.section} id={seccion.link}>
            <div className={styles.bannerContainer} onClick={toggleProductsVisibility}>
                <div className={styles.bannerOverlay}></div>
                <img 
                    src={bannerImageUrl} 
                    alt={`Banner de ${seccion.title}`} 
                    className={styles.bannerImage} 
                />
                <h2 className={styles.bannerTitle}>{seccion.title}</h2>
            </div>

            {productsVisible && (
                <div className={styles.productContainer}>
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((p) => (
                            <Card
                                key={p._id}
                                nombre={p.name}
                                precio={p.price}
                                imagen={p.image}
                                ingredientes={p.ingredients}
                                agregarAlPedido={agregarAlPedido}
                            />
                        ))
                    ) : (
                        <p className={styles.noProducts}>Próximamente...</p>
                    )}
                </div>
            )}
        </section>
    );
}

export default Section;