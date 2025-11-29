import { useState } from 'react';
import styles from './orderModal.module.css';

const OrderModal = ({ isOpen, onClose, onConfirm, pedido, agregarUno, eliminarUno }) => {
    const [nombre, setNombre] = useState('');

    if (!isOpen) return null;

    // Agrupamos los items para mostrarlos: ['A', 'A', 'B'] => { A: 2, B: 1 }
    const resumenPedido = pedido.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() && pedido.length > 0) {
            onConfirm(nombre);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Tu Pedido</h2>
                    <button onClick={onClose} className={styles.closeX}>&times;</button>
                </div>

                {/* LISTA DE PRODUCTOS CON SCROLL */}
                <div className={styles.productList}>
                    {Object.entries(resumenPedido).map(([producto, cantidad]) => (
                        <div key={producto} className={styles.productRow}>
                            <span className={styles.productName}>{producto}</span>
                            
                            <div className={styles.counterControls}>
                                <button 
                                    type="button" 
                                    className={styles.countBtn} 
                                    onClick={() => eliminarUno(producto)}
                                >-</button>
                                
                                <span className={styles.countValue}>{cantidad}</span>
                                
                                <button 
                                    type="button" 
                                    className={styles.countBtn} 
                                    onClick={() => agregarUno(producto)}
                                >+</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.divider}></div>

                {/* FORMULARIO DE NOMBRE */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>¿A nombre de quién?</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Juan Perez" 
                        className={styles.input}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        autoFocus
                    />
                    
                    <button type="submit" className={styles.confirmBtn} disabled={pedido.length === 0}>
                        Enviar Pedido por WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;