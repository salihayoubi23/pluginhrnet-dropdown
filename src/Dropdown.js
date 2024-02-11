// Import des modules nécessaires depuis React et Prop-Types
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./DropdownStyles.css"; // Importez le fichier CSS pour les styles du composant

// Déclaration du composant fonctionnel Dropdown avec les props
const Dropdown = ({
  dropdownData,
  onChange,
  onReset = false,
  name = Math.random(),
  id = Math.random(),
}) => {
  // États du composant
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dropdownSelection, setDropdownSelection] = useState(dropdownData[0]);
  const [filteredDropdownData, setFilteredDropdownData] = useState([
    ...dropdownData,
  ]);
  const [dropdownZIndex, setDropdownZIndex] = useState(0);
  const dropdownRef = useRef(null);

  // Fonction pour basculer l'état d'ouverture du dropdown
  const toogleDropdown = () => {
    setDropdownIsOpen((state) => !state);
    setDropdownZIndex((dropdownZIndex) => (dropdownZIndex === 0 ? 10 : 0));
    if (filteredDropdownData.length < dropdownData.length) {
      setFilteredDropdownData([...dropdownData]);
    }
  };

  // Gestion du clic sur une sélection dans le dropdown
  const handleSelectionClick = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName && tagName === "p") {
      setDropdownSelection(e.target.innerText);
    }
    if (tagName && tagName === "div") {
      const p = e.target.querySelector("p");
      setDropdownSelection(p.innerText);
    }
    toogleDropdown();
  };

  // Filtrage des données du dropdown en fonction de la saisie de l'utilisateur
  const filterData = (e) => {
    let search = e.target.value;
    if (typeof search === "string") {
      search = search.toLowerCase();
    }
    setFilteredDropdownData(
      dropdownData.filter((elem) => {
        if (typeof elem === "string") {
          elem = elem.toLowerCase();
        }
        return elem.includes(search);
      })
    );
  };

  // Effet secondaire pour déclencher la fonction onChange lorsque la sélection change
  useEffect(() => {
    onChange(dropdownSelection);
  }, [dropdownSelection]);

  // Effet secondaire pour réinitialiser le dropdown en cas de changement de onReset
  useEffect(() => {
    if (onReset) {
      setDropdownIsOpen(false);
      setDropdownSelection(dropdownData[0]);
      setFilteredDropdownData([...dropdownData]);
      setDropdownZIndex(0);
    }
  }, [onReset]);

  // Gestion du clic en dehors du dropdown pour le fermer
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toogleDropdown();
    }
  };

  // Effet secondaire pour ajouter ou supprimer le gestionnaire de clic en dehors du dropdown
  useEffect(() => {
    if (dropdownIsOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    // Nettoyage du gestionnaire de clic en dehors du dropdown lors du démontage du composant
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownIsOpen]);

  // Rendu du composant Dropdown
  return (
    <div className="DropdownWrapper BaseContainer" ref={dropdownRef}>
      <input
        className="InputBtn"
        type="button"
        value={dropdownSelection}
        onClick={() => {
          toogleDropdown();
        }}
        name={name}
        id={id}
      />
      {dropdownIsOpen && (
        <div className="DropdownMenu BaseContainer">
          <input
            className="SearchBar"
            type="text"
            placeholder="Search"
            onChange={(e) => filterData(e)}
          />
          {filteredDropdownData.length && filteredDropdownData.length > 0 ? (
            filteredDropdownData.map((elem, index) => (
              <div
                className="DropdownSelectionContainer"
                key={`dropdownMenu__selectionContainer` + index}
                onClick={(e) => handleSelectionClick(e)}
              >
                <p className="DropdownSelection">{elem}</p>
              </div>
            ))
          ) : (
            <p className="NoDataErrMsg">No content to display after search</p>
          )}
        </div>
      )}
    </div>
  );
};

// Validation des types de propriétés (props)
Dropdown.propTypes = {
  dropdownData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};
// Export du composant Dropdown pour une utilisation dans d'autres fichiers
export default Dropdown;
