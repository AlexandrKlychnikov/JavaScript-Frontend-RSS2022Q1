/* eslint-disable import/extensions */
import { MouseEvent, useState } from 'react';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { NUMBER_OF_CARDS } from './components/main/catalog/catalogList';
import './app.css';
import Main from './components/main/Main';
import 'typeface-roboto';
import LocalStorage from './utils/Storage';

const App = (): JSX.Element => {
  const styles = {
    root: {
      fontFamily: 'Roboto',
    },
  };

  const storage = new LocalStorage();

  const [searchBarState, setSearchBarState] = useState('');

  const handleChangeSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarState(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchBarState('');
    const input = document.querySelector('.input') as HTMLInputElement;
    input.value = '';
  };

  const [isSelected, setIsSelected] = useState<boolean[]>(
    storage.get('isSelected') || [...Array(NUMBER_OF_CARDS)].fill(false)
  );

  const [isModal, setIsModal] = useState(false);

  const amount = storage.get('amount') || '0';

  const handleChangeIsSelected = (e: MouseEvent<Element>) => {
    const card = e.currentTarget as Element;
    const { id } = card;
    if (isSelected[+id]) {
      storage.set('amount', `${+amount - 1}`);
    } else {
      if (+amount === 20) {
        setIsModal(true);
        return;
      }
      storage.set('amount', `${+amount + 1}`);
    }
    setIsSelected((prevState) => {
      const state = [...prevState];
      state[+id] = !prevState[+id];
      storage.set('isSelected', state);
      return state;
    });
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <div className="App" style={styles.root}>
      <Header
        amount={amount}
        handleCloseModal={handleCloseModal}
        isModal={isModal}
      />
      <Main
        handleChangeIsSelected={handleChangeIsSelected}
        handleChangeSearchBar={handleChangeSearchBar}
        handleClearSearch={handleClearSearch}
        isSelected={isSelected}
        searchBarState={searchBarState}
      />
      <Footer />
    </div>
  );
};

export default App;
