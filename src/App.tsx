import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "./Redux/store";
import {
  createNewDoc,
  deleteAllCompleted,
  deleteDoc,
  getAllItems,
  updateDocCompleted,
  updateDocIncompleted,
} from "./Redux/actions";
import { ItemTypes } from "./Types";

function App() {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState("");
  const [deleteArr, setDeleteArr] = useState<string[]>([]);
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const addDeleteArr = (id: string) => {
    if (deleteArr.includes(id)) {
      setDeleteArr(deleteArr.filter((item) => item !== id));
    } else {
      setDeleteArr([...deleteArr, id]);
    }
  };

  const setCompleteData = () => {
    completed == "completed" ? setCompleted("") : setCompleted("completed");
  };

  const setIncompleteData = () => {
    completed == "incompleted" ? setCompleted("") : setCompleted("incompleted");
  };

  const allDeleteArr = (arr: ItemTypes[]) => {
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

  if (state.isLoading)
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );

  if (completed !== "") {
    let filteredArray: ItemTypes[] = [];
    completed != "incompleted"
      ? (filteredArray = state.data.filter((item) => item.completed))
      : (filteredArray = state.data.filter((item) => !item.completed));

    return (
      <div className="App">
        <button onClick={() => allDeleteArr(filteredArray)}>select all</button>
        <button onClick={() => dispatch(deleteDoc(deleteArr))}>
          Delete selected{" "}
        </button>

        <button onClick={() => setCompleteData()}>Get completed</button>
        <button onClick={() => setIncompleteData()}>Get incomplete</button>
        <button onClick={() => setCompleted("")}>Show all</button>
        <button onClick={() => dispatch(deleteAllCompleted())}>
          Delete all completed
        </button>
        <div>
          <input type="text" onChange={(e) => setText(e.target.value)} />
          <button
            onClick={() => {
              dispatch(createNewDoc(text));
              setText("");
            }}
          >
            Add
          </button>
        </div>
        {filteredArray.map((item: ItemTypes, index) => {
          return (
            <div key={index} style={{ display: "flex", flexDirection: "row" }}>
              {deleteArr.includes(item.id) && <p>deleted</p>}
              <button title="delete" onClick={() => addDeleteArr(item.id)} />
              <p>{item.text}</p>
            </div>
          );
        })}
        <p>{state.data.filter((item) => item.completed).length}</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* <button
        onClick={() => {
          dispatch(getCompletedItems());
        }}
      >
        Get completed Items
      </button> */}

      <button onClick={() => allDeleteArr(state.data)}>select all</button>
      <button onClick={() => dispatch(deleteDoc(deleteArr))}>
        Delete selected{" "}
      </button>

      {/* <button onClick={() => dispatch(getCompleted())}>Get completed</button>
      <button onClick={() => dispatch(getIncomplete())}>Get incomplete</button> */}
      <button onClick={() => setCompleteData()}>get completed</button>
      <button onClick={() => setIncompleteData()}>Get incomplete</button>
      <button onClick={() => dispatch(deleteAllCompleted())}>
        Delete all completed
      </button>
      <div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => {
            dispatch(createNewDoc(text));
            setText("");
          }}
        >
          Add
        </button>
      </div>
      {state.data.map((item: ItemTypes, index) => {
        return (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            {deleteArr.includes(item.id) && <p>deleted</p>}
            <button title="delete" onClick={() => addDeleteArr(item.id)} />
            <p>{item.text}</p>
            {item.completed ? (
              <button onClick={() => dispatch(updateDocIncompleted(item.id))}>
                Incomplete
              </button>
            ) : (
              <button onClick={() => dispatch(updateDocCompleted(item.id))}>
                complete
              </button>
            )}
          </div>
        );
      })}

      <p>{state.data.filter((item) => item.completed).length}</p>
    </div>
  );
}

export default App;
