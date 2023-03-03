import { useState } from 'react';
import { useFetchPokemon } from '../../api';
import { TYPE_COLORS } from '../../constants';
import styles from './PokemonCard.module.scss';

type PokemonCardType = {
  name: string;
};

const PokemonCard = ({ name }: PokemonCardType) => {
  const { data, isLoading } = useFetchPokemon(name);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.card}>
      {isLoading && <div>Loading...</div>}
      {data && (
        <>
          <img
            className={styles.image}
            style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            src={
              // data.sprites.other?.['official-artwork'].front_default ||
              data.sprites.other?.home.front_default ||
              data.sprites.front_default ||
              ''
            }
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
          <div className={styles.details}>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.type}>
              {data.types.map((item) => (
                <div
                  key={item.type.name}
                  className={styles['type-item']}
                  style={{
                    backgroundColor: TYPE_COLORS[item.type.name],
                  }}
                >
                  {item.type.name}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
