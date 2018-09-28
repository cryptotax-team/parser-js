const fs = require('fs');

function repair_bittrex_files() {

  const { dirContentDeposits, dirContentWithdrawals, dirContentOrders } = read_folder_files();

  const fixDeposits = fix_file(`deposits/${dirContentDeposits[0]}`);
  const writeDeposits = write_file('output/deposits.csv', fixDeposits);

  const fixWithdrawals = fix_file(`withdrawals/${dirContentWithdrawals[0]}`);
  const writeWithdrawals = write_file('output/withdrawals.csv', fixWithdrawals);

  const fixOrders = fix_file(`orders/${dirContentOrders[0]}`);
  const writeOrders = write_file('output/orders.csv', fixOrders);

  return 'Fixed the files, converted into the /output folder';
}

function read_folder_files() {

  const dirContentDeposits = fs.readdirSync('deposits');
  const dirContentWithdrawals = fs.readdirSync('withdrawals');
  const dirContentOrders = fs.readdirSync('orders');

  if(dirContentDeposits.length !== 1) {
    throw new Error('There should be exactly one file - your deposits from Bittrex in csv format - in the deposits folder.');
  }

  if(dirContentWithdrawals.length !== 1) {
    throw new Error('There should be exactly one file - your withdrawals from Bittrex in csv format - in the withdrawals folder.');
  }

  if(dirContentOrders.length !== 1) {
    throw new Error('There should be exactly one file - your orders from Bittrex in csv format - in the orders folder.');
  }

  if(dirContentDeposits[0].slice(-4) !== '.csv') {
    throw new Error('Not a .csv file in your deposits folder.');
  }

  if(dirContentWithdrawals[0].slice(-4) !== '.csv') {
    throw new Error('Not a .csv file in your withdrawals folder.');
  }

  if(dirContentOrders[0].slice(-4) !== '.csv') {
    throw new Error('Not a .csv file in your orders folder.');
  }

  return {
    dirContentOrders,
    dirContentWithdrawals,
    dirContentDeposits
  }

}

function fix_file(file) {

  const fileString = fs.readFileSync(file).toString();

  if(fileString.length < 1) {
    throw new Error('Empty file: '+file);
  }

  return fileString.replace(/\0/g, '');

}

function write_file(file, content) {

  return fs.writeFileSync(file, content);

}

module.exports = {
  read_folder_files,
  fix_file,
  repair_bittrex_files
};
