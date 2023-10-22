# ReSignal

ReSignal is a simple Signal interface, built out of personal necessity, to easily view old Signal messages from the SQLite database.

## Features

- [x] Signal-like interface.
- [x] Load and switch between different conversations.
- [x] Nice looking animations and UI.
- [x] Correctly display messages with attachments.
- [x] Script to handle the decryption and copying of the database.
- [x] Script also handles the copying of all of the attachments.
- [x] Icons for the app used.
- [ ] Tauri app to make it a standalone app.
- [ ] Search functionality.
- [x] More to come!

## Usage

### Prerequisites

- You need to have the Signal app installed on your PC WITH THE MESSAGES YOU WANT TO SAVE. This won't work if you don't have the messages on your PC.

### Installation

- Clone the repo.
- Run `./fetch.sh` to copy the database and attachments.
- Run `npm install` to install all of the dependencies.
- Run `npm run dev` to start the app.
- Go to `localhost:4321` in your browser to view the app.

There will eventually be a standalone app for this, but for now, this is the primary way to use it.

## Contributing

Contributions are welcome! Just open an issue or a PR and I'll take a look at it.


