import styles from './footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Sección de Copyright con Link a Byteland */}
            <div className={styles.copyrightSection}>
                <a 
                    href="https://www.byteland.com.ar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.brandLink} // Clase nueva para este link
                >
                    <p className={styles.text}>
                        © Byteland | {currentYear} | Argentina
                    </p>
                </a>
            </div>

            {/* Sección de Redes Sociales */}
            <nav>
                <ul className={styles.socialList}>
                    <li className={styles.socialItem}>
                        <a 
                            href="https://www.instagram.com/byteland_ok" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            <img className={styles.icon} src="/images/instagram.png" alt="Instagram" />
                            <span>Instagram</span>
                        </a>
                    </li>
                    
                    <li className={styles.socialItem}>
                        <a 
                            href="https://www.linkedin.com/in/cristian-gonzalez-dev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            <img className={styles.icon} src="/images/linkedin.png" alt="LinkedIn" />
                            <span>LinkedIn</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;