const pug = require('pug');
const fp = require('lodash/fp');

/** @typedef {import('./schema').ResumeSchema} ResumeSchema */

const dateFormatter = Intl.DateTimeFormat('ja-JP', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

module.exports = {
  /** @type {(resume: ResumeSchema) => string} */
  render: ({ skills, work, ...resume }) => {
    const sortedSkills = fp
      .sortBy(({ category }) => category)(skills)
      .reverse();
    const categories = fp.groupBy(({ category }) => category)(skills);
    /** @type {ResumeSchema} */
    const additional = {
      basics: { date: dateFormatter.format(Date.now()) },
      work: [
        ...(work || []).map(({ endDate, startDate, ...element }) => ({
          ...element,
          endDate:
            (endDate && dateFormatter.format(new Date(endDate))) || '現在',
          startDate: startDate && dateFormatter.format(new Date(startDate))
        }))
      ],
      skills: [...sortedSkills]
    };
    return pug.renderFile('./pug/index.pug', fp.merge(resume)(additional));
  }
};
