import React from 'react';
import ProductForm from '../components/ProductForm/ProductForm';
import Header from '../components/Header/Header'
import styles from './admin.module.css';

const Admin = () => {
  const handleAddProduct = (productData) => {
    console.log('Enviando producto al backend:', productData);
  };

  return (
    <div className={styles.newProductPage}>
      <Header/>
      <main className={styles.mainContent}>
        <ProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
};

export default Admin;
