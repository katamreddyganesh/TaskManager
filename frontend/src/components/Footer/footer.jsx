import './Footer.css';



export default function Footer(){


    return(

        <div className='Footer-Container'>
            {/* <h1> i am footer</h1> */}
            <div className="footer-section copyright">
                <span>
                    © {new Date().getFullYear()} <strong>Ganesh katamreddy</strong>. 
                    Built with React & Vite. 
                    Code on <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                </span>
            </div>
            <div>
                <ul>
                    <li><i class="fa-brands fa-square-x-twitter"></i></li>
                    <li><i class="fa-brands fa-github"></i></li>
                    <li><i class="fa-brands fa-instagram"></i></li>
                    <li><i class="fa-brands fa-facebook"></i></li>
                    

                </ul>
            </div>

        </div>
    );
};