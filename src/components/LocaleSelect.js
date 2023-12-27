function LocaleSelect({ onChange }) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <select onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
