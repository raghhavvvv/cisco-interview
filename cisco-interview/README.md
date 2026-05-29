# Cisco Interview Project

This is a frontend application built with React and Vite. It demonstrates data fetching from an external API, component state management, and side-effects in React.

## Features

- **Dynamic Chunk Fetching**: Automatically fetches posts in small chunks (10 at a time) from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). This prevents network bottlenecks and reduces memory overhead for massive datasets.
- **Pre-fetching Pagination**: Navigate through the posts using `Previous` and `Next` buttons. When approaching the end of the currently loaded posts, the app seamlessly pre-fetches the next chunk in the background to ensure a smooth user experience.
- **Accurate Total Counts**: Leverages the API's `x-total-count` HTTP response header to precisely display the total number of available records before they are even downloaded.
- **Auto-Scroll**: Includes an automated scrolling feature that advances to the next post every 3 seconds. It safely pauses if a background fetch is ongoing, and once all records are completely exhausted, it seamlessly loops back to the first post.

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
