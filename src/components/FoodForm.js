import { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUE = {
  imgFile: null,
  title: "",
  calorie: 0,
  content: "",
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({
  onSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUE,
  onSubmit,
  onCancel,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUE);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        initialPreview={initialPreview}
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      />
      <input
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;