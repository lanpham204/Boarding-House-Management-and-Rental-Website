import { useReducer } from "react";

const Reduser = () => {
    const cong = "cong";
    const tru = "tru";
    const initReducer = 0
    const reducer = (state, action) => {
        switch (action) {
            case cong:
                return state + 1
            case tru:
                return state - 1
            default:
                throw new Error("error: unknown action");
        }
    }
    const [count, dispatch] = useReducer(reducer, initReducer)
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div>
                <h1>{count}</h1>
                <div >
                    <button className="btn btn-primary" onClick={() => dispatch(cong)}>+</button>
                    <button className="btn btn-warning" onClick={() => dispatch(tru)}>-</button>
                </div>
            </div>
        </div>
    )
}

export default Reduser