var fs = require("fs");
var content = fs.readFileSync("coverage/coverage-summary.json");
var report = JSON.parse(content);
var actualLineCoverage = report.total.lines.pct;

if(!process.argv || process.argv.length < 3) {
  console.error('*** ERROR ***');
  console.error('Coverage level required!');
  process.exit(1);
}

var requiredLineCoverage = process.argv[2];

if(actualLineCoverage < requiredLineCoverage) {
  console.error('*** ERROR ***');
  console.error('Required Coverage: ' + requiredLineCoverage);
  console.error('Actual Coverage: ' + actualLineCoverage);
  process.exit(1);
}

console.log('Required Coverage: ' + requiredLineCoverage);
console.log('Actual Coverage: ' + actualLineCoverage);



