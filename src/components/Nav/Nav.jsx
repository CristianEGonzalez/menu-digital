import styles from './nav.module.css';

import { secciones } from '../../data';

const Nav = () =>{
    return  <nav>
                <ul className={styles.nav__list}>
                    {secciones.map((s, index) => (
                        <a className={styles.nav__link} key={index} href={`#${s.link}`}>
                            <li className={styles.nav__item}>{s.titulo}</li>
                        </a>
                    ))}
                </ul>
            </nav>
}

export default Nav

