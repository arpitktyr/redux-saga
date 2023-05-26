import { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getCatsFetch } from "./redux/catSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, haveError } = useSelector((state) => state.cat);
  const [keyword, setKeyword] = useState("");
  const [filteredCats, setFilteredCats] = useState([]);
  let debounceTimer;
  const debounceOnChangeHandler = (e) => {
    clearTimeout(debounceTimer);
    const newKeyword = e.target.value;
    debounceTimer = setTimeout(() => {
      setKeyword(newKeyword);
    }, 500);
  };
  //console.log(keyword);

  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);

  //For implementing filter with debounce
  useEffect(() => {
    const filteredCats = data.filter((cat) => {
      return cat.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredCats(filteredCats);
  }, [keyword, data]);

  const highlightSearchKeyword = (title, searchKeyword) => {
    if (!searchKeyword || searchKeyword.length === 0) {
      return title;
    }

    const regex = new RegExp(`(${searchKeyword})`, "gi");
    const parts = title.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchKeyword.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="main">
      <h1>Cat Species Detail </h1>
      <input
        type="search"
        name="search"
        className="search"
        placeholder="Search the cats"
        onChange={debounceOnChangeHandler}
      />
      {keyword && (
        <span className="search-heading">
          Search Result for- <b>{keyword}</b>
        </span>
      )}
      {haveError ? (
        <p className="no-results">{haveError}</p>
      ) : isLoading ? (
        <p className="loading">
          <img src="loading.gif" alt="Data Loading" />
        </p>
      ) : filteredCats.length === 0 ? (
        <p className="no-results">No results found.</p>
      ) : (
        filteredCats.map((cat) => (
          <div key={cat.id} className="card">
            <div className="left">
              <img
                src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                alt={cat.name}
              />
            </div>
            <div className="right">
              <a
                href={cat.wikipedia_url}
                className="cat-name"
                rel="noreferrer"
                target="_blank"
              >
                {highlightSearchKeyword(cat.name, keyword)}
              </a>

              <h4 className="tempera">{cat.temperament}</h4>
              <h5 className="origin">
                Origin Place : {cat.origin} &nbsp; Weight : {cat.weight.metric}{" "}
                Kg.
              </h5>
              <p>{cat.description}</p>
              <div className="row">
                <div className="left">
                  <div className="bar">
                    <label htmlFor="adapt">Adaptability </label>
                    <progress
                      id="adapt"
                      value={cat.adaptability}
                      max="5"
                    ></progress>
                  </div>
                  <div className="bar">
                    <label htmlFor="energy">Energy Level</label>
                    <progress
                      id="energy"
                      value={cat.energy_level}
                      max="5"
                    ></progress>
                  </div>
                  <div className="bar">
                    <label htmlFor="child">Child Friendly </label>
                    <progress
                      id="child"
                      value={cat.child_friendly}
                      max="5"
                    ></progress>
                  </div>
                </div>
                <div className="right">
                  <a
                    href={cat.wikipedia_url}
                    className="bottom-link"
                    target="_blank"
                  >
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
