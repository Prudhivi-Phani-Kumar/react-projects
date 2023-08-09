import { useState } from 'react'

import './App.css'
import FileExplorer from './components/FileExplorer';
import fileExplorerData from './data.json'
import useTraverseTree from './hooks/use-traverse-tree';

function App() {
  const [explorerData, setExplorerData] = useState(fileExplorerData.structure)

  const { insertNode, updateNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, type) => {
    const finalTree = insertNode(explorerData, folderId, item, type);
    setExplorerData(finalTree);
  }

  const handleUpdateNode = (folderId, item, type) => {
    const finalTree = updateNode(explorerData, folderId, item, type);
    setExplorerData(finalTree);
  }

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  }

  return (
    <div className="file__explorer_wrapper">
      <h1>File Explorer</h1>
      <FileExplorer handleInsertNode={handleInsertNode} handleUpdateNode={handleUpdateNode} handleDeleteNode={handleDeleteNode} explorerData={explorerData} />
    </div>
  )
}

export default App
