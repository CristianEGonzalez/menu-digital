import styles from './footer.module.css';

const Footer = () =>{
    return  <footer className={styles.footer}>
                <div>
                    <p className={styles.text}>© Byteland | 2023 | Argentina</p>
                </div>
                <div>
                    <ul>
                        <a href="https://www.instagram.com/cris.dev_" target="_blank">
                            <img className={styles.icon} src="/images/instagram.png" alt="Logo Instagram"></img>
                            <li className={styles.socialList}>Instagram</li>
                        </a>
                        <a href="https://www.linkedin.com/in/cristian-gonzalez-dev" target="_blank">
                            <img className={styles.icon} src="/images/linkedin.png" alt="Logo Linkedin"></img>
                            <li className={styles.socialList}>LinkedIn</li>
                        </a>
                    </ul>
                </div>
            </footer>
}

export default Footer