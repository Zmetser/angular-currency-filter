/*global beforeEach, describe, it, inject, expect, module */
'use strict';

describe('currency', function() {

  var currency;

  beforeEach(module('currencyFilter'));

  beforeEach(inject(function($filter){
    currency = $filter('currency');
  }));

  describe('default functionality', function() {

    it('should do basic currency filtering', function() {
      expect(currency(0)).toEqual('$0.00');
      expect(currency(-999)).toEqual('($999.00)');
      expect(currency(1234.5678, 'USD$')).toEqual('USD$1,234.57');
    });

    it('should return empty string for non-numbers', function() {
      expect(currency()).toBe('');
      expect(currency('abc')).toBe('');
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

    it('should test API', function() {
      expect(currency(1234.42, '€', true)).toEqual('1,234.42€');
      expect(currency(1234, '$', 0)).toEqual('$1,234');
    });

  });

  describe('demo', function() {

    it('should verify demo use cases', function() {
      // With all parameters
      expect(currency(1234.4239, '€', 0, true)).toEqual('1,234€');

      // With missing fraction size
      expect(currency(1234.4239, '€', true)).toEqual('1,234.42€');

      // With fraction size only
      expect(currency(1234.4239, '$', 3)).toEqual('$1,234.424');

      // Only with symbol
      expect(currency(1234.4239, '$')).toEqual('$1,234.42');
    });

  });

});
