import { useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";

// Folder component to represent a folder or file in an explorer view
const Folder = ({
  handleInsertNode,  // Function to insert a new node (folder/file)
  handleDeleteNode,    // Function to delete a node
  handleUpdateFolder,   // Function to update a folder's name
  explorerData,          // Data representing the folder or file
}) => {

   // State for the name of the node
  const [nodeName, setNodeName] = useState(
    explorerData?.name ? explorerData.name : ""
  );

  // State for whether the folder is expanded or collapsed
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  // State to control visibility of input for updating folder name
  const [updateInput, setUpdateInput] = useState({
    visible: false,
    isFolder: null,
  });

    // Handler for showing input to add a new folder/file
  const handleNewFolderButton = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

 // Handler for showing input to update the folder name
  const handleUpdateFolderButton = (e, isFolder, nodeValue) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

    // Handler for deleting the folder/file
  const handleDeleteFolder = (e, isFolder) => {
    e.stopPropagation();
    handleDeleteNode(explorerData.id);
  };

  // Handler for adding a new folder/file
  const onAdd = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // Lets add logic for add folder
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
// Handler for updating the folder name
  const onUpdate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // Lets add logic for update folder
      handleUpdateFolder(explorerData.id, e.target.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  // Handler for changing the node name in the input
  const handleChange = (event) => {
    setNodeName(event.target.value);
  };
    // If the current node is a folder
  if (explorerData.isFolder) {
    console.log("nodeName", nodeName);
    return (
      <div>
        <div
          className="folder"
          style={{ cursor: "pointer" }}
          onClick={() => setExpand(!expand)}
        >
          <span>
            {expand ? <VscChevronDown /> : <VscChevronRight />} <VscFolder />
            {updateInput.visible ? (
              <input
                type="text"
                value={nodeName}
                onChange={handleChange}
                autoFocus
                onBlur={() =>
                  setUpdateInput({ ...updateInput, visible: false })
                }
                onKeyDown={onUpdate}
              />
            ) : (
              <label>{explorerData.name}</label>
            )}
          </span>

          <div className="buttons-container">
            <button onClick={(e) => handleDeleteFolder(e, true)}>
              <VscTrash />
            </button>
            <button
              onClick={(e) =>
                handleUpdateFolderButton(e, true, explorerData.name)
              }
            >
              <VscEdit />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, true)}>
              <VscNewFolder />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, false)}>
              <VscNewFile />
            </button>
          </div>
        </div>
        <div
          id="folderContainer"
          style={{ display: expand ? "block" : "none", marginLeft: 20 }}
        >
          {showInput.visible && (
            <div className="addItem">
              <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAdd}
              />
            </div>
          )}
          {explorerData.items.map((item, index) => {
            return (
              <Folder
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleUpdateFolder={handleUpdateFolder}
                explorerData={item}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="folder">
        <span>
          <VscFile />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
            />
          ) : (
            <label>{explorerData.name}</label>
          )}
        </span>
        <div className="buttons-container">
          <button onClick={(e) => handleDeleteFolder(e, false)}>
            <VscTrash />
          </button>
          <button
            onClick={(e) =>
              handleUpdateFolderButton(e, false, explorerData.name)
            }
          >
            <VscEdit />
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;