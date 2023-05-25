import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getCatsFetch } from "./redux/catSlice";

function App() {
  const { data, isLoading } = useSelector((state) => state.cat);
  console.log(data, isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);

  return (
    <div className="main">
      <h1>Cat Species Detail </h1>

      {data.map((cat) => (
        <div key={cat.id} className="row">
          <div className="card">
            <h2>{cat.name}</h2>
            <h4>{cat.temperament}</h4>
            <p>{cat.description}</p>
            <a href={cat.wikipedia_url}>More Detail</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
