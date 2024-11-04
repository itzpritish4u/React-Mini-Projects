import React, { useState } from 'react';
import './App.css';

const checkboxList = [
  {
    label: 'p1',
    id: 1,
    checked: false,
    children: [
      {
        label: 'p1-c1',
        id: 2,
        checked: false,
        children: [
          {
            label: 'p1-c1-c1',
            id: 3,
            checked: false,
            children: [],
          },
          {
            label: 'p1-c1-c2',
            id: 4,
            checked: false,
            children: [
              {
                label: 'p1-c1-c2-c1',
                id: 5,
                checked: false,
                children: [],
              },
              {
                label: 'p1-c1-c2-c2',
                id: 6,
                checked: false,
                children: [
                  {
                    label: 'p1-c1-c2-c2-c1',
                    id: 7,
                    checked: false,
                    children: [],
                  },
                  {
                    label: 'p1-c1-c2-c2-c2',
                    id: 8,
                    checked: false,
                    children: [],
                  },
                ],
              },
              {
                label: 'p1-c1-c2-c3',
                id: 9,
                checked: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: 'p1-c2',
        id: 10,
        checked: false,
        children: [],
      },
      {
        label: 'p1-c3',
        id: 11,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: 'p2',
    id: 12,
    checked: false,
    children: [
      {
        label: 'p2-c1',
        id: 13,
        checked: false,
        children: [],
      },
      {
        label: 'p2-c2',
        id: 14,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: 'p3',
    id: 15,
    checked: false,
    children: [
      {
        label: 'p3-c1',
        id: 16,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: 'p4',
    id: 17,
    checked: false,
    children: [],
  },
];

const Checkbox = ({ id, isChecked, label, onCheckBoxChange }) => (
  <label className="nested_checkbox_label">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => onCheckBoxChange(id, !isChecked)}
    />
    {label}
  </label>
);

const CheckBoxList = ({ childCheckBoxList, onCheckBoxChange }) => (
  <div>
    {childCheckBoxList.map((childBox) => (
      <div key={childBox.id} className="nested_checkbox_child">
        <Checkbox
          id={childBox.id}
          label={childBox.label}
          isChecked={childBox.checked}
          onCheckBoxChange={onCheckBoxChange}
        />
        {childBox.children.length > 0 && (
          <CheckBoxList
            childCheckBoxList={childBox.children}
            onCheckBoxChange={onCheckBoxChange}
          />
        )}
      </div>
    ))}
  </div>
);

const App = () => {
  const [checkList, setCheckList] = useState(checkboxList);

  const toggleAllChildNodes = (list, value) => {
    if (!list) return;
    for (let i = 0; i < list.length; i++) {
      list[i].checked = value;
      toggleAllChildNodes(list[i].children, value);
    }
  };

  const dfs = (list, id, value, isFound) => {
    if (!list || list.length === 0) return isFound;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].checked = value;
        isFound = true;
        toggleAllChildNodes(list[i].children, value);
        break;
      }
      isFound = dfs(list[i].children, id, value, isFound);
      if (isFound) break;
    }
    return isFound;
  };

  const getActiveChildCount = (list) => {
    if (!list || list.length === 0) return 0;
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) count += 1;
      if (list[i].children.length === 0) continue;
      let childCount = getActiveChildCount(list[i].children);
      if (childCount !== list[i].children.length) {
        count = list[i].checked ? count - 1 : count;
        list[i].checked = false;
      } else {
        count = list[i].checked ? count : count + 1;
        list[i].checked = true;
      }
    }
    return count;
  };

  const handleChange = (id, value) => {
    let clone = JSON.parse(JSON.stringify(checkList));
    let isFound = false;
    let parentIndex = 0;

    for (let i = 0; i < clone.length; i++) {
      if (clone[i].id === id) {
        clone[i].checked = value;
        isFound = true;
        parentIndex = i;
        toggleAllChildNodes(clone[i].children, value);
        break;
      }
      isFound = dfs(clone[i].children, id, value, false);
      if (isFound) {
        parentIndex = i;
        break;
      }
    }

    const childCount = getActiveChildCount(clone[parentIndex].children);
    if (clone[parentIndex].children.length > 0) {
      if (childCount !== clone[parentIndex].children.length) {
        clone[parentIndex].checked = false;
      } else {
        clone[parentIndex].checked = true;
      }
    }

    setCheckList(clone);
  };

  return (
    <div className="nested_checkbox_wrapper">
      <CheckBoxList childCheckBoxList={checkList} onCheckBoxChange={handleChange} />
    </div>
  );
};

export default App;
