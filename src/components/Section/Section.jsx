import { useState } from 'react';
import { productos } from '../../data';
import Card from '../Card/Card';
import styles from './section.module.css';

const Section = (props) => {
    const [productsVisible, setProductsVisible] = useState(false);

    const toggleProductsVisibility = () => {
        setProductsVisible(!productsVisible);
    };

    const bannerImageUrl = new URL(`../../assets/${props.imagen}`, import.meta.url).href;

    const productosFiltrados = productos.filter(p => p.seccion === props.titulo);

    return (
        <section className={styles.section} id={props.link}>
            <div className={styles.bannerContainer} onClick={toggleProductsVisibility}>
                <div className={styles.bannerOverlay}></div>
                <img src={bannerImageUrl} alt={`Banner de ${props.titulo}`} className={styles.bannerImage} />
                <h2 className={styles.bannerTitle}>{props.titulo}</h2>
            </div>

            {productsVisible && (
                <div className={styles.productContainer}>
                    {productosFiltrados.map((p, index) => (
                        <Card
                            key={index}
                            nombre={p.nombre}
                            imagen={p.imagen}
                            ingredientes={p.ingredientes}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Section;