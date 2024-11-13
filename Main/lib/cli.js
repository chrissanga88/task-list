import inquirer from 'inquirer';
import {writeFile} from 'fs/promises';
import path from 'path';
import {join} from 'path';
import { fileURLToPath } from 'url';
import { createDocument } from './createDocument.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

class CLI {
  constructor() {
    this.title = "";
    this.tasks = [];
  }
  
  run() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: "What is your name?",
          name: 'name',
        },
      ])
      /* to destructure the response object, {name} can be used to extract the name property directly without having to write response.name to access it.*/
      .then(({name}) => {
        this.title = `${name}'s Tasks`;
        return this.addTask();
      })
      /* the following can also be written using a nested ternary operator. The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. In this case it would be a.priority === b.priority ? 0 : a.priority && !b.priority ? -1 : 1 */
      .then(() => {
        /* sort method excepts compare function (a,b) => that specifies how the elements are sorted. In this case, the sort method will not move a or b in the array if they are equal and the function returns 0. If a has priority and b does not, the function will return -1 (negative number) which means a should be sorted before b. If b has priority and a does not, the function will return 1 (positive number) which means b will be sorted before a. */
        this.tasks.sort((a, b) => {
          if (a.priority === b.priority) {
            return 0;
          }
          else if(a.priority && !b.priority) {
            return -1;
          }
          else {
            return 1;
          }
        });
        return writeFile(
          /* The join method in the path module joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path. The __dirname is a global variable that represents the absolute path of the directory containing the currently executing file (cli.js). The .. moves the path up one directory to Main then into the output directory where tasks.html is saved. */
          join(__dirname, '..', 'output', 'tasks.html'),
          createDocument(this.title, this.tasks)
        );
      })
      .then(() => console.log('Created file'))
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong.');
      });
  }

  addTask() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter task information',
        },
        {
          type: 'confirm',
          name: 'priority',
          message: 'Is this a priority task?',
        },
        {
          type: 'confirm',
          name: 'confirmTask',
          message: 'Would you like to add another task?',
        },
      ])
      // destructures the response object and passes each property to .then when resolved
      .then(({text, priority, confirmTask}) => {
        // creates a new object with only the text and priority property responses and adds it to the tasks array
        this.tasks.push({text, priority});
        // if the user selected to add another task, the addTask function will run again and the subsequent task will be added to the tasks array
        if (confirmTask) {
          return this.addTask();
        }
      })
  }
}

export default CLI;