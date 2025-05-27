const Card = (props) =>{
    const imageURL = new URL(`../assets/${props.imagen}`, import.meta.url).href;

    return  <article>
                <img src={imageURL} alt={props.nombre}/>
                <h3>{props.nombre}</h3>
                <ol>
                    {props.ingredientes.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
                {/* <button><img src="/images/checkout.png" alt="Añadir al Carrito" />Anadir al Carrito</button> */}
            </article>
}

export default Card