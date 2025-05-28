import './_footer.css';

const Footer = () =>{
    return  <footer className='footer'>
                <div>
                    <p className='footer__text'>Sitio creado por Cristian Emmanuel Gonzalez | 2023</p>
                </div>
                <div>
                    <ul>
                        <a href="https://www.instagram.com/cris.dev_" target="_blank">
                            <img className='footer__icon' src="/images/instagram.png" alt="Logo Instagram"></img>
                            <li className="footer__social-list">Instagram</li>
                        </a>
                        <a href="https://www.linkedin.com/in/cristian-gonzalez-dev" target="_blank">
                            <img className='footer__icon' src="/images/linkedin.png" alt="Logo Linkedin"></img>
                            <li className="footer__social-list">LinkedIn</li>
                        </a>
                    </ul>
                </div>
            </footer>
}

export default Footer