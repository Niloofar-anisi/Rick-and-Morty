import { allCharacters } from "../data/data";
import "./App.css";
import DetailsCharacter from "./components/DetailsCharacter";
import ListsCharacter from "./components/ListsCharacter";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import Loder from "./components/Loder";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuary] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name= ${query}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites), [
      favourites,
    ]);
  });

  const handleselectedCharacter = (id) => {
    setSelectedId(id);
  };

  const handleAddFavourites = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFavourit = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourites = favourites
    .map((fav) => fav.id)
    .includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuary={setQuary} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourit={handleDeleteFavourit}
        />
      </Navbar>
      <div className="main">
        {isLoading ? (
          <Loder />
        ) : (
          <ListsCharacter
            selectedId={selectedId}
            characters={characters}
            onSelectedCharacter={handleselectedCharacter}
          />
        )}
        <DetailsCharacter
          selectedId={selectedId}
          anAddFavourites={handleAddFavourites}
          isAddToFavourites={isAddToFavourites}
        />
      </div>
    </div>
  );
}

export default App;
