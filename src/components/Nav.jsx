import { secciones } from '../data';

const Nav = () =>{
    return  <nav>
                <ul>
                    {secciones.map((s, index) => (
                        <a key={index} href={`#${s.link}`}>
                            <li>{s.titulo}</li>
                        </a>
                    ))}
                </ul>
            </nav>
}

export default Nav

