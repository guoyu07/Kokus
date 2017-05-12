[![Build Status](https://semaphoreci.com/api/v1/thesinding/honeybase/branches/admin-panel/shields_badge.svg)](https://semaphoreci.com/thesinding/honeybase)

Kokus - Booking API
==================================

- A Booking backend supporting Google Calendar
- Build as a REST API
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- JSend Middleware via [JSend](https://github.com/Prestaul/jsend) **Awesome!**

Getting Started
---------------
#### Note 
As of right now, you'll have to have a service account on Google with Domain Wide Access..
The service account key needs to be put in a folder inside src called **src/credentials** 

This will properbly be changed at one point to a traditional Google login page..
 
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
