import './App.css'
import Card from './components/Card'
import productos from './data'

function App() {
  return <>
    <header>
      <div class="top">
        <div class="title">
        <h1>Old Sprinfield</h1>
        </div>
      </div>
      <h2>HAMBURGUESERÍA</h2>
    </header>
    <nav>
      <ul>
        <a href="#asado"><li>Hamburguesas de Asado</li></a>
        <a href="#vegan"><li>Hamburguesas Veggies</li></a>
      </ul>
    </nav>
    <main>

      <h1 class="top-section" id="asado">HAMBURGUESAS DE ASADO</h1>
      <section>
        {productos.map((p,index) => (
          <Card
            key={index}
            nombre={p.nombre}
            imagen={p.imagen}
            ingredientes={p.ingredientes}
          />
        ))}
      </section>

      <h1 class="top-section" id="vegan">HAMBURGUESAS VEGGIES</h1>
      <section>
    
      </section>
    </main>
    <footer>
      <p>Sitio creado por Cristian Emmanuel Gonzalez | 2023</p>
      <ul>
        <a href="https://www.instagram.com/cris_lovefit/" target="_blank">
          <img src="/images/instagram.png" alt="Logo Instagram"></img>
          <li class="redesimg">Instagram</li>
        </a>
        <a href="https://www.linkedin.com/in/cristian-gonzalez-174b44b5/" target="_blank">
          <img src="/images/linkedin.png" alt="Logo Linkedin"></img>
          <li class="redesimg">LinkedIn</li>
        </a>
      </ul>
    </footer>
    </>
}

export default App
