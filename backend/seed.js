const mongoose = require('mongoose');
const Section = require('./src/models/section'); // Ajustá la ruta según tu carpeta
const MenuItem = require('./src/models/menuItem'); // Ajustá la ruta según tu carpeta

// URL de tu base de datos (ajustala si es distinta en tu .env o Docker)
const mongoURI = 'mongodb://admin:password123@localhost:27017/menu-digital?authSource=admin';

const seccionesData = [
  { title: "Burgers", link: "burgers", image: "banner-burgers.jpg" },
  { title: "Vegan Burgers", link: "veggies", image: "banner-veggies.jpg" },
  { title: "Chicken Burgers", link: "chicken", image: "banner-chicken.jpg" },
  { title: "Fries & Sides", link: "sides", image: "banner-sides.jpg" }
];

const productosData = [
  { name: "Maggie Cheese", image: "burger1.jpg", ingredients: ["Pan de Papa", "Carne de Asado 120gr", "Doble Cheddar"], section: "Burgers", price: 16500 },
  { name: "Bola de nieve", image: "burger2.jpg", ingredients: ["Pan de Papa", "Carne de Asado 120gr", "Doble Cheddar", "Bacon", "Cebolla Crispy", "Salsa Barbacoa o Alioli"], section: "Burgers", price: 22500 },
  { name: "Ay caramba!", image: "burger3.jpg", ingredients: ["Pan de Papa", "Carne de Asado 120gr", "Doble Cheddar", "Bacon", "Cebolla Caramelizada"], section: "Burgers", price: 21000 },
  { name: "Ayudante de Santa", image: "burger4.jpg", ingredients: ["Pan de Papa", "Carne de Asado 120gr", "Doble Cheddar", "Salsa Cuarto de Libra"], section: "Burgers", price: 17000 },
  { name: "Lisa Simpsons", image: "vegan1.jpg", ingredients: ["Medallón de Lentejas", "4 Quesos", "Palta", "Cebolla", "Peregil"], section: "Vegan Burgers", price: 19500 },
  { name: "Timi Otul", image: "vegan2.jpg", ingredients: ["Medallón de Quínoa", "Rúcula", "Cebolla", "Tomate", "Lechuga"], section: "Vegan Burgers", price: 18000 },
  { name: "Jesse", image: "vegan3.jpg", ingredients: ["Medallón de Soja Texturizada", "Queso Cheddar", "Salsa BBQ", "Cebolla", "Morrón"], section: "Vegan Burgers", price: 18500 },
  { name: "Discos Stu", image: "vegan4.jpg", ingredients: ["Medallón de Soja Texturizada", "Apio", "Cebolla", "Pepino", "Tomate", "Lechuga"], section: "Vegan Burgers", price: 17500 },
  { name: "Sr. Burns", image: "chicken1.jpg", ingredients: ["1 Medallon de Pollo 120grs", "Salsa Tártara", "Queso Tybo", "Cebolla", "Tomate", "Lechuga"], section: "Chicken Burgers", price: 18500 },
  { name: "Sr. Thompson", image: "chicken2.jpg", ingredients: ["2 Medallones de Pollo 120grs", "Queso Tybo", "Tomate", "Bacon"], section: "Chicken Burgers", price: 23500 },
  { name: "Lalo Landa", image: "chicken3.jpg", ingredients: ["1 Medallón de Pollo 144grs", "Salsa Tártara", "Pepino"], section: "Chicken Burgers", price: 17500 },
  { name: "Sr. Teeny", image: "chicken4.jpg", ingredients: ["1 Medallón de Pollo 144grs", "Queso Cheddar", "Salsa Blanca", "Sweet Onion", "Lechuga"], section: "Chicken Burgers", price: 19000 },
  { name: "Aros de Cebolla", image: "side1.jpg", ingredients: ["Porción de Aros de Cebolla", "Salsa BBQ o Ketchup"], section: "Fries & Sides", price: 13000 },
  { name: "Batatas Fritas", image: "side2.jpg", ingredients: ["Porción de Batatas Fritas"], section: "Fries & Sides", price: 13500 },
  { name: "Bob Papitas", image: "side3.jpg", ingredients: ["Porción de Papas Fritas", "Queso Cheddar", "Bacon"], section: "Fries & Sides", price: 15500 },
  { name: "Papas con Bacon y Verdeo", image: "side4.jpg", ingredients: ["Porción de Papas Fritas", "Queso Cheddar", "Bacon"], section: "Fries & Sides", price: 15800 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("🍩 Conectado a MongoDB para la gran siembra...");

    // 1. Limpiamos la base de datos para no duplicar (Opcional)
    await Section.deleteMany({});
    await MenuItem.deleteMany({});
    console.log("🧹 Base de datos limpia.");

    // 2. Insertamos las Secciones
    const seccionesCreadas = await Section.insertMany(seccionesData);
    console.log(`📂 ${seccionesCreadas.length} secciones creadas.`);

    // 3. Creamos un mapa de Nombre -> ID para asociar productos
    const sectionMap = {};
    seccionesCreadas.forEach(sec => {
      sectionMap[sec.title] = sec._id;
    });

    // 4. Mapeamos los productos para que usen el ObjectId de la sección
    const productosConId = productosData.map(prod => ({
      ...prod,
      section: sectionMap[prod.section] // Cambiamos el nombre por el ID real
    }));

    // 5. Insertamos los Productos
    const productosCreados = await MenuItem.insertMany(productosConId);
    console.log(`🍔 ${productosCreados.length} productos creados con éxito.`);

    console.log("✅ ¡Siembra completada! Springfield ya tiene comida.");
    process.exit();
  } catch (error) {
    console.error("❌ Error en la siembra:", error);
    process.exit(1);
  }
};

seedDB();