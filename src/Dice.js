import diceBlue01 from './assets/dice-blue-1.svg';
import diceBlue02 from './assets/dice-blue-2.svg';
import diceBlue03 from './assets/dice-blue-3.svg';

import diceRed01 from './assets/dice-red-1.svg';
import diceRed02 from './assets/dice-red-2.svg';
import diceRed03 from './assets/dice-red-3.svg';

const dices = {
    blue: [diceBlue01, diceBlue02, diceBlue03],
    red: [diceRed01, diceRed02, diceRed03],
}

function Dice(props) {
    console.log(props);
    const diceImg = dices[props.color][props.num -1];
    return <img src={diceImg} alt="주사위" />
}

export default Dice;