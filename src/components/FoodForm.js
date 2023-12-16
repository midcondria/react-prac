import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState("");

  return (
    <form>
      <input name="title"></input>
      <input type="number" name="calorie"></input>
      <input name="content"></input>
    </form>
  );
}

export default FoodForm;
