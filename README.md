# Vision Chat App

A chat application that utilizes speech recognition and text-to-speech functionality.

## Project Structure

* `backend`: Contains the server-side code, written in TypeScript, using the Express.js framework.
	+ `src`: Source code for the backend.
		- `config`: Configuration files.
		- `services`: Service classes for handling specific tasks.
		- `server.ts`: Main server file.
	+ `tsconfig.json`: TypeScript configuration file.
	+ `package.json`: npm package file.
* `frontend`: Contains the client-side code, written in HTML, CSS, and JavaScript.
	+ `index-stream.html`: Main HTML file for the chat interface.
	+ `index.html`: Alternative HTML file (not currently used).

## Features

* Speech recognition: Uses the Web Speech API to recognize user input.
* Text-to-speech: Utilizes the ElevenLabs API to generate audio responses.
* Chat interface: Displays user input and bot responses in a conversational format.

## Setup

1. Clone the repository: `git clone https://github.com/your-username/vision-chat-app.git`
2. Install dependencies: `npm install` (in the `backend` directory)
3. Start the server: `npm run dev` (in the `backend` directory)
4. Open the chat interface: `http://localhost:3000` (in your web browser)

## Contributing

Contributions are welcome! Please submit pull requests or issues to the repository.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
