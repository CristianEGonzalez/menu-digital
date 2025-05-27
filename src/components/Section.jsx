import { productos } from '../data';
import Card from './Card'

const Section = (props) =>{
    //const imageURL = new URL(`../assets/${props.imagen}`, import.meta.url).href;
    const productosFiltrados = productos.filter(p => p.seccion === props.titulo);

    return  <>
        <h1 class="top-section" id={props.link}>{props.titulo}</h1>
        <section>
            {productosFiltrados.map((p,index) => (
                <Card
                    key={index}
                    nombre={p.nombre}
                    imagen={p.imagen}
                    ingredientes={p.ingredientes}
                />
            ))}
        </section>
      </>
}

export default Section