const { expect } = require('chai');
const { getDatesParameter } = require('../dist/helpers')

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
});
