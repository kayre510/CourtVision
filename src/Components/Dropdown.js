import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";

export const Dropdown = ({ playerPhoto, placeHolder, isSearchable, onStateChange}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [player1, setPlayer1] = useState("")
  const [childstate, setChildstate] = useState("")
  const searchRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
        searchRef.current.focus();
    }
}, [showMenu])

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });




  const handlePlayer1Change = (event) => {
    setPlayer1(event.target.value);
  };


  const handleInputClick = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const onSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const getOptions = () => {
    if (!searchValue) {
        return playerPhoto
    }
    return playerPhoto.filter((player) => player.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0)
  }

  const Icon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.name;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    onStateChange(option.name)
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.name === playerPhoto.name;
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-input" onClick={handleInputClick}>
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool"></div>
        </div>
<Icon />
        {showMenu && (

        <div className="">
            {isSearchable && (
                <div className="search-box">
                    <input onChange={onSearch} value={searchValue} ref={searchRef} />
                    </div>
            )}

          {getOptions().map((player) => (
            <div
              onClick={() => onItemClick(player)}
              key={player.name}
              className={`dropdown-item ${isSelected(playerPhoto) && "selected"}`}
            >
              {player.name}
            </div>
          ))}
      </div>
  )}
  </div>



    </div>
  );
};
