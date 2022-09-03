const LinkedList = () => {
  let list = {};
  // We get the node that satisfies the condition
  const getNode = (list, condition, indx = 0) => {
    if (list === null || list === undefined) return null;
    if (condition(list, indx)) return list;
    else return getNode(list.nextNode, condition, ++indx);
  }
  // We get the node index that satisfies the condition
  const getIndex = (list, condition, indx = 0) => {
    if (list === null || list === undefined) return -1;
    if (condition(list, indx)) return indx;
    else return getIndex(list.nextNode, condition, ++indx)
  }
  // Helper function for 'toString()' output
  const getValues = (list, condition, indx = 0, string = '') => {
    if (list === null || list === undefined) return null;
    if (condition(list, indx)) return string + `( ${list.value} ) => null`;
    else return getValues(list.nextNode, condition, ++indx, string += `( ${list.value} ) => `);
  }
  // Add new node with specified value at the end
  const append = (value) => {
    const newNode = Node(value);
    // Check if list is empty
    if (list.value === undefined) {
      list = newNode;
    } else {
      let node = getNode(list, list => list.nextNode === null);
      node.nextNode = newNode;
    }
  };
  // Add new node with specified value at the beginning
  const prepend = (value) => {
    const newNode = Node(value);
    newNode.nextNode = list;
    list = newNode;
  };
  // Return size of list
  const size = () => {
    return getIndex(list, list => list.nextNode === null) + 1;
  };
  // Return head of list
  const head = () => {
    return list;
  };
  // Return tail of list
  const tail = () => {
    const node = getNode(list, list => list.nextNode === null);
    return node;
  }
  // Return node at specified index
  const at = (index) => {
    if (index < 0) return null;
    const node = getNode(list, (_, indx) => indx === index);
    return node;
  }
  // Remove and return last node from list
  const pop = () => {
    const index = getIndex(list, list => list.nextNode === null);
    if (index === -1) return null;
    const popNode = at(index);
    console.log(popNode);
    let node = at(index - 1);
    if (node !== null) {
      node.nextNode = null;
      return popNode;
    } else {
      list = {};
      return popNode;
    };
  }
  // Check if passed in value exists in list
  const contains = (value) => {
    const node = getNode(list, list => list.value === value);
    return node ? true : false;
  }
  // Check if passed in value exists in list and return its index value
  const find = (value) => {
    const index = getIndex(list, (list) => list.value === value);
    return index ? index : null;
  }
  // Return a string with all objects values
  const toString = () => {
    return getValues(list, list => list.nextNode === null);
  };
  // Insert new node with specified value at specified index
  const insertAt = (value, index) => {
    const maxIndex = size();
    if (index > maxIndex) return null;
    let newNode = Node(value);
    let node = getNode(list, (_, indx) => indx === index - 1);
    newNode.nextNode = node.nextNode;
    node.nextNode = newNode;
  };
  // Remve node at specified index
  const removeAt = (index) => {
    const maxIndex = size() - 1;
    if (index > maxIndex) return null;
    let prevNode = getNode(list, (_, indx) => indx === index - 1);
    let nextNode = prevNode.nextNode.nextNode;
    prevNode.nextNode = nextNode;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  }
};

const Node = (value) => {
  const node = {
    value,
    nextNode: null,
  };
  return node;
};

const newList = LinkedList();
newList.append("world")
newList.append("!")
newList.append("...")
newList.prepend("hello")
newList.toString()
newList.size()
