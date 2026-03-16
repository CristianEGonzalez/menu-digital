import styles from './card.module.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Card = (props) => {
    const imageURL = `${API_URL}/uploads/images/${props.imagen}`;
    
    const normalizarIngredientes = () => {
        const ing = props.ingredientes;
        
        if (!ing) return [];

        // Caso 1: Es un array con un solo string largo: ["Carne, Queso, Pan"]
        if (Array.isArray(ing) && ing.length === 1 && ing[0].includes(',')) {
            return ing[0].split(',');
        }

        // Caso 2: Es un array de verdad con varios elementos: ["Carne", "Queso"]
        if (Array.isArray(ing)) {
            return ing;
        }

        // Caso 3: Es un string puro: "Carne, Queso, Pan"
        if (typeof ing === 'string') {
            return ing.split(',');
        }

        return [];
    };

    const listaIngredientes = normalizarIngredientes();

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <img 
                    className={styles.image} 
                    src={imageURL} 
                    alt={props.nombre}
                    onError={(e) => e.target.src = 'https://i.imgur.com/8K0S8zY.png'} 
                />
            </div>
            
            <h3 className={styles.title}>{props.nombre}</h3>
            
            <ol className={styles.list}>
                {listaIngredientes.map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                ))}
            </ol>

            <button
                className={styles.button}
                onClick={() => props.agregarAlPedido(props.nombre)}
            >
                <img className={styles.buttonIcon} src="/images/checkout.png" alt="Icono" />
                Agregar al pedido
            </button>
        </article>
    );
}

export default Card;