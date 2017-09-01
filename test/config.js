var chai = require('chai');
var sinon = require('sinon');

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

chai.should();

global.expect = chai.expect;
global.sinon = sinon;
