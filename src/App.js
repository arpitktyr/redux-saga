import { useEffect, useState, useRef } from "react";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCatsFetch } from "./redux/catSlice";
import Modal from "./Model";
import { HelmetProvider, Helmet } from "react-helmet-async";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, haveError } = useSelector((state) => state.cat);
  const [keyword, setKeyword] = useState("");
  const [filteredCats, setFilteredCats] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState({});

  const [modelData, setModelData] = useState({});

  //created ref array for button for send back focus state
  const buttonRefs = useRef([]);
  const listDiv = useRef(null);
  const openModal = (data, index) => {
    setIsModalOpen({ status: true, index });
    setModelData(data);
  };

  //close Model Function
  const closeModal = () => {
    const i = isModalOpen.index;
    buttonRefs.current[i].focus();
    setIsModalOpen({ status: false, index: 0 });
  };

  let debounceTimer;
  const debounceOnChangeHandler = (e) => {
    clearTimeout(debounceTimer);
    const newKeyword = e.target.value;
    debounceTimer = setTimeout(() => {
      setKeyword(newKeyword);
      setCurrentPage(1);
    }, 500);
  };
  //fetch data from server when page load, we have to send page number,
  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);

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

  //For implementing filter with debounce
  useEffect(() => {
    const filteredCats = data.filter((cat) => {
      return cat.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setTotalPages(Math.ceil(filteredCats.length / itemsPerPage));
    setFilteredCats(filteredCats.slice(firstIndex, lastIndex));
  }, [keyword, data, firstIndex, lastIndex, itemsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //current page must be in limit only, incase of invalid-page set to page 1
  if (currentPage && totalPages && currentPage > totalPages) {
    setCurrentPage(1);
  }

  // Handle page click event
  //change page data and title and scroll to top, move focus to top
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      listDiv.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <HelmetProvider>
      <div className="main">
        <Helmet>
          <title>Cat App {currentPage ? `| Page ${currentPage}` : ""}</title>
        </Helmet>
        <h1>Cat Species Detail </h1>
        <input
          type="search"
          name="search"
          className="search"
          aria-describedby="Search cats by bread name"
          placeholder="Search cats by bread name"
          onChange={debounceOnChangeHandler}
        />

        <div className="filter-area">
          <div className="per-page">
            <label htmlFor="pagecount">Items Per Page</label>
            <select id="pagecount" onChange={handleItemsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          {keyword && (
            <span className="search-heading">
              Search Result for- <b>{keyword}</b>
            </span>
          )}
        </div>

        {/* this will tell the screen reader on which page he is currently */}
        <div className="sr-only" aria-live="assertive" aria-atomic="true">
          {filteredCats.length !== 0
            ? `Page ${currentPage} out of ${totalPages}`
            : `No result found for ${keyword}`}
        </div>

        {haveError ? (
          <p className="no-results">{haveError}</p>
        ) : isLoading ? (
          <p className="loading">
            <img src="loading.gif" alt="Loading" />
          </p>
        ) : filteredCats.length === 0 ? (
          <p className="no-results">No results found.</p>
        ) : (
          <div className="card-prent" ref={listDiv} tabIndex="-1">
            {filteredCats.map((cat, index) => (
              <div
                key={cat.id}
                className="card"
                aria-describedby={`desc-${cat.id}`}
              >
                <div className="left">
                  <img
                    src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                    alt={cat.name}
                  />
                </div>
                <div className="right">
                  <p className="cat-name" id={`cat-${cat.id}`}>
                    {highlightSearchKeyword(cat.name, keyword)}
                  </p>

                  <h4 className="tempera">{cat.temperament}</h4>
                  <h5 className="origin">
                    Origin Place : {cat.origin} &nbsp; Weight :{" "}
                    {cat.weight.metric} Kg.
                  </h5>
                  <p id={`desc-${cat.id}`}>{cat.description}</p>
                  <div className="row">
                    <div className="left">
                      <div className="bar">
                        <span className="progress-label">Adaptability</span>
                        <progress
                          value={cat.adaptability}
                          max="5"
                          aria-valuetext={`${cat.adaptability} out of 5`}
                        ></progress>
                      </div>
                      <div className="bar">
                        <span className="progress-label">Energy Level</span>
                        <progress
                          value={cat.energy_level}
                          max="5"
                          aria-valuetext={`${cat.energy_level} out of 5`}
                        ></progress>
                      </div>
                      <div className="bar">
                        <span className="progress-label">Child Friendly</span>
                        <progress
                          value={cat.child_friendly}
                          max="5"
                          aria-valuetext={`${cat.child_friendly} out of 5`}
                        ></progress>
                      </div>
                    </div>
                    <div className="right">
                      <button
                        aria-label={`Click to see more detail about ${cat.name}`}
                        onClick={() => openModal(cat, index)}
                        className="bottom-link"
                        ref={(ref) => (buttonRefs.current[index] = ref)} // Assign the ref to the button
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen?.status && (
          <Modal onClose={closeModal} isOpen={isModalOpen} cat={modelData} />
        )}
        {pageNumbers && pageNumbers.length > 1 && (
          <div className="page-list">
            <nav aria-label="nav">
              <ul className="ul-list">
                {pageNumbers.map((number) => (
                  <li
                    className={
                      currentPage === number ? "page-item active" : "page-item"
                    }
                    key={number}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(number)}
                      aria-current={currentPage === number ? "Page" : undefined}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
