import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav'
import FloatButton from '../components/FloatButton/FloatButton'
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

function Home() {
  return <>
    <Header/>
    <Nav/>
    <FloatButton/>
    <main>
        <Menu />
    </main>
    <Footer/>
    </>
}

export default Home