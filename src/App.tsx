import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "./Redux/store";
import { getAllItems } from "./Redux/actions";
import { ItemTypes } from "./Types";
import Item from "./components/item";
import Count from "./components/count";
import Add from "./components/add";
import ButtonContainer from "./components/buttonContainer";

/**
 * Main component of the application.
 * It renders list of all tasks, add and remove buttons,
 * counts the number of completed and not completed tasks and
 * it renders the error message if there is some error.
 */
function App() {
  /**
   * It holds the state of the completed tasks.
   * It is used to filter the tasks based on the completed state.
   */
  const [completed, setCompleted] = useState("");
  /**
   * It holds the array of selected tasks for deletion.
   */
  const [deleteArr, setDeleteArr] = useState<string[]>([]);
  /**
   * It stores the state of the application.
   */
  const state = useSelector((state: RootState) => state);
  /**
   * It is used to dispatch actions to the redux store.
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Calls the action creator getAllItems to get all tasks from backend.
   * This hook is called only once when the component is mounted.
   */
  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  /**
   * Adds or removes the id to/from the deleteArr based on the include/exclude filter.
   * @param id - id of the task to be added/removed
   */
  const addDeleteArr = (id: string) => {
    if (deleteArr.includes(id)) {
      setDeleteArr(deleteArr.filter((item) => item !== id));
    } else {
      setDeleteArr([...deleteArr, id]);
    }
  };

  /**
   * Sets the completed state to "" (empty) or "completed" based on the current state.
   */
  const setCompleteData = () => {
    completed == "completed" ? setCompleted("") : setCompleted("completed");
  };

  /**
   * Sets the completed state to "" (empty) or "incompleted" based on the current state.
   */
  const setIncompleteData = () => {
    completed == "incompleted" ? setCompleted("") : setCompleted("incompleted");
  };

  /**
   * Selects or unselects the task based on the include/exclude filter.
   * @param id - id of the task to be selected/unselected
   */
  const slectOneItem = (id: string) => {
    if (deleteArr.includes(id)) {
      setDeleteArr(deleteArr.filter((item) => item !== id));
    } else {
      setDeleteArr([...deleteArr, id]);
    }
  };

  /**
   * Selects all tasks based on the include/exclude filter.
   * @param arr - array of tasks to be selected/unselected
   */
  const allSelectArr = (arr: ItemTypes[]) => {
    if (arr.length == 0) return;
    const arrayOfIds: string[] = [];
    arr.forEach((obj) => {
      arrayOfIds.push(obj.id);
    });
    if (deleteArr.length == state.data.length) {
      setDeleteArr([]);
    } else {
      setDeleteArr(arrayOfIds);
    }
  };

  /**
   * If there is some error, it renders the error message.
   */
  if (state.error) {
    return (
      <div className="App">
        <p>nejaka chyba</p>
      </div>
    );
  }

  /**
   * If the tasks are still loading, it renders the loading message.
   */
  if (state.isLoading)
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );

  /**
   * If the completed state is not empty, it filters the tasks based on the completed state.
   */
  if (completed !== "") {
    /**
     * It is used to store the filtered tasks.
     */
    let filteredArray: ItemTypes[] = [];
    /**
     * If the completed state is "completed", it filters out the not completed tasks.
     * If the completed state is "incompleted", it filters out the completed tasks.
     * Otherwise it returns all the tasks.
     */
    completed != "incompleted"
      ? (filteredArray = state.data.filter((item) => item.completed))
      : (filteredArray = state.data.filter((item) => !item.completed));

    return (
      <div className=" flex flex-col items-center justify-center w-full  ">
        <ButtonContainer
          /**
           * Filtered array of tasks based on the completed state
           */
          filteredArray={filteredArray}
          /**
           * Array of selected tasks for deletion
           */
          deleteArr={deleteArr}
          /**
           * Sets the completed state to "" (empty) or "completed" based on the current state
           */
          setCompleteData={() => setCompleteData()}
          /**
           * Sets the completed state to "" (empty) or "incompleted" based on the current state
           */
          setIncompleteData={() => setIncompleteData()}
          /**
           * Sets the completed state to "" (empty)
           */
          setCompleted={() => setCompleted("")}
          /**
           * Selects all tasks based on the include/exclude filter
           */
          allSelectArr={() => allSelectArr(filteredArray)}
          /**
           * Removes all selected tasks
           */
          removeSelected={() => {
            setDeleteArr([]);
            setCompleted("");
          }}
        />
        <Add />
        <ul>
          {/**
           * Renders the filtered tasks.
           */}
          {filteredArray.map((item: ItemTypes, index: number) => {
            return (
              <Item
                /**
                 * Selects the task based on the include/exclude filter.
                 */
                selectItem={() => setDeleteArr([...deleteArr, item.id])}
                key={index}
                item={item}
                index={index}
                /**
                 * Array of selected tasks for deletion
                 */
                deleteArr={deleteArr}
                /**
                 * Adds or removes the id to/from the deleteArr based on the include/exclude filter.
                 */
                addDeleteArr={() => addDeleteArr(item.id)}
              />
            );
          })}
        </ul>

        <Count state={state.data} />
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center justify-center w-full  ">
      <ButtonContainer
        /**
         * Array of selected tasks for deletion
         */
        deleteArr={deleteArr}
        /**
         * Sets the completed state to "" (empty) or "completed" based on the current state
         */
        setCompleteData={() => setCompleteData()}
        /**
         * Sets the completed state to "" (empty) or "incompleted" based on the current state
         */
        setIncompleteData={() => setIncompleteData()}
        /**
         * Sets the completed state to "" (empty)
         */
        setCompleted={() => setCompleted("")}
        /**
         * Selects all tasks based on the include/exclude filter
         */
        allSelectArr={() => allSelectArr(state.data)}
        /**
         * Array of all tasks
         */
        filteredArray={state.data}
        /**
         * Removes all selected tasks
         */
        removeSelected={() => {
          setDeleteArr([]);
          setCompleted("");
        }}
      />
      <div>
        <Add />
      </div>
      {/**
       * Renders all tasks.
       */}
      <ul>
        {state.data.map((item: ItemTypes, index: number) => {
          return (
            <Item
              /**
               * Selects the task based on the include/exclude filter.
               */
              selectItem={() => slectOneItem(item.id)}
              key={index}
              item={item}
              index={index}
              /**
               * Array of selected tasks for deletion
               */
              deleteArr={deleteArr}
              /**
               * Adds or removes the id to/from the deleteArr based on the include/exclude filter.
               */
              addDeleteArr={() => addDeleteArr(item.id)}
            />
          );
        })}
      </ul>
      <Count state={state.data} />
    </div>
  );
}

export default App;
