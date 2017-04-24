HoneyBase - Booking backend
==================================

- A Booking backend supporting Google Calendar
- Build as a REST API
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

Getting Started
---------------

```sh
# clone it
git clone https://github.com/coworkingplus/HoneyBase.git

# Install dependencies
yarn install

# Start development live-reload server
npm run dev

# Make requests to the API
https://localhost:5000/api

#Change port in the config.json

```

Todo
----
- Add support for logins with Google.
- Add support for other calendars backend eg. Outlook, Exchange
- Add Websockets - For the upstream app, to "check" if the backend is alive
- Add settings control app / pages
- more



License
-------

GNU GPLv3
