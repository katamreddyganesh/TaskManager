import './Footer.css';



export default function Footer(){


    return(

        <div className='footer-container'>
            <div className="social-networks">
                <ul>
                    <li><a class="footer-icons" href="" target=""><i class="fa-brands fa-square-x-twitter"></i></a></li>
                    <li><a class="footer-icons" href="https://github.com/katamreddyganesh" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                    <li><i class="fa-brands fa-instagram"></i></li>
                    <li><i class="fa-brands fa-facebook"></i></li>
                    

                </ul>
            </div>
            <div className="footer-section copyright">
                <span>
                    © {new Date().getFullYear()} <strong>Ganesh katamreddy</strong>. 
                    Built with React & Vite. 
                    Code on GitHub.

                </span>
            </div>

        </div>
    );
};