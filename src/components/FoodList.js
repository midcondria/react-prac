import { useContext, useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import LocaleContext from "./contexts/LocaleContext";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const locale = useContext(LocaleContext);
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <p>현재언어:{locale}</p>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);
  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          console.log(item);
          const { id, title, content, calorie } = item;
          const initialValues = { title, content, calorie, imgFile: null };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialPreview={item.imgUrl}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
