import { useCallback, useEffect, useState } from "react";
import { createFood, deleteFood, getFoods, updateFood } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import useAsync from "./hooks/useAsync";
import { LocaleProvider } from "./contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, loadingError, getFoodsAsync] = useAsync(getFoods);
  const [search, setSearch] = useState("");

  const handleNewestClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      let result = await getFoodsAsync(options);
      if (!result) return;

      const {
        foods,
        paging: { nextCursor },
      } = result;
      if (!options.cursor) {
        setItems(foods);
      } else {
        setItems((prevItems) => [...prevItems, ...foods]);
      }
      setCursor(nextCursor);
    },
    [getFoodsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const idx = prevItems.findIndex((item) => item.id === food.id);
      return [...prevItems.slice(0, idx), food, ...prevItems.slice(idx + 1)];
    });
  };

  useEffect(() => {
    handleLoad({
      order,
      search,
    });
  }, [order, search, handleLoad]);

  return (
    <LocaleProvider defaultValue="ko">
      <div>
        <LocaleSelect />
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleCalorieClick}>칼로리순</button>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" />
          <button type="submit">검색</button>
        </form>
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
        <FoodList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더보기
          </button>
        )}
        {loadingError && <p>{loadingError.message}</p>}
      </div>
    </LocaleProvider>
  );
}

export default App;
