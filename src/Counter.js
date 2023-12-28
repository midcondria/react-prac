import { useState } from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = ({ model, initialValue }) => {
  console.log(model);

  const [count, setCount] = useState(initialValue);

  const handlePlusClick = () => setCount(count + 1);
  const handleMinusClick = () => setCount(count - 1);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={handlePlusClick}>+</button>
      <button onClick={handleMinusClick}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

Counter.defaultProps = {
  initialValue: 0,
};

export default Counter;
