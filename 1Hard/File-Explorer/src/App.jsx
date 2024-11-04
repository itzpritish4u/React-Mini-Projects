import React, { useState } from 'react';
import './App.css'; // Make sure to add this line to import the CSS file

const initialData = [
  {
    type: "folder",
    name: "root",
    children: [
      {
        type: "folder",
        name: "public",
        children: [
          {
            type: "folder",
            name: "images",
            children: [
              { type: "file", name: "cover.png" },
              {
                type: "folder",
                name: "icons",
                children: [{ type: "file", name: "arrow.svg" }],
              },
            ],
          },
          { type: "file", name: "public_nested_file" },
        ],
      },
      {
        type: "folder",
        name: "src",
        children: [
          {
            type: "folder",
            name: "components",
            children: [
              { type: "file", name: "index.js" },
            ],
          },
          { type: "file", name: "index.html" },
          { type: "file", name: "index.css" },
          { type: "file", name: "main.jsx" },
          { type: "file", name: "App.jsx" },
          { type: "file", name: "app.module.css" },
        ],
      },
      {
        type: "folder",
        name: "dist",
        children: [
          { type: "file", name: "index.js" },
          { type: "file", name: "index.html" },
          { type: "file", name: "index.css" },
        ],
      },
      { type: "file", name: "package.json" },
      { type: "file", name: "package-lock.json" },
    ],
  },
];

const FileTree = ({ data, onAdd, onEdit, onDelete }) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [editItemName, setEditItemName] = useState(null); // Track the name of the item being edited
  const [newItem, setNewItem] = useState(null);

  const toggleFolder = (name) => {
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleEdit = (item) => {
    setEditItemName(item.name); // Set the name of the item being edited
  };

  const handleAdd = (parent, type) => {
    setNewItem({ parent, name: "", type });
  };

  const handleDelete = (item) => {
    onDelete(item);
  };

  const handleEditChange = (e) => {
    setEditItemName(e.target.value);
  };

  const renderTree = (node, parent) => {
    return (
      <div key={node.name} className="file-tree-item">
        {node.type === 'folder' ? (
          <>
            <div
              onClick={() => toggleFolder(node.name)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              className="file-folder"
            >
              {expandedFolders[node.name] ? '📂' : '📁'}{' '}
              {editItemName === node.name ? ( // Check by name for edit mode
                <input
                  value={editItemName}
                  onChange={handleEditChange}
                  onBlur={() => {
                    onEdit(node, editItemName); // Commit edit on blur
                    setEditItemName(null);
                  }}
                  autoFocus
                />
              ) : (
                <>
                  {node.name}
                  <div className="icon-container">
                    <span role="img" aria-label="edit" onClick={(e) => { e.stopPropagation(); handleEdit(node); }}>✏️</span>
                    <span role="img" aria-label="add-file" onClick={(e) => { e.stopPropagation(); handleAdd(node, 'file'); }}>📄</span>
                    <span role="img" aria-label="add-folder" onClick={(e) => { e.stopPropagation(); handleAdd(node, 'folder'); }}>📁</span>
                    <span role="img" aria-label="delete" onClick={(e) => { e.stopPropagation(); handleDelete(node); }}>🗑️</span>
                  </div>
                </>
              )}
            </div>
            {expandedFolders[node.name] && (
              <div style={{ marginLeft: 20 }}>
                {node.children &&
                  node.children.map((child) => renderTree(child, node))}
                {newItem && newItem.parent === node && (
                  <div>
                    <input
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      onBlur={() => {
                        onAdd(node, newItem);
                        setNewItem(null);
                      }}
                      placeholder={`New ${newItem.type}`}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="file-folder" style={{ display: 'flex', alignItems: 'center' }}>
            {editItemName === node.name ? (
              <input
                value={editItemName}
                onChange={handleEditChange}
                onBlur={() => {
                  onEdit(node, editItemName);
                  setEditItemName(null);
                }}
                autoFocus
              />
            ) : (
              <>
                📄 {node.name}
                <div className="icon-container">
                  <span role="img" aria-label="edit" onClick={() => handleEdit(node)}>✏️</span>
                  <span role="img" aria-label="delete" onClick={() => handleDelete(node)}>🗑️</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return <div>{data.map((item) => renderTree(item, null))}</div>;
};


const App = () => {
  const [data, setData] = useState(initialData);

  const handleAdd = (parent, newItem) => {
    const addItem = (nodes) => {
      return nodes.map((node) => {
        if (node === parent) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              { type: newItem.type, name: newItem.name, children: newItem.type === 'folder' ? [] : undefined },
            ],
          };
        } else if (node.children) {
          return { ...node, children: addItem(node.children) };
        } else {
          return node;
        }
      });
    };
    setData((prevData) => addItem(prevData));
  };

  const handleEdit = (item, newName) => {
    const editItem = (nodes) => {
      return nodes.map((node) => {
        if (node === item) {
          return { ...node, name: newName };
        } else if (node.children) {
          return { ...node, children: editItem(node.children) };
        } else {
          return node;
        }
      });
    };
    setData((prevData) => editItem(prevData));
  };

  const handleDelete = (item) => {
    const deleteItem = (nodes) => {
      return nodes
        .filter((node) => node !== item)
        .map((node) =>
          node.children ? { ...node, children: deleteItem(node.children) } : node
        );
    };
    setData((prevData) => deleteItem(prevData));
  };

  return (
    <div>
      <h1>File Explorer</h1>
      <FileTree data={data} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
