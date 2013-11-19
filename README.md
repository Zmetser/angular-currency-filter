# Angular Currency Filter

Extend angular's built in currency filter.


## Description
Formats a number as a currency (ie $1,234.56 or 914.3534€).
When no currency symbol is provided, default symbol for current locale is used.

## Usage

Overwrites angular's default currency filter if module: `currencyFilter` is injected.

### In HTML Template Binding
    {{ currency_expression | currency[:symbol[:fractionSize[:suffixSymbol]]] }}

### In JavaScript
    $filter('currency')(amount[, symbol[, fractionSize[, suffixSymbol]]])

#### Paramaters

Param                   | Type    | Details
:---------------------- | :------ | :------
amount                  | number  | input to filter
symbol (optional)       | string  | Currency symbol or identifier to be displayed.
fractionSize (optional) | number  | Number of decimal places to round the number to. If this is not provided then the fraction size is computed from the current locale's number formatting pattern. In the case of the default locale, it will be 3.
suffixSymbol (optional) | boolean | If set to true the currency symbol will be placed after the amount.

#### Returns

String: Formatted number.

### Use cases

    // With all parameters
    expect(currency(1234.4239, '€', 0, true)).toEqual('1,234€');

    // With missing fraction size
    expect(currency(1234.4239, '€', true)).toEqual('1,234.42€');

    // With fraction size only
    expect(currency(1234.4239, '$', 3)).toEqual('$1,234.424');

    // Only with symbol
    expect(currency(1234.4239, '$')).toEqual('$1,234.42');

### Example

#### In HTML Template Binding

    <span ng-bind="price | currency:'€':true"></span>
   
#### In JavaScript 

    angular.module('app', ['currencyFilter']).
        controller('Ctrl', function ( $scope, $filter ) {
                var currency = $filter('currency');
                $scope.price = currency(1234.4239, '€', 0, true);
            });
