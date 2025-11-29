import styles from './botonPedido.module.css';

const BotonPedido = ({ cantidad, onClick }) => {
    return (
        <button className={styles.pedidoButton} onClick={onClick}>
            <img src="/images/checkout.png" alt="Carrito" className={styles.icon} />
            <span className={styles.text}>Finalizar Pedido ({cantidad})</span>
        </button>
    );
};

export default BotonPedido;