
const useTraverseTree = () => {
	function insertNode(tree, folderId, item, type) {
		if (tree.id === folderId && tree.type === "folder") {
			tree.items.unshift(
				{
					id: new Date().getTime(),
					name: item,
					type,
					items: []
				}
			)
			return tree;
		}

		let latestNode = [];
		latestNode = tree.items.map(ob => insertNode(ob, folderId, item, type))

		return { ...tree, items: latestNode }
	}

	function updateNode(tree, folderId, item, type) {
		if (tree.id === folderId) {
			tree.name = item;
			return tree
		}

		const updatedNode = tree.items.map(ob => updateNode(ob, folderId, item, type))

		return { ...tree, items: updatedNode }
	}

	function deleteNode(tree, folderId) {
		if (tree.id === folderId) return {}

		const filteredItems = tree.items.filter(ob => ob.id !== folderId);

		if (tree.items.length === filteredItems.length) {
			const filteredItems = tree.items.map(ob => deleteNode(ob, folderId))
			return { ...tree, items: filteredItems }
		}

		return { ...tree, items: filteredItems }
	}


	return { insertNode, updateNode, deleteNode }
}

export default useTraverseTree;