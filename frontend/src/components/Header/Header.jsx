import styles from './header.module.css';

const Header = () =>{
    return  <header className={styles.header}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        <h1 className={styles.heading}>Old Sprinfield</h1>
                    </div>
                </div>
                <h2 className={styles.subtitle}>HAMBURGUESERÍA</h2>
            </header>
}

export default Header