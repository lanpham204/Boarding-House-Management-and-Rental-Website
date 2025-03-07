import { useMemo, useReducer } from "react"

const TodoList = () => {
  const initReducer = { input: undefined, number: undefined }
  const SET_INPUT = "SET_INPUT"
  const SET_NUMBER = "SET_NUMBER"
  const reducerF = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case SET_INPUT:
        return { ...state, input: payload }
      case SET_NUMBER:
        return { ...state, number: payload }
      default:
        throw new Error("action not undifine")
    }
  }
  const [reducer, dispatch] = useReducer(reducerF, initReducer);
  const { input, number } = reducer
  const tinh = () => {
    console.log("tinh");
    let sum = 0;
  }
  return (
    <>
      <h1>{number}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: SET_NUMBER, payload: input });
      }}>
        <input value={input} onChange={(e) => dispatch({ type: SET_INPUT, payload: e.target.value })} />
        <button type="submit">Add</button>
      </form>
      {/* <ul>
        {todos.map((todo, index) => (
          <li key={index + todo}>
            {todo}
            <button onClick={() => dispatch({ type: REMOVE_TODO, payload: index })}>Remove</button>
          </li>
        ))}
      </ul> */}
    </>
  )
}

export default TodoList