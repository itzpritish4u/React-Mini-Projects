import { getConnectedGroups } from './utils/AllFunctions';
import { useEffect, useState } from 'react';
import Game from './components/Game';
import { Leva, useControls } from 'leva';
import styles from './styles.module.css';

const App = () => {
  const { groupSize } = useControls({ groupSize: { value: 2, min: 2, max: 4, step: 1 } });
  const { itemCount } = useControls({ itemCount: { value: 8, min: 4, max: 12, step: 1 } });
  const { columns } = useControls({ columns: { value: 4, min: 2, max: 4, step: 1 }});

  const [itemGroups, setItemsGroup] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const resetItems = () => {
    const [newItemGroups, newAllItems] = getConnectedGroups(itemCount, groupSize);
    setItemsGroup(newItemGroups);
    setAllItems(newAllItems);
  };

  useEffect(() => {
    resetItems();
  }, [itemCount, groupSize]);

  return (
    <>
      <Leva
        collapsed
        titleBar={{ position: { x: 0, y: 40 }, filter: false, title: 'Config' }}
        theme={{
          colors: {
            highlight1: 'white',
            highlight2: 'white',
          },
        }}
      />

      <h3 className={styles.center}>
        Connect group of {groupSize} words by clicking on related words
      </h3>
      <Game itemGroups={itemGroups} allItems={allItems} columns={columns} groupSize={groupSize} />
      <div className={styles.center}>
        <button className={styles.reset} onClick={resetItems} style={styles.reset ? {} : {
          backgroundColor: 'blue',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          border: 'none'
        }}>
          Reset
        </button>
      </div>
    </>
  );
};

export default App;
