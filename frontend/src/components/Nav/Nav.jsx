import { useState, useEffect } from 'react';
import styles from './nav.module.css';
import { apiFetch } from '../../services/apiFetch';

const Nav = () => {
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        const cargarSecciones = async () => {
            try {
                const data = await apiFetch("sections");
                setSecciones(data);
            } catch (error) {
                console.error("Error al cargar secciones en el Nav:", error);
            }
        };

        cargarSecciones();
    }, []);

    return (
        <nav>
            <ul className={styles.list}>
                {secciones.map((s) => (
                    <a 
                        className={styles.link} 
                        key={s._id}
                        href={`#${s.link}`}
                    >
                        <li className={styles.item}>{s.title}</li>
                    </a>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;

