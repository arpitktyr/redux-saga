import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

const Modal = ({ onClose, isOpen, cat }) => {
  const modalRef = useRef(null);
  // Use a map to store the qualities and their corresponding keys
  const quality = [];
  const qualitiesMap = {
    natural: "Natural",
    rare: "Rare",
    hairless: "Hairless",
    experimetal: "Experimental",
    short_legs: "Short Legs",
    suppressed_tail: "Suppressed Tail",
    outdoor: "Outdoor",
  };

  // Iterate over the keys in the qualities map
  Object.keys(qualitiesMap).forEach((key) => {
    // Check if the key exists in the cat object
    if (cat.hasOwnProperty(key) && !!cat[key]) {
      // Push the quality to the array
      quality.push(qualitiesMap[key]);
    }
  });

  useEffect(() => {
    // When the modal is opened, focus on the first focusable element inside it
    modalRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      // Close the modal when the Escape key is pressed
      onClose();
    }
  };

  if (!isOpen.status) {
    return null; // Return null if the modal is not open
  }

  return ReactDOM.createPortal(
    <div
      className="modal"
      tabIndex={-1}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      {/* Modal content */}

      <div className="model-content">
        <button className="close" onClick={onClose}>
          Close
        </button>
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
              {cat.name}
            </a>

            <h4 className="tempera">{cat.temperament}</h4>
            <h5 className="origin">
              Origin Place : {cat.origin} &nbsp; Weight : {cat.weight.metric}{" "}
              Kg.
            </h5>
            <h5 className="origin">Life Span : {cat.life_span} years </h5>

            <p>{cat.description}</p>
            {quality.map((item) => {
              return (
                <span className="quality" key={item}>
                  {item}
                </span>
              );
            })}
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
                <div className="bar">
                  <span className="progress-label">Health Issues </span>
                  <progress
                    value={cat.affection_level}
                    max="5"
                    aria-valuetext={`${cat.affection_level} out of 5`}
                  ></progress>
                </div>
              </div>
              <div className="right">
                <div className="bar">
                  <span className="progress-label">Affection Level</span>
                  <progress
                    value={cat.affection_level}
                    max="5"
                    aria-valuetext={`${cat.affection_level} out of 5`}
                  ></progress>
                </div>
                <div className="bar">
                  <span className="progress-label">Stranger Friendly</span>
                  <progress
                    value={cat.stranger_friendly}
                    max="5"
                    aria-valuetext={`${cat.stranger_friendly} out of 5`}
                  ></progress>
                </div>
                <div className="bar">
                  <span className="progress-label">Dog Friendly </span>
                  <progress
                    value={cat.dog_friendly}
                    max="5"
                    aria-valuetext={`${cat.dog_friendly} out of 5`}
                  ></progress>
                </div>
                <div className="bar">
                  <span className="progress-label">Social Needs </span>
                  <progress
                    value={cat.social_needs}
                    max="5"
                    aria-valuetext={`${cat.social_needs} out of 5`}
                  ></progress>
                </div>
              </div>
            </div>
            <div>
              <p> Quick Reference Links </p>
              <a
                href={cat.wikipedia_url}
                target="_blank"
                rel="noreferrer"
                className="bottom-link"
              >
                wikipedia
              </a>{" "}
              &nbsp;
              <a
                href={cat.vcahospitals_url}
                target="_blank"
                rel="noreferrer"
                className="bottom-link"
              >
                Vca Hospitals
              </a>{" "}
              &nbsp;
              <a
                href={cat.vetstreet_url}
                target="_blank"
                rel="noreferrer"
                className="bottom-link"
              >
                Vetstreet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
