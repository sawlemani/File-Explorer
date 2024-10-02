import { useState } from "react";
import "./App.css";
import folderData from "./data/folderData";
import Folder from "./components/folder";
import useTraverseTree from '../src/hook/use-traverse-tree'

function App() {
    // State to hold the explorer data (folder structure)
  const [explorerData, setExplorerData] = useState(folderData);

    // Destructure functions from the custom hook for manipulating the tree
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

   // Function to handle inserting a new node (folder or file)
  const handleInsertNode = (folderId, itemName, isFolder) => {
    const finalItem = insertNode(explorerData, folderId, itemName, isFolder);
    return finalItem;
  };

  // Function to handle deleting a node (folder or file)
  const handleDeleteNode = (folderId) => {
    // Call deleteNode to get the modified tree
    const finalItem = deleteNode(explorerData, folderId);
    // Update the explorerData state with the modified tree
    setExplorerData(finalItem);
  };

  const handleUpdateFolder = (id, updatedValue, isFolder) => {
    const finalItem = updateNode(explorerData, id, updatedValue, isFolder);
    // Update the explorerData state with the modified tree
    setExplorerData(finalItem);
  };

  return (
    <div className="App">
      <div className="folderContainerBody">
        <div className="folder-container">
          <Folder
            handleInsertNode={handleInsertNode} // Pass the insert handler to the Folder component
            handleDeleteNode={handleDeleteNode} // Pass the delete handler to the Folder component
            handleUpdateFolder={handleUpdateFolder} // Pass the update handler to the Folder component
            explorerData={explorerData} // Pass the current folder data to the Folder component
          />
        </div>
        <div className="empty-state">Your content will be here</div>
      </div>
    </div>
  );
}

export default App;