import Component from "./component.js";

class TaskListItem extends Component {
  constructor(children, priority = false) {
    // passes children to the parent component class to set this.children
    super(children);
    this.priority = priority;
  }

  render() {
    let liClasses = 'tasks-item';
    // adds the task-item-priority class to the li if the task is set to priority
    if (this.priority) {
      liClasses += ' tasks-item-priority';
    }
    // uses the inherited renderInnerHTML method from the component class to render all of the children as a joined string
    return `<li class="${liClasses}">${this.renderInnerHTML()}</li>`;
  }
}

export default TaskListItem;