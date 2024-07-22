import { FilmIcon, HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./ListsCharacter";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="navbar__logo">
      <FilmIcon className="icon" />
    </div>
  );
}

export function Search({ query, setQuary }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuary(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    ></input>
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} characters</div>;
}

export function Favourites({ favourites, onDeleteFavourit }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of favourites">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourit(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </div>
  );
}

export default Navbar;
