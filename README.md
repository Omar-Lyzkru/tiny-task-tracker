# Tiny Task Tracker

A lightweight task-tracking web app built with vanilla JavaScript and HTML. I created this project to strengthen my understanding of DOM manipulation, event handling, application state, and browser persistence.

## Features

- Add new tasks
- Prevent empty tasks from being created
- Mark tasks as complete or incomplete
- Delete individual tasks
- Persist tasks with `localStorage`
- Restore task state after refreshing the page

## Technologies

- HTML5
- JavaScript
- DOM API
- `localStorage`
- JSON serialization with `JSON.stringify()` and `JSON.parse()`
- Git and GitHub

## What I Practiced

This project helped me practice the relationship between application state and the user interface. Tasks are stored as JavaScript objects, persisted in browser storage, and rendered into the DOM.

Key concepts used include:

- DOM selection and manipulation
- Event listeners and callback functions
- Arrays and objects
- Array methods such as `forEach()`, `indexOf()`, and `splice()`
- State synchronization between JavaScript, the DOM, and `localStorage`
- Refactoring repeated logic into reusable functions
- Debugging browser and JavaScript errors

## Project Structure

```text
Tiny Task Tracker/
├── index.html
└── script.js
```

## Roadmap

I plan to continue expanding this project as I improve my front-end development skills.

Planned improvements include:

- Add CSS styling and a more polished responsive interface
- Improve task layout and visual feedback
- Add keyboard support, including submitting tasks with Enter
- Add task filtering such as All, Active, and Completed
- Add task editing
- Improve accessibility and semantic HTML
- Potentially rebuild the project in React after becoming more comfortable with component-based development

## Running Locally

Clone the repository:

```bash
git clone https://github.com/Omar-Lyzkru/tiny-task-tracker.git
```

Open the project folder and launch `index.html` in a browser, or use a local development server such as the VS Code Live Server extension.

## Author

**Omar Aguilar**  
Computer Science student at the University of Houston

- GitHub: [Omar-Lyzkru](https://github.com/Omar-Lyzkru)
