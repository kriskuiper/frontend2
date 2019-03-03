// Function calls
console.log(byTagName(document.body, 'span').length);
// > 3
console.log(byTagName(document.body, 'h1').length);
// > 1
console.log(byTagName(document.querySelector('p'), 'span').length);
// > 2

// Function declerations

// byTagName: node (HTML node), childToFind (string)
function byTagName(node, tagName) {
    let filtered = [];
    tagName = tagName.toUpperCase();

    function filterChilds(node) {
        for (let i = 0; i < node.childNodes.length; i++) {
            // Set node.childNodes[i] in own var for readability
            let child = node.childNodes[i];

            // Check if childnode is a node
            if (child.nodeType == Node.ELEMENT_NODE) {
                if (child.nodeName == tagName) filtered.push(child);
                // Use this recursively on the child elements untill there are no childs to work with
                filterChilds(child);
            }
        }
    }
    
    // Use the filter function with the node as argument
    filterChilds(node);
    return filtered;
}