/**
 * Composant fonctionnel pour une liste déroulante (Dropdown).
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.dropdownData - Les données de la liste déroulante.
 * @param {Function} props.onChange - Fonction appelée lorsqu'une sélection est modifiée.
 * @param {boolean} [props.onReset=false] - Indique si le dropdown doit être réinitialisé.
 * @param {string} [props.name] - Nom du composant.
 * @param {string} [props.id] - Identifiant du composant.
 * @returns {JSX.Element} Composant Dropdown.
 */
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

  /**
   * Fonction pour basculer l'état d'ouverture du dropdown.
   * @function
   * @returns {void}
   */
  const toogleDropdown = () => {
    setDropdownIsOpen((state) => !state);
    setDropdownZIndex((dropdownZIndex) => (dropdownZIndex === 0 ? 10 : 0));
    if (filteredDropdownData.length < dropdownData.length) {
      setFilteredDropdownData([...dropdownData]);
    }
  };

  /**
   * Gestion du clic sur une sélection dans le dropdown.
   * @function
   * @param {Event} e - Objet événement du clic.
   * @returns {void}
   */
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

  /**
   * Filtrage des données du dropdown en fonction de la saisie de l'utilisateur.
   * @function
   * @param {Event} e - Objet événement de la saisie.
   * @returns {void}
   */
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

  /**
   * Effet secondaire pour déclencher la fonction onChange lorsque la sélection change.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    onChange(dropdownSelection);
  }, [dropdownSelection]);

  /**
   * Effet secondaire pour réinitialiser le dropdown en cas de changement de onReset.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    if (onReset) {
      setDropdownIsOpen(false);
      setDropdownSelection(dropdownData[0]);
      setFilteredDropdownData([...dropdownData]);
      setDropdownZIndex(0);
    }
  }, [onReset]);

  /**
   * Gestion du clic en dehors du dropdown pour le fermer.
   * @function
   * @param {Event} event - Objet événement du clic en dehors du dropdown.
   * @returns {void}
   */
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toogleDropdown();
    }
  };

  /**
   * Effet secondaire pour ajouter ou supprimer le gestionnaire de clic en dehors du dropdown.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    if (dropdownIsOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    /**
     * Nettoyage du gestionnaire de clic en dehors du dropdown lors du démontage du composant.
     * @function
     * @returns {void}
     */
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

/**
 * Validation des types de propriétés (props).
 * @static
 * @type {Object}
 */
Dropdown.propTypes = {
  dropdownData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Dropdown;
