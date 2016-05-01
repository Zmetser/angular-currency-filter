# Angular Currency Filter

[![Build Status](https://api.travis-ci.org/Zmetser/angular-currency-filter.png?branch=master)](https://travis-ci.org/Zmetser/angular-currency-filter)

Extend [angular's built in currency filter](http://docs.angularjs.org/api/ng.filter:currency).

## Description
Formats a number as a currency (ie *$1,234.56* or *914.3534€*).
When no currency symbol is provided, default symbol for current locale is used.

## Usage

Overwrites angular's default currency filter if module: `currencyFilter` is injected. *(complete example in the Example section)*

### In HTML Template Binding
    {{ currency_expression | currency:symbol[:fractionSize[:suffixSymbol[:customFormat]]] }}

### In JavaScript
    $filter('currency')(amount, symbol[, fractionSize[, suffixSymbol[, customFormat]]])

#### Paramaters

Param         | Type    | Details
:-----------  | :------ | :------
amount        | number  | Input to filter.
symbol        | string  | Currency symbol or identifier to be displayed. Falls back to [ng.$locale](https://code.angularjs.org/1.2.1/docs/api/ng.$locale).
fractionSize  | number  | Number of decimal places to round the number to. Falls back to [ng.$locale](https://code.angularjs.org/1.2.1/docs/api/ng.$locale)
suffixSymbol  | boolean | If set to true the currency symbol will be placed after the amount.
customFormat  | object  | Customize group and decimal separators (`GROUP_SEP`, `DECIMAL_SEP`) Both falls back to [ng.$locale](https://code.angularjs.org/1.2.1/docs/api/ng.$locale).

#### Returns

String: Formatted number.

### Use cases

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

### Example

#### HTML Template Binding

    <span ng-bind="price | currency:'€':true"></span> <!-- 1234.42€ -->
   
#### JavaScript 

    angular.module('app', ['currencyFilter']).
        controller('Ctrl', function ( $scope, $filter ) {
            var currency = $filter('currency');
            $scope.price = currency(1234.4239, '€', 0, true); // 1234€
        });


## Install

### Via bower

    bower install --save angular-currency-filter

Include `src/currency-filter.js` or `dist/currency-filter.min.js` to your project.

    <script src="/bower_components/angular-currency-filter/dist/currency-filter.min.js"></script>
    
Don't forget to add `currencyFilter` module to your app's dependecies.

## Test && Build

    $ npm install
    $ bower install

### Test

    $ grunt test

### Build

    $ grunt build

## Compatibility

Functionality verified with unit test with angular versions from `v1.2.1` to `v1.4.9`.
