import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from '../styles.module.css';
import { areItemsFromSingleGroup } from '../utils/AllFunctions';

const StatusOptions = {
  Success: "success",
  Failure: "failure",
};

const GridUI = forwardRef(function GridUI({ items, cols, onSelection, status }, ref) {
  const [selected, setSelected] = useState([]);

  const markSelection = (item) => {
    if (status) {
      return;
    }

    let newSelected = [];
    if (selected.includes(item)) {
      newSelected = selected.filter((i) => i !== item);
    } else {
      newSelected = [...selected, item];
    }

    setSelected(newSelected);
    onSelection(newSelected);
  };

  function clearSelection() {
    setSelected([]);
  }

  useImperativeHandle(ref, () => ({ clearSelection }));

  return (
    <section
      data-status={status}
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {items.map((item) => {
        const isSelected = selected.includes(item);
        const className = `${styles.itemBtn} ${isSelected ? styles.highlight : ''} ${
          isSelected && status ? styles[status] : ''
        }`;
        return (
          <button key={item} className={className} onClick={() => markSelection(item)}>
            {item}
          </button>
        );
      })}
    </section>
  );
});

function Game({ itemGroups, allItems, columns = 2, groupSize }) {
  const [items, setItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null);
  const gridUIRef = useRef(null);

  useEffect(() => {
    setItems(allItems);
    setAttempts(0);
    setStatus(null);
    gridUIRef.current?.clearSelection();
  }, [allItems]);

  function onSelection(selected) {
    if (selected.length === groupSize) {
      setAttempts(attempts + 1);
      const newStatus = areItemsFromSingleGroup(itemGroups, selected)
        ? StatusOptions.Success
        : StatusOptions.Failure;
      setStatus(newStatus);
      const timeoutId = setTimeout(() => unHighlight(selected, newStatus), 1000);
      return () => clearTimeout(timeoutId);
    }
  }

  function unHighlight(itemsForRemoval, status) {
    if (status === StatusOptions.Success) {
      setItems(items.filter((item) => !itemsForRemoval.includes(item)));
    }
    setStatus(null);
    gridUIRef.current?.clearSelection();
  }

  return (
    <>
      {items.length ? (
        <GridUI
          items={items}
          cols={columns}
          onSelection={onSelection}
          status={status}
          ref={gridUIRef}
        />
      ) : (
        <p className={styles.center}>Well done. Reset to play again!</p>
      )}

      <p className={styles.center}>
        Attempts: <strong>{attempts}</strong>
      </p>
    </>
  );
}

export default Game;
