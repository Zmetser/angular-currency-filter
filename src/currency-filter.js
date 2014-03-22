/*global toString */
(function( angular ) {
  'use strict';

  var isBoolean = function ( obj ) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
  };

  angular.module('currencyFilter', []).
    filter('currency', ['$injector', '$locale', function ( $injector, $locale ) {
      var $filter = $injector.get('$filter');
      var numberFilter = $filter('number');
      var formats = $locale.NUMBER_FORMATS;
      var pattern = formats.PATTERNS[1];
      // https://github.com/angular/angular.js/pull/3642
      formats.DEFAULT_PRECISION = angular.isUndefined(formats.DEFAULT_PRECISION) ? 2 : formats.DEFAULT_PRECISION;
      return function ( amount, currencySymbol, fractionSize, suffixSymbol ) {
        if ( !angular.isNumber(amount) ) { return ''; }
        if ( angular.isUndefined(currencySymbol) ) { currencySymbol = formats.CURRENCY_SYM; }
        var isNegative = amount < 0;
        var parts = [];

        suffixSymbol = isBoolean(fractionSize) ? fractionSize : suffixSymbol;
        fractionSize = isBoolean(fractionSize) ? formats.DEFAULT_PRECISION : fractionSize;
        fractionSize = angular.isUndefined(fractionSize) ? formats.DEFAULT_PRECISION : fractionSize;

        amount = Math.abs(amount);

        var number = numberFilter( amount, fractionSize );

        parts.push(isNegative ? pattern.negPre : pattern.posPre);
        parts.push(!suffixSymbol ? currencySymbol : number);
        parts.push(suffixSymbol ? currencySymbol : number);
        parts.push(isNegative ? pattern.negSuf : pattern.posSuf);

        return parts.join('').replace(/\u00A4/g, '');
      };
    }]);

}( angular ));
