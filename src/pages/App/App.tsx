import styles from './App.module.scss';
import { useFetchPokemons } from '../../api';
import Search from '../../shared/Search';
import { ChangeEvent, useState } from 'react';
import PokemonCard from '../../shared/PokemonCard';

const App = () => {
  const { data, status } = useFetchPokemons();
  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string>('');

  const pokemons = data?.results.map((item, index) => {
    const id = index + 1;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { ...item, id, image };
  });

  const filteredData = pokemons?.filter((pokemon) => {
    if (searchValue.length < 1) return pokemon;
    return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setSearchValue(event.target.value);
  };

  const handleOnSubmit = () => {
    setSearchValue(value);
  };

  const handleOnClear = () => {
    setValue('');
    setSearchValue('');
  };

  return (
    <div className={styles.app}>
      <h1>Pokédex</h1>
      <Search
        onChange={handleOnChange}
        value={value}
        onSubmit={handleOnSubmit}
        onClear={handleOnClear}
      />
      {selectedPokemon && (
        <div className={styles.render}>
          <PokemonCard name={selectedPokemon} />
        </div>
      )}
      <>
        {status === 'error' && <>Oh no, there was an error</>}
        {status === 'loading' && <>Loading...</>}
        {status === 'success' && (
          <div className={styles.container}>
            {filteredData &&
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={styles.pokemon}
                  onClick={() => setSelectedPokemon(item.name)}
                >
                  <span>{item.id}</span>
                  <img src={item.image} width={60} height={60} />
                  <div className={styles.name}>{item.name}</div>
                </div>
              ))}
          </div>
        )}
      </>
    </div>
  );
};

export default App;
