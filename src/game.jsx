import { useState, useEffect } from 'react';
import './game.css';
import { Link } from 'react-router-dom';

const Game = () => {
    const [snake, setSnake] = useState([{ x: 90, y: 30 }, { x: 60, y: 30 }, { x: 30, y: 30 }]);
    const [direction, setDirection] = useState('R');
    const [updateInterval, setUpdateInterval] = useState(400);
    const[TX,setTX]=useState(Math.floor((Math.random()*470)/30)*30);
    const[TY,setTY]=useState(Math.floor((Math.random()*470)/30)*30);
    const[gameover,setgameover]=useState(false);
    const[score,setscore]=useState(0);
    const[difficulty,setdifficulty]=useState(.9);


    useEffect(() => {
        if(!gameover){
            const interval = setInterval(() => {
                setSnake((prevSnake) => {
                    // movement logic
                    let newsnake = [...prevSnake];
                    newsnake.pop();
                    switch (direction) {
                        case 'R':
                            newsnake.unshift({ x: prevSnake[0].x + 30, y: prevSnake[0].y });
                            break;
                        case 'L':
                            newsnake.unshift({ x: prevSnake[0].x - 30, y: prevSnake[0].y });
                            break;
                        case 'U':
                            newsnake.unshift({ x: prevSnake[0].x, y: prevSnake[0].y - 30 });
                            break;
                        case 'D':
                            newsnake.unshift({ x: prevSnake[0].x, y: prevSnake[0].y + 30 });
                            break;
                        default:
                            break;
                    }
                    //gameover on snake hitting itself
                    for(var i=1; i<newsnake.length; i++){
                        if(newsnake[0].x==newsnake[i].x&&newsnake[0].y==newsnake[i].y){
                            setgameover(true);
                            clearInterval(interval);
                        }
                    } 
                    // snake getting a point logic
                    if(Math.abs(TX-newsnake[0].x)==0&&Math.abs(TY-newsnake[0].y)==0){
                        setTX(Math.floor((Math.random()*470)/30)*30);
                        setTY(Math.floor((Math.random()*470)/30)*30);
                        setUpdateInterval((previnterval)=>previnterval*.9);
                        setscore((score)=>score+1);
                        switch (newsnake[newsnake.length-2].x-newsnake[newsnake.length-1].x) {
                            case 30:
                                newsnake.push({x:newsnake[newsnake.length-1].x-30,y:newsnake[newsnake.length-1].y})
                                break;
                            case -30:
                                newsnake.push({x:newsnake[newsnake.length-1].x+30,y:newsnake[newsnake.length-1].y})
                            break;
                            case 0:
                              if(newsnake[newsnake.length-2].y-newsnake[newsnake.length-1].y==-30)
                                newsnake.push({x:newsnake[newsnake.length-1].x,y:newsnake[newsnake.length-1].y+30});
                              else if(newsnake[newsnake.length-2].y-newsnake[newsnake.length-1].y==30)
                                newsnake.push({x:newsnake[newsnake.length-1].x,y:newsnake[newsnake.length-1].y-30});
                            break;
                        
                            default:
                                break;
                        }
                    }
                    console.log(newsnake[0].x)
                    // gameover on hitting boundaries
                    if(newsnake[0].x<0||newsnake[0].x>470){setgameover(true); clearInterval(interval);}
                    if(newsnake[0].y<0||newsnake[0].y>470){setgameover(true); clearInterval(interval);}
                    return newsnake;
                });
            }, updateInterval);
    
            return () => clearInterval(interval);
        }
          //  Cleanup interval
    }, [direction, updateInterval]);

    // Correct Key Event Listener Logic
    useEffect(() => {
            const handleKeyDown = (e) => {
                switch (e.code) {
                    case 'ArrowUp':
                        setDirection('U');
                        break;
                    case 'ArrowDown':
                        setDirection('D');
                        break;
                    case 'ArrowLeft':
                        setDirection('L');
                        break;
                    case 'ArrowRight':
                        setDirection('R');
                        break;
                    default:
                        break;
                }
            };
            window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);  //  Proper cleanup
        };
    },[]);  // Only runs once on mount


    return (
        <div id="gamepage">
        <div id="score">score:{score}</div>
        {gameover&&<div id="gameoverpage">
            <div id="gameoverpopup">Game Over</div>
            <div id="replaybutton" onClick={()=>{window.location.reload()}}>Restart</div>
         <Link to="/"><div id="quit">Quit because you're a fat loser </div></Link>
        </div>}
            <div id="box">
                {snake.map((element, index) => (
                    <div
                        key={index}
                        className="snakeelement"
                        style={{ left: `${element.x}px`, top: `${element.y}px` }}
                    ></div>
                ))}
                <div id="target" style={{left:`${TX}px`,top:`${TY}px`}} ></div>
            </div>
        </div>
    );
};

export default Game;