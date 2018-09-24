const moment = require('moment');

function convert_deposits(data, account_name, lineCount) {

  if(data.length < 5) throw new Error('Missing fields in deposit file line '+lineCount);

  const trade_date = moment(data[4]).format('DD.MM.YYYY hh:mm:ss');

  const buy_asset = data[2];
  const buy_amount = data[1]
  const exchange_order_id = data[0];
  const fee = '0';
  const fee_asset = buy_asset;

  const assets = {
    exchange_name: 'Bittrex',
    account_name,
    trade_date,
    buy_asset,
    sell_asset: '',
    buy_amount,
    sell_amount: '',
    exchange_order_id,
    fee,
    fee_asset,
    transaction_type: 'deposit',
    deposit_clarification: ''
  }


  return `${assets.exchange_name},${assets.account_name},${assets.trade_date},${assets.buy_asset},${assets.sell_asset},${assets.buy_amount},${assets.sell_amount},${assets.exchange_order_id},${assets.fee},${assets.fee_asset},${assets.transaction_type}\n`;

}

function convert_withdrawals(data, account_name, lineCount) {

  if(data.length < 8) throw new Error('Missing fields in withdraw file line '+lineCount);

  const trade_date = moment(data[4]).format('DD.MM.YYYY hh:mm:ss');

  const sell_asset = data[1];
  const sell_amount = data[2]
  const exchange_order_id = data[0];
  const fee = data[7];
  const fee_asset = sell_asset;

  const assets = {
    exchange_name: 'Bittrex',
    account_name,
    trade_date,
    buy_asset: '',
    sell_asset,
    buy_amount: '',
    sell_amount,
    exchange_order_id,
    fee,
    fee_asset,
    transaction_type: 'withdrawal',
    deposit_clarification: ''
  }

  return `${assets.exchange_name},${assets.account_name},${assets.trade_date},${assets.buy_asset},${assets.sell_asset},${assets.buy_amount},${assets.sell_amount},${assets.exchange_order_id},${assets.fee},${assets.fee_asset},${assets.transaction_type}\n`;


}

function convert_orders(data, account_name, lineCount) {

  if(data.length < 9) throw new Error('Missing fields in order file line '+lineCount);

  const exchange_order_id = data[0];
  const fee = data[5];
  const trade_date = moment(data[8]).format('DD.MM.YYYY hh:mm:ss');
  const trade_pair = data[1].split("-");
  const trade_market = trade_pair[0];
  const trade_unit = trade_pair[1];

  let buy_asset = '';
  let sell_asset = '';
  let sell_amount = '';
  let buy_amount = '';

  if(data[2] === 'LIMIT_SELL') {

    buy_asset = trade_market;
    sell_asset = trade_unit;

    buy_amount = data[6];
    sell_amount = data[3];

  }

  if(data[2] === 'LIMIT_BUY') {
    buy_asset = trade_unit;
    sell_asset = trade_market;

    buy_amount = data[3];
    sell_amount = data[6];
  }

  const assets = {
    exchange_name: 'Bittrex',
    account_name,
    trade_date,
    buy_asset,
    sell_asset,
    buy_amount,
    sell_amount,
    exchange_order_id,
    fee,
    fee_asset: trade_market,
    transaction_type: 'trade',
    deposit_clarification: ''
  }

  return `${assets.exchange_name},${assets.account_name},${assets.trade_date},${assets.buy_asset},${assets.sell_asset},${assets.buy_amount},${assets.sell_amount},${assets.exchange_order_id},${assets.fee},${assets.fee_asset},${assets.transaction_type}\n`;

}

module.exports = {
  convert_deposits,
  convert_withdrawals,
  convert_orders
}
