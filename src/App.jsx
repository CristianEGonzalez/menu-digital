import './App.css'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Section from './components/Section/Section'
import Footer from './components/Footer/Footer'
import {secciones} from './data';
import FloatButton from './components/FloatButton/FloatButton'

function App() {
  return <>
    <Header/>
    <Nav/>
    <FloatButton/>
    <main>
        {secciones.map((s, index) => (
          <Section
            key={index}
            titulo={s.titulo}
            link={s.link}
            imagen={s.imagen}
          />
        ))}
    </main>
    <Footer/>
    </>
}

export default App
