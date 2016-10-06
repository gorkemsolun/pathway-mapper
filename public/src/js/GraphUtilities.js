/**
 * Created by istemi on 27.09.2016.
 */

module.exports = (function () {

    var GraphUtilities = function()
    {

    }
    
    /*
     * Creates graph hierarchy from given cytoscape.js node collection
     *
     * @param nodes {array}: cy node collection
     * @return {array}: Tree representation in array, entries are root level nodes. node.children gives children nodes
     * of each node in the returned array.
     * a node in corresponding level.
     *
     * */
    GraphUtilities.prototype.createGraphHierarchy = function(nodes)
    {
        //Some arrays and maps for creating graph hierarchy
        var tree = [];
        var mappedArr = {};

        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = nodes.length; i < len; i++)
        {
            var arrElem = nodes[i];
            mappedArr[arrElem.id()] = arrElem;
            mappedArr[arrElem.id()].childNodes = [];
        }

        for (var id in mappedArr)
        {
            var mappedElem = mappedArr[id];

            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.parent().length > 0)
            {
                mappedArr[mappedElem.parent().id()].childNodes.push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else
            {
                tree.push(mappedElem);
            }
        }
        return tree;
    };


    window.GraphUtilities = new GraphUtilities();
})();