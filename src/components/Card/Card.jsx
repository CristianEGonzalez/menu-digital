import styles from './card.module.css';

const Card = (props) =>{
    const imageURL = new URL(`../../assets/${props.imagen}`, import.meta.url).href;

    return  <article className={styles.card}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={imageURL} alt={props.nombre}/>
                </div>
                <h3 className={styles.title}>{props.nombre}</h3>
                <ol className={styles.list}>
                    {props.ingredientes.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
                {/* <button className='button'><img className='button-icon' src="/images/checkout.png" alt="Añadir al Carrito" />Anadir al Carrito</button> */}
            </article>
}

export default Card