const assert = require('assert');
const sinon = require('sinon');
const { expect } = require('chai');

const read_folder_files = require('../fix_bittrex_files').read_folder_files;
const fix_file = require('../fix_bittrex_files').fix_file;
const fs = require('fs');

let fsStub;

describe('Fix Bittrex Files', () => {
  describe('Bittrex files can come with a weird format, adding null as each second character', () => {
    describe('read_folder_files should check that the right content is in the folders', () => {
      describe('when there are more files in the deposits folder', () => {
        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['.DS_Store', 'email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your deposits from Bittrex in csv format - in the deposits folder.');
        });

      });

      describe('when there are more files in the orders folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['.DS_Store', 'email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your orders from Bittrex in csv format - in the orders folder.');
        });

      });

      describe('when there are more files in the withdrawals folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['.DS_Store', 'email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your withdrawals from Bittrex in csv format - in the withdrawals folder.');
        });

      });

      describe('when there is no file in the deposit folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns([]);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your deposits from Bittrex in csv format - in the deposits folder.');
        });

      });

      describe('when there is no file in the orders folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns([]);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your orders from Bittrex in csv format - in the orders folder.');
        });

      });

      describe('when there is no file in the withdrawals folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns([]);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('There should be exactly one file - your withdrawals from Bittrex in csv format - in the withdrawals folder.');
        });

      });
    });

    describe('Check if files are CSV files', () => {

      describe('When there is a non-csv file in the deposits folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.pdf']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('Not a .csv file in your deposits folder.');
        });

      });

      describe('When there is a non-csv file in the orders folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.pdf']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('Not a .csv file in your orders folder.');
        });

      });

      describe('When there is a non-csv file in the withdrawals folder', () => {

        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.xxx']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          expect(read_folder_files.bind(null, read_folder_files)).to.throw('Not a .csv file in your withdrawals folder.');
        });

      });

      describe('When everything is good, it should have called readdirSync three times', () => {
        before(() => {
          fsStub = sinon.stub(fs, "readdirSync");
          fsStub.withArgs('deposits').returns(['email@mail.com.csv']);
          fsStub.withArgs('orders').returns(['email@mail.com.csv']);
          fsStub.withArgs('withdrawals').returns(['email@mail.com.csv']);
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error when more files are present', () => {
          read_folder_files();
          expect(fsStub.calledThrice).to.be.true;
        });
      });

    });

    describe('fix_file should return the file but without all the null', () => {

      const testString = '4 1 d 2 631 9 - 6 5 2 b - 4 0 8 c - 9 2 f 5 - 2 d d 5 f c b c 7 1 9 d , B T C -ETH, L I M I T _ B U Y , 1 5 3 . 4 5 8 2 7 7 5 5 , 0 . 0 0 0 1 5 0 6 1 , 0 . 0 0 0 2 2 1 9 7 , 0 . 0 8 8 7 9 5 6 8 , 6 / 2 7 / 2 0 2 9   1 : 3 4 : 2 5   P M , 6 / 2 7 / 2 0 2 9   1 : 3 4 : 2 5   P M ';

      describe('it should read from the file system', () => {
        const depositFile = 'deposits/deposits.csv';
        before(() => {
          fsStub = sinon.stub(fs, "readFileSync");
          fsStub.withArgs(depositFile).returns(testString);
        });

        after(() => {
          fsStub.restore();
        });

        it('should return the string without null', () => {
          const fixedString = fix_file(depositFile);
          expect(testString).not.to.be.equal(fixedString);
          expect(testString.length).to.be.equal(278);
          expect(fixedString.length).to.be.equal(142);
        });

      });

      describe('it should throw an error for empty file', () => {
        const depositFile = 'deposits/deposits.csv';
        before(() => {
          fsStub = sinon.stub(fs, "readFileSync");
          fsStub.withArgs(depositFile).returns('');
        });

        after(() => {
          fsStub.restore();
        });

        it('should throw an error for an empty file', () => {
          expect(() => fix_file(depositFile)).to.throw('Empty file: deposits/deposits.csv');
        });

      });

    });
  });
});
