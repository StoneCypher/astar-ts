
const fs = require('fs');

const package = JSON.parse(fs.readFileSync('./package.json'));

fs.writeFileSync('./src/ts/generated_code/version.ts', `
const version    = "${package.version}",
      build_time = ${new Date().getTime()};

export {
  version,
  build_time
};
`);
