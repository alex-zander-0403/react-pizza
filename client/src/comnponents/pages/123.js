const [searchValue, setSearchValue] = useState("");
const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц

const pizzas = pizzasArr
  .filter((el) => {
    if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  })
  .map((el) => <PizzaCard key={el.id} el={el} />);

const skeletons = [...new Array(9)].map((el, i) => (
  <PizzaCardSkeleton key={i} />
));

<div className="content__items">{isLoading ? skeletons : pizzas}</div>;
