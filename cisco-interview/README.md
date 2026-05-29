# Cisco Interview Project

This is a frontend application built with React and Vite. It demonstrates data fetching from an external API, component state management, and side-effects in React.

## Features

- **Post Fetching**: Automatically fetches a list of posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) on component mount.
- **Pagination**: Navigate through the posts using `Previous` and `Next` buttons.
- **Auto-Scroll**: Includes an automated scrolling feature that advances to the next post every 3 seconds. Once it reaches the end, it seamlessly loops back to the first post.

## Running Locally

To get the application running on your local machine, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the provided `localhost` link in your browser to view the app.

## Technologies Used

- React (with Hooks)
- Vite
- JavaScript
