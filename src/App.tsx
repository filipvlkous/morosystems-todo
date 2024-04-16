import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./Redux/store";
import { getAllItems } from "./Redux/actions";
import { ItemTypes } from "./Types";

function App() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  console.log(state);

  if (state.isLoading)
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="App">
      {state.cartItems.map((item: ItemTypes) => {
        return (
          <div key={item.id}>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
