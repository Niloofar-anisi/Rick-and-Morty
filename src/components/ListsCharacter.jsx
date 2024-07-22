import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";

function ListsCharacter({ characters, onSelectedCharacter, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            className="icon red"
            onClick={() => {
              onSelectedCharacter(item.id);
            }}
          >
            {selectedId === item.id ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default ListsCharacter;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👦🏻" : "👩🏻‍🦰"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
