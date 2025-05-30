import styles from './_footer.module.css';

const Footer = () =>{
    return  <footer className={styles.footer}>
                <div>
                    <p className={styles.footer__text}>© Cristian Emmanuel Gonzalez | 2023 | Argentina</p>
                </div>
                <div>
                    <ul>
                        <a href="https://www.instagram.com/cris.dev_" target="_blank">
                            <img className={styles.footer__icon} src="/images/instagram.png" alt="Logo Instagram"></img>
                            <li className={styles.footer__socialList}>Instagram</li>
                        </a>
                        <a href="https://www.linkedin.com/in/cristian-gonzalez-dev" target="_blank">
                            <img className={styles.footer__icon} src="/images/linkedin.png" alt="Logo Linkedin"></img>
                            <li className={styles.footer__socialList}>LinkedIn</li>
                        </a>
                    </ul>
                </div>
            </footer>
}

export default Footer