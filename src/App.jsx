import './App.css'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Section from './components/Section/Section'
import Footer from './components/Footer/Footer'
import {secciones} from './data';

function App() {
  return <>
    <Header/>
    <Nav/>
    <main>
        {secciones.map((s, index) => (
          <Section
            key={index}
            titulo={s.titulo}
            link={s.link}
          />
        ))}
    </main>
    <Footer/>
    </>
}

export default App
