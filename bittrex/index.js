const fs = require('fs');
const csv = require('fast-csv');
const config = require('./config');
const {
  convert_deposits,
  convert_withdrawals,
  convert_orders
} = require('./converter');
const repair_bittrex_files = require('./fix_bittrex_files').repair_bittrex_files;

const header = 'exchange_name,account_name,trade_date,buy_asset,sell_asset,buy_amount,sell_amount,exchange_order_id,fee,fee_asset,transaction_type,deposit_clarification';

repair_bittrex_files();

const writeOutput = fs.writeFileSync(config.output_file, header);

const deposits = write_to_file(convert_deposits, config.output_file, 'output/deposits.csv', config.account_name).then(console.log);
const withdrawals = write_to_file(convert_withdrawals, config.output_file, 'output/withdrawals.csv', config.account_name).then(console.log);
const orders = write_to_file(convert_orders, config.output_file, 'output/orders.csv', config.account_name).then(console.log);


function write_to_file(convert_function, outputFile, inputFileName, accountName) {

  return new Promise((resolve, reject) => {

      let lineCount = 0;

      csv
      .fromPath(inputFileName, { objectMode: true })
      .on("data", function(data){
         if(lineCount > 0) {
           fs.appendFileSync(outputFile, convert_function(data, accountName, lineCount), function(err) {
               if(err) {
                  reject(err);
               }
           });

         }

         lineCount++;

       })
       .on("end", function(){
         resolve(`${inputFileName} import done and file ${outputFile} was saved with the data`);
       });

   })

}
