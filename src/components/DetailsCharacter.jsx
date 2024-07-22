import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loder from "./Loder";
import toast from "react-hot-toast";

function DetailsCharacter({ selectedId, anAddFavourites, isAddToFavourites }) {
  const [character, setCharacter] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoding(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoding) {
    return (
      <div className="loading">
        <Loder />
      </div>
    );
  }

  if (!character || !selectedId)
    return <div className="loading"> Please Select Character</div>;

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavourites={isAddToFavourites}
        anAddFavourites={anAddFavourites}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default DetailsCharacter;

function CharacterSubInfo({ character, isAddToFavourites, anAddFavourites }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span> {character.gender === "Male" ? "👦🏻" : "👩🏻‍🦰"}</span>
          <span> {character.name} </span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span>&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>last know location</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourites ? (
            <p>Added to favorit ✅</p>
          ) : (
            <button
              onClick={() => anAddFavourites(character)}
              className="btn btn--primary"
            >
              Add to favorit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [SortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (SortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>list of episodes:</h2>

        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: SortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} -{" "}
              <strong>{item.name}</strong>
              <strong> {item.name} </strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
