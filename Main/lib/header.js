import Component from "./component.js";

class Header extends Component {
  constructor() {
    super();
    this.date = new Date();
  }

  formatDate() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();

    const formattedDate = `${month}-${day}-${year}`;

    return formattedDate;
  }

  render() {
    return `<header class="header"><h1>Today's Tasks</h1><p>${this.formatDate()}</p</header>`;
  }
}

export default Header;