import React from 'react'
import { useState } from 'react';

import './FileExplorer.css'

const FileExplorer = ({ handleInsertNode, handleUpdateNode, handleDeleteNode, explorerData }) => {
	const [expand, setExpand] = useState(false);
	const [showInput, setShowInput] = useState({
		visible: false,
		type: null
	});
	const [updateItemState, setUpdateItemState] = useState(false);

	const addNewItem = (e, type) => {
		e.stopPropagation();
		setExpand(true);
		setShowInput({ ...showInput, visible: true, type });
	}

	const onAddItem = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			handleInsertNode(explorerData.id, e.target.value, showInput.type)
			setShowInput({ ...showInput, visible: false })
		}
	}

	const OnUpdateItemIcon = (e) => {
		e.stopPropagation();
		setUpdateItemState(true);
	}

	const updateItem = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			handleUpdateNode(explorerData.id, e.target.value, showInput.type)
			setUpdateItemState(false)
		}
	}

	const deleteItem = (e, id) => {
		e.stopPropagation();
		handleDeleteNode(id)
	}

	return (
		<>
			{explorerData.type === "folder" ?
				<>
					<div className="folder__directory" onClick={() => setExpand(!expand)}>📁 {updateItemState ? <input
						onBlur={() => setUpdateItemState(false)}
						defaultValue={explorerData.name}
						onKeyDown={(e) => { updateItem(e) }} autoFocus /> : explorerData.name}
						<span className="add__items_wrapper">
							<span title="add folder" onClick={(e) => addNewItem(e, "folder")}>🗃️</span>
							<span title="add file" onClick={(e) => addNewItem(e, "file")}>🗒️</span>
							<span title="update" onClick={(e) => OnUpdateItemIcon(e, "folder")}>✏️</span>
							<span title="delete" onClick={(e) => deleteItem(e, explorerData.id)}>🗑️</span>
						</span>
					</div>
					<div className={expand ? "display__folder__content" : "hide__folder__content"}>
						{showInput.visible ?
							<div>
								{showInput.type === "folder" ? '📁' : '🗒️'}
								<input
									type="text"
									autoFocus
									onKeyDown={(e) => onAddItem(e)}
									onBlur={() => setShowInput({ ...showInput, visible: false })} />
							</div> : null}
						{explorerData.items.map(item => <FileExplorer
							handleInsertNode={handleInsertNode}
							handleUpdateNode={handleUpdateNode}
							handleDeleteNode={handleDeleteNode}
							key={item.id} explorerData={item} />)}
					</div>
				</>
				: Object.keys(explorerData).length === 0 ? <h4><span style={{ fontSize: '50px' }}>😒</span> OOPS...! File Explorer is Empty</h4>
					: <div className="file__directory">{explorerData.name.includes('.png') ? '📸' : '📝'}
						{updateItemState ? <input
							onBlur={() => setUpdateItemState(false)}
							defaultValue={explorerData.name}
							onKeyDown={(e) => { updateItem(e) }} autoFocus /> : explorerData.name}
						<span>
							<span title="update" onClick={(e) => OnUpdateItemIcon(e, "file")}>✏️</span>
							<span title="delete" onClick={(e) => deleteItem(e, explorerData.id)}>🗑️</span>
						</span>
					</div>}
		</>

	)
}

export default FileExplorer