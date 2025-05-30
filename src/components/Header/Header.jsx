import styles from './header.module.css';

const Header = () =>{
    return  <header className={styles.header}>
                <div className={styles.header__top}>
                    <div className={styles.header__title}>
                        <h1 className={styles.header__heading}>Old Sprinfield</h1>
                    </div>
                </div>
                <h2 className={styles.header__subtitle}>HAMBURGUESERÍA</h2>
            </header>
}

export default Header