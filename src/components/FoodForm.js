import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState("");

  const hadleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const hadleCalorieChange = (e) => {
    const newCalorie = Number(e.target.value) || 0;
    setCalorie(newCalorie);
  };

  const hadleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form>
      <input name="title" onChange={hadleTitleChange}></input>
      <input type="number" name="calorie" onChange={hadleCalorieChange}></input>
      <input name="content" onChange={hadleContentChange}></input>
    </form>
  );
}

export default FoodForm;
