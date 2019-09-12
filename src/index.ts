import _ from 'lodash';
import 'ts-polyfill/lib/es2019-array';
import { ResumeSchema } from './resume.schema';

const pug = require('./pug/index.pug');

const formatter = Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long'
});
const levelMap = new Map([
  ['beginner', '☆☆☆'],
  ['intermediate', '★☆☆'],
  ['advanced', '★★☆'],
  ['master', '★★★']
]);

type Skill = NonNullable<ResumeSchema['skills']>[number];

const convertSkills = (skills: (Skill & { category?: string })[]) => {
  return Object.entries(
    _.groupBy(skills, ({ category = '' }) => category || '')
  ).flatMap(([, items]) =>
    _.sortBy(
      items.map(({ level = '', ...item }) => ({
        level: levelMap.get(level) || level,
        ...item
      })),
      ({ level }) => level
    ).map(({ category = '', ...item }, index) => ({
      ...(index ? {} : { category, rowSpan: items.length }),
      ...item
    }))
  );
};
const convertWork = (work: NonNullable<ResumeSchema['work']>) =>
  work.map(({ startDate, endDate, ...item }) => ({
    ...item,
    startDate: startDate && formatter.format(new Date(startDate)),
    endDate: endDate ? formatter.format(new Date(endDate)) : '現在'
  }));

export const render = ({ skills = [], work = [], ...source }: ResumeSchema) => {
  const additional: ResumeSchema = {
    basics: { date: formatter.format(new Date()) },
    skills: [...convertSkills(skills)],
    work: [...convertWork(work)]
  };
  return pug(_.merge(source, additional));
};
export default render;
