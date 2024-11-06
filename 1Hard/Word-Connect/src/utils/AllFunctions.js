import { connectedWords } from './Data';

export function getRandomItems(count, items) {
  const randomItems = [];
  const set = new Set();

  for (let i = 0; i < count; i++) {
    const randomPos = Math.floor(Math.random() * items.length);
    if (set.has(randomPos)) {
      continue;
    }

    randomItems.push(items[randomPos]);
    set.add(randomPos);
  }

  return randomItems;
}

export const shuffleArrayRandomly = (items) => {
  const n = items.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * (n - i));

    const temp = items[n - i - 1];
    items[n - i - 1] = items[idx];
    items[idx] = temp;
  }

  return items;
};

export function getConnectedGroups(count = 4, groupSize = 2) {
  const connectedWordsGroup = connectedWords.get(groupSize);
  const randomItemsGroup = getRandomItems(count, connectedWordsGroup);
  const itemGroups = [];
  randomItemsGroup.forEach((group) => {
    itemGroups.push(new Set(group));
  });
  const allItems = shuffleArrayRandomly(randomItemsGroup.flat());

  return [itemGroups, allItems];
}

export function areItemsFromSingleGroup(itemGroups, selectedItems) {
  const group = itemGroups.find((group) => group.has(selectedItems[0]));
  console.log(selectedItems);
  
  if (!group) {
    return false;
  }

  return selectedItems.every((item) => group.has(item));
}
