const fs = require('fs');
const path = require(`path`);

/**
 * extracts aliases from tsconfig.json
 */
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
const base = tsconfig.compilerOptions.baseUrl;
const paths = tsconfig.compilerOptions.paths;
const alias = {};
Object.entries(paths).forEach(([key, value]) => {
  alias[key.replace('/*', '')] = path.resolve(base, value[0].replace('/*', ''));
});

module.exports = {
  webpack: {
    alias,
  },
};
