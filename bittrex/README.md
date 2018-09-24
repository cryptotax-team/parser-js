#cryptotax-parser-js-bittrex

In order to run the parser, you will need to get three files from Bittrex.
Unfortunately you cannot download the deposit and withdraw history from Bittrex yourself, therefore you need to create a "General Support Ticket" and the staff should send you your Deposit, Withdrawal and Order History.
You can get the Order History yourself, even though you will be missing the Deposit and Withdraw History which are quite essential for the Tax Reports.

Place the according files into the folders for "orders", "withdrawals" and "deposits". Names are not relevant but they must be .csv files. Make sure no other files are in those folders than the csv file you want to import.

## Install

Install with
```
npm install
```

## Run

Place the name you would like to use as your Bittrex name, later used in the CryptoTax App, in the config.js file.

In the command line run
```
npm start
```

## Tests

```
npm run test
```

or

```
yarn test
```
