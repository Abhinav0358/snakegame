import './landingpage.css'
import { Link } from 'react-router-dom';
const LandingPage = () => {
    return (
        <div id="landingpage">
            <Link to='./game'> 
            <button id="start">start new game</button>            
            </Link>
            <div id="badnote">cause obv you have nothing else to do with your life bitch</div>
            <div id="head">snake game</div>
        </div>
      );
}
 
export default LandingPage;