import { useSetLocale } from "./contexts/LocaleContext";

function LocaleSelect() {
  const setLocale = useSetLocale();
  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;