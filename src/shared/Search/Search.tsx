import React, { ChangeEventHandler } from 'react';
import styles from './Search.module.scss';

type SearchProps = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: () => void;
  onClear: () => void;
  value: string;
};

const Search = ({ onChange, onClear, onSubmit, value }: SearchProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
    return;
  };

  return (
    <div className={styles.search}>
      <div className={styles.wrapper}>
        <input
          type="text"
          name="Search"
          onChange={onChange}
          value={value}
          onKeyDown={handleKeyDown}
          onBlur={onClear}
        />
        {value.length > 0 && <span onClick={onClear}>&times;</span>}
      </div>
      <button type="submit" onClick={onSubmit}>
        Search
      </button>
    </div>
  );
};

export default Search;
