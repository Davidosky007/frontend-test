# Simple Web Chat Application

This project is a simple web chat application developed as part of a take-home assessment. It allows users to chat in real-time across multiple browser tabs without the use of socket.io.

## Features

- User name prompt before entering the chat
- Local storage of messages (no backend required)
- Real-time message updates across all open tabs
- Message sending functionality
- Message history with lazy loading (25 messages per page)
- Scroll to top to load more messages

## Technologies Used

- React
- Redux for state management
- TypeScript
- Local Storage API for data persistence
- React Testing Library and Jest for testing

## Getting Started

1. Clone the repository:

## Available Scripts

In the project directory, you can run:

2. Install dependencies:


3. Run the development server:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`


## Project Structure

- `src/components/Chat.tsx`: Main chat component
- `src/redux/chatSlice.ts`: Redux slice for chat state management
- `src/components/Chat.test.tsx`: Tests for the Chat component

## How It Works

- Users are prompted to enter their name before joining the chat.
- Messages are stored in the browser's local storage.
- The application uses the Storage event to sync messages across tabs in real-time.
- Redux is used for state management within each tab.
- Message history is loaded in batches of 25 when scrolling to the top of the chat.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
