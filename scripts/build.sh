mkdir -p dist
cp src/currency-filter.js dist/currency-filter.js
uglifyjs dist/currency-filter.js \
  --screw-ie8 --compress --mangle --lint \
  --comments /\/\*\!/ \
  --source-map dist/currency-filter.min.map \
  --source-map-url currency-filter.min.map \
  --output dist/currency-filter.min.js
