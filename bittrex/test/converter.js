const assert = require('assert');
const sinon = require('sinon');
const { expect } = require('chai');

const {
  convert_deposits,
  convert_withdrawals,
  convert_orders
} = require('../converter');
const fs = require('fs');

const testAccountName = 'Test';
const exampleCryptoTaxDeposit = `Bittrex,${testAccountName},01.01.2018 12:01:00,ETH,,1.12300000,,e12345-1235-1234-4321-12345671234,0,ETH,deposit\n`;
const exampleCryptoTaxWithdraw = `Bittrex,${testAccountName},01.01.2018 12:01:00,,BTC,,2.00000000,e12345-1235-1234-4321-12345671234,0.00050000,BTC,withdrawal\n`;
const exampleCryptoTaxBuy = `Bittrex,${testAccountName},01.01.2018 12:01:00,ETH,BTC,1.00000000,0.10000000,e12345-1235-1234-4321-12345671234,0.10000000,BTC,trade\n`;
const exampleCryptoTaxSell = `Bittrex,${testAccountName},01.01.2018 12:01:00,BTC,ETH,0.10000000,1.00000000,e12345-1235-1234-4321-12345671234,0.10000000,BTC,trade\n`;


describe('converter', () => {

  describe('given a line of bittrex deposit', () => {

    const bittrex_testdeposit = ['e12345-1235-1234-4321-12345671234','1.12300000','ETH','22','1/01/2018 0:01:00 AM','0x123','0x1234'];

    it('should produce a cryptotax conforming deposit line', () => {

      const convertedDeposit = convert_deposits(bittrex_testdeposit, testAccountName, 0);

      expect(convertedDeposit).to.be.equal(exampleCryptoTaxDeposit);
    });

  });

  describe('given a line of bittrex deposit with not enough fields', () => {

    const bittrex_testdeposit = ['e12345-1235-1234-4321-12345671234'];

    it('should throw an error', () => {
      expect(() => convert_deposits(bittrex_testdeposit, testAccountName, 0)).to.be.throw('Missing fields in deposit file line 0');
    });

  });

  describe('given a line of bittrex withdraw', () => {

    const bittrex_testwithdraw = ['e12345-1235-1234-4321-12345671234','BTC','2.00000000','1eAddressBTC','1/01/2018 0:01:00 AM','True','False', '0.00050000','Addressssss', 'False', 'False'];

    it('should produce a cryptotax conforming withdraw line', () => {

      const convertedWithdraw = convert_withdrawals(bittrex_testwithdraw, testAccountName, 0);

      expect(convertedWithdraw).to.be.equal(exampleCryptoTaxWithdraw);
    });

  });

  describe('given a line of bittrex withdraw with not enough fields', () => {

    const bittrex_testwithdraw = ['e12345-1235-1234-4321-12345671234'];

    it('should throw an error', () => {
      expect(() => convert_withdrawals(bittrex_testwithdraw, testAccountName, 0)).to.be.throw('Missing fields in withdraw file line 0');
    });

  });

  describe('given a line of bittrex buy order', () => {

    const bittrex_testbuyorder = ['e12345-1235-1234-4321-12345671234','BTC-ETH','LIMIT_BUY','1.00000000','0.100300000','0.10000000','0.10000000','1/01/2018 0:01:00 AM','1/01/2018 0:01:00 AM']

    it('should produce a cryptotax conforming buy order line', () => {

      const convertedBuyOrder = convert_orders(bittrex_testbuyorder, testAccountName, 0);

      expect(convertedBuyOrder).to.be.equal(exampleCryptoTaxBuy);

    });

  });

  describe('given a line of bittrex buy order with not enough fields', () => {

    const bittrex_testbuyorder = ['e12345-1235-1234-4321-12345671234'];

    it('should throw an error', () => {
      expect(() => convert_orders(bittrex_testbuyorder, testAccountName, 0)).to.be.throw('Missing fields in order file line 0');
    });

  });

  describe('given a line of bittrex sell order', () => {

    const bittrex_testsellorder = ['e12345-1235-1234-4321-12345671234','BTC-ETH','LIMIT_SELL','1.00000000','0.10000000','0.10000000','0.10000000','1/01/2018 0:01:00 AM','1/01/2018 0:01:00 AM'];

    it('should produce a cryptotax conforming sell order line', () => {

      const convertedBuyOrder = convert_orders(bittrex_testsellorder, testAccountName, 0);

      expect(convertedBuyOrder).to.be.equal(exampleCryptoTaxSell);

    });

  });

});
