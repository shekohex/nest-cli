#!/usr/bin/env node

import { load } from "../commands/commands.loader";

const program = require('caporal');
program
  .version(require('../package.json').version)
  .description(require('../package.json').description);
// require('../commands/new')(program);
// require('../commands/generate')(program);
// require('../commands/info')(program);
load(program);
program.parse(process.argv);
