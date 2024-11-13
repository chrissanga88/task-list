class Component {
  // Constructor passes default paramenter of an empty string if an array of children isn't included 
  constructor(children = []) {
    this.children = children;
  }

  render() {
    // Forces child class to inheret render method and polymorphically implement it
    throw new Error('Child class must implement a render() method.');
  }

  renderInnerHTML() {
    /* map creates a new array that only contains elements that are strings. if child is already a string, it is added to the new array, if not, the child.render() method converts it. */
    return this.children 
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        }
        return child.render();
      })
      .join('');
      // at this point .map created an array of html strings, but they need to be joined in order for all of the HTML to be rendered.
  }
}

export default Component;