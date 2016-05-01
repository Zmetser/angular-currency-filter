/*global beforeEach, describe, it, inject, expect, module */
'use strict';

describe('currency', function() {

  var currency,
    defaultAmount = '$0.00';

  beforeEach(module('currencyFilter'));

  beforeEach(inject(function($filter){
    currency = $filter('currency');
  }));

  describe('default functionality', function() {

    it('should do basic currency filtering', function() {
      expect(currency(0)).toEqual(defaultAmount);
      expect(currency(-999)).toEqual('($999.00)');
      expect(currency(1234.5678, 'USD$')).toEqual('USD$1,234.57');
    });

    it('should fallback to 0 for non-numeric amount primitives', function() {
      expect(currency()).toBe(defaultAmount);
      expect(currency('123')).toBe(defaultAmount);
      expect(currency('abc')).toBe(defaultAmount);
      expect(currency(null)).toBe(defaultAmount);
      expect(currency(false)).toBe(defaultAmount);
    });

    it('should handle zero and nearly-zero values properly', function() {
      // This expression is known to yield 4.440892098500626e-16 instead of 0.0.
      expect(currency(1.07 + 1 - 2.07)).toBe('$0.00');
      expect(currency(0.008)).toBe('$0.01');
      expect(currency(0.003)).toBe('$0.00');
    });

  });

  describe('advanced functionality', function() {

    it('should handle custom precision', function() {
      // https://github.com/angular/angular.js/pull/3642/files#diff-3c33c1e5c05e3b1acc555656428b48d5R98
      expect(currency(1234.5678, 'rub', 3)).toEqual('rub1,234.568');
      expect(currency(1234.5678, 'rub', 0)).toEqual('rub1,235');
    });

    it('should handle custom currency position', function() {
      expect(currency(1234.42, '€', 0, true)).toEqual('1,234€');
      expect(currency(1234.42, 'USD$', 2, false)).toEqual('USD$1,234.42');
      expect(currency(1234.42, 'USD$')).toEqual('USD$1,234.42');
      expect(currency(1234.42)).toEqual('$1,234.42');
    });

  });

  describe('test API consistency', function() {
    var groupSep = {GROUP_SEP: ' '};

    it('with common use cases', function () {
      expect(currency(1234.42, '€', true)).toEqual('1,234.42€');
      expect(currency(1234, '$', 0)).toEqual('$1,234');
    });

    it('with no amount', function () {
      expect(currency()).toEqual('$0.00');
      expect(currency(null, 'USD$')).toEqual('USD$0.00');
      expect(currency(null, 'USD$', 1)).toEqual('USD$0.0');
      expect(currency(null, '€', 1, true)).toEqual('0.0€');
      expect(currency(null, '€', true)).toEqual('0.00€');
    });

    describe('group separator as', function () {
      it('second param', function () {
        expect(currency(1000, groupSep)).toEqual('$1 000.00');
      });

      it('last param', function () {
        expect(currency(1000, '€', 1, true, groupSep)).toEqual('1 000.0€');
      });
    });
  });

  describe('group separator', function() {

    it('should fall back to default angluar locale', function () {
      expect(currency(1234.42)).toEqual('$1,234.42');
    });

    it('should change the group separator to dash', function () {
      var groupSep = {GROUP_SEP: ' '};

      expect(currency(123.42, groupSep)).toEqual('$123.42');
      expect(currency(1234.42, groupSep)).toEqual('$1 234.42');
      expect(currency(123456789.42, groupSep)).toEqual('$123 456 789.42');
    });

    it('should remove the group separator', function () {
      var groupSep = {GROUP_SEP: ''};

      expect(currency(123.42, groupSep)).toEqual('$123.42');
      expect(currency(1234.42, groupSep)).toEqual('$1234.42');
      expect(currency(123456789.42, groupSep)).toEqual('$123456789.42');
    });

  });

  describe('decimal separator', function() {

    it('should fall back to default angluar locale', function () {
      expect(currency(1234.42)).toEqual('$1,234.42');
    });

    it('should change the group separator to dash', function () {
      var decimalSep = {DECIMAL_SEP: ','};

      expect(currency(1.42, decimalSep)).toEqual('$1,42');
    });
  });

  describe('demo', function() {

    it('should verify demo use cases', function() {
      var formats = {
        GROUP_SEP: ' ',
        DECIMAL_SEP: ','
      };

      // With all parameters
      expect(currency(1234.4239, '€', 1, true, formats)).toEqual('1 234,4€');

      // With missing fraction size
      expect(currency(1234.4239, '€', true)).toEqual('1,234.42€');

      // With fraction size only
      expect(currency(1234.4239, '$', 3)).toEqual('$1,234.424');

      // Only with symbol
      expect(currency(1234.4239, '$')).toEqual('$1,234.42');

      // Only with custom group and decimal separators
      expect(currency(1234.4239, formats)).toEqual('$1 234,42');
    });

  });

});
