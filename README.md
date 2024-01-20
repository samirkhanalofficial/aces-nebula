<image src="https://codestorm.samirk.com.np/logo.png" width="200" height="200"/>

# Project

Blockchained and peerjs based Electrical vehicle booking system that encorage customers to use EV's by providing rewards to the customers.

### Team Nebula

1. Samir Khanal
2. Bibek Karki
3. Aavash Baral
4. Gaurav Pyakurel

# Nextjs

## How to run

1. Clone this repo
2. run `npm install` in the working directory
3. run `npm run dev` to run in development mode (slower)
4. run `npm run build && npm start` to run in prod mode.

## Note

By the time you get access, i may change my api keys due to security reasons. Please generate google maps api key and paste it in ApiProvider.

# Blockchain

## How to run

1. Go to https://remix.ethereum.org/ and create a file `PickupBooking.sol` from `blockchain/PickupBooking.sol` and copy and paste this code.
2. save it and compile it, choose Injected Provider metamask for deployment
3. test it from there
4. copy its deployment address and paste it in `useBlockchain` Hook.

## Note

You can use other methods to deploy it within your own network.
This will be the easiest method possible.
