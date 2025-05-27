import './App.css'
import Section from './components/Section'
import {secciones} from './data';

function App() {
  return <>
    <header>
      <div className="top">
        <div className="title">
        <h1>Old Sprinfield</h1>
        </div>
      </div>
      <h2>HAMBURGUESERÍA</h2>
    </header>
    <nav>
      <ul>
          {secciones.map((s, index) => (
            <a key={index} href={`#${s.link}`}>
              <li>{s.titulo}</li>
            </a>
          ))}
      </ul>
    </nav>
    <main>
        {secciones.map((s, index) => (
          <Section
            key={index}
            titulo={s.titulo}  // Corregido: usa 's' en lugar de 'p'
            link={s.link}
          />
        ))}
    </main>
    <footer>
      <div>
        <p>Sitio creado por Cristian Emmanuel Gonzalez | 2023</p>
      </div>
      <div>
      <ul>
          <a href="https://www.instagram.com/cris.dev_" target="_blank">
            <img src="/images/instagram.png" alt="Logo Instagram"></img>
            <li class="redesimg">Instagram</li>
          </a>
          <a href="https://www.linkedin.com/in/cristian-gonzalez-dev" target="_blank">
            <img src="/images/linkedin.png" alt="Logo Linkedin"></img>
            <li class="redesimg">LinkedIn</li>
          </a>
        </ul>
      </div>
    </footer>
    </>
}

export default App
