'use strict';

const stampit = require('stampit');


const Environment = stampit({
  props: {
    platform: {
      darwin: process.platform === 'darwin',
      linux: process.platform === 'linux',
    },
  },
});


module.exports = Environment;
