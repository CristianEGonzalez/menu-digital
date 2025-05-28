import './_card.css';

const Card = (props) =>{
    const imageURL = new URL(`../../assets/${props.imagen}`, import.meta.url).href;

    return  <article className='card'>
                <div className='card__image-container'>
                    <img className='card__image' src={imageURL} alt={props.nombre}/>
                </div>
                <h3 className='card__title'>{props.nombre}</h3>
                <ol className='card__list'>
                    {props.ingredientes.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
                {/* <button className='card__button'><img className='card__button-icon' src="/images/checkout.png" alt="Añadir al Carrito" />Anadir al Carrito</button> */}
            </article>
}

export default Card