import './_nav.css';

import { secciones } from '../../data';

const Nav = () =>{
    return  <nav>
                <ul className='nav__list'>
                    {secciones.map((s, index) => (
                        <a className='nav__link' key={index} href={`#${s.link}`}>
                            <li className='nav__item'>{s.titulo}</li>
                        </a>
                    ))}
                </ul>
            </nav>
}

export default Nav

