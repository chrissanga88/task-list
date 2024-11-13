import Component from "./component.js";

class TaskList extends Component {
  constructor(children) {
    // passes childred to the parent Component class to set this.children
    super(children);
  }

  render() {
    return `<ul class="tasks">${this.renderInnerHTML()}</ul>`
  }
}

export default TaskList;