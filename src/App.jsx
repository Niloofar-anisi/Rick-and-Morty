import "./App.css";
import DetailsCharacter from "./components/DetailsCharacter";
import ListsCharacter from "./components/ListsCharacter";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import Loder from "./components/Loder";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuary] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);

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
