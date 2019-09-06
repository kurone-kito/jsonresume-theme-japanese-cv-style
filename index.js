const pug = require('pug');
const fp = require('lodash/fp');

module.exports = {
  render: resume =>
    pug.renderFile(
      './pug/index.pug',
      fp.merge(resume)({
        basics: {
          date: new Date().toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      })
    )
};
