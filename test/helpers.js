const { expect } = require('chai');
const { getDatesParameter, sortDates } = require('../dist/helpers');

describe('Helpers', () => {
  describe('getDatesParameter', () => {
    it('should return empty array when undefined', () => {
      expect(getDatesParameter()).to.deep.equal([]);
    });
    it('should return empty array when property is not set', () => {
      expect(getDatesParameter({ anything: 'any' })).to.deep.equal([]);
    });
    it('should return array when property is set', () => {
      expect(getDatesParameter({ dates: [1] })).to.deep.equal([1]);
    });
    it('should return array when array is passed', () => {
      expect(getDatesParameter([1,2])).to.deep.equal([1,2]);
    });
  });

  describe('sortDates', () => {
    it('should accept an empty array as input', () => {
      let result = sortDates([]);
      let isSorted = result.every((date, index) => !index || result[index-1] <= date);
      expect(isSorted).to.equal(true);
    });

    it('should return a sorted array', () => {
      let result = sortDates([
        new Date('01/04/2018'),
        new Date('01/01/2018'),
        new Date('01/03/2018'),
      ]);
      let isSorted = result.every((date, index) => !index || result[index-1] <= date);
      expect(isSorted).to.equal(true);
    });
  });
});
