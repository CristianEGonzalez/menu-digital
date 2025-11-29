import styles from './card.module.css';

const Card = (props) =>{
    const imageURL = new URL(`../../assets/${props.imagen}`, import.meta.url).href;

    const mensaje = `Hola! Quiero pedir un/a ${props.nombre}`;
    const whatsappUrl = `https://wa.me/1130608503?text=${encodeURIComponent(mensaje)}`;

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
                <a href={whatsappUrl} className={styles.button} target="_blank">
                    <img className={styles.buttonIcon} src="/images/whatsapp.png" alt="Whatsapp"></img>
                    Pedir por Whatsapp
                </a>
            </article>
}

export default Card