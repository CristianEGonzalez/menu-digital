import styles from './nav.module.css';

import { secciones } from '../../data';

const Nav = () =>{
    return  <nav>
                <ul className={styles.list}>
                    {secciones.map((s, index) => (
                        <a className={styles.link} key={index} href={`#${s.link}`}>
                            <li className={styles.item}>{s.titulo}</li>
                        </a>
                    ))}
                </ul>
            </nav>
}

export default Nav

