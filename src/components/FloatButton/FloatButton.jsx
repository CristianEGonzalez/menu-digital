import { useState, useEffect } from 'react';
import styles from './floatButton.module.css'; // Cambiado a sin guión bajo

const FloatButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles['scroll-to-top']}>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className={styles['scroll-to-top-button']}
        />
      )}
    </div>
  );
};

export default FloatButton;