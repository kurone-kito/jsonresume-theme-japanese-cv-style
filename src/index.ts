import type { ResumeSchema } from '@kurone-kito/jsonresume-types';
import groupBy from 'lodash/groupby';
import merge from 'lodash/merge';
import sortBy from 'lodash/sortby';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pug = require('./pug/index.pug');

const formatter = Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
});
const levelMap = new Map([
  ['beginner', '☆☆☆'],
  ['intermediate', '★☆☆'],
  ['advanced', '★★☆'],
  ['master', '★★★'],
]);

type Skill = NonNullable<ResumeSchema['skills']>[number];

const convertSkills = (skills: (Skill & { category?: string })[]) =>
  Object.entries(
    groupBy(skills, ({ category = '' }) => category || '')
  ).flatMap(([, items]) =>
    sortBy(
      items.map(({ level = '', ...item }) => ({
        level: levelMap.get(level) || level,
        ...item,
      })),
      ({ level }) => level
    ).map(({ category = '', ...item }, index) => ({
      ...(index ? {} : { category, rowSpan: items.length }),
      ...item,
    }))
  );

const convertWork = (work: NonNullable<ResumeSchema['work']>) =>
  sortBy(work, ({ startDate }) => startDate)
    .reverse()
    .map(({ startDate, endDate, ...item }) => ({
      ...item,
      startDate: startDate && formatter.format(new Date(startDate)),
      endDate: endDate ? formatter.format(new Date(endDate)) : '現在',
    }));

const convertPublications = (
  publications: NonNullable<ResumeSchema['publications']>
) =>
  sortBy(publications, ({ releaseDate }) => releaseDate)
    .reverse()
    .map(({ releaseDate, ...item }) => ({
      releaseDate: releaseDate && formatter.format(new Date(releaseDate)),
      ...item,
    }));

export const render = ({
  publications = [],
  skills = [],
  work = [],
  ...source
}: ResumeSchema): string => {
  const additional: ResumeSchema = {
    basics: { date: formatter.format(new Date()) },
    publications: convertPublications(publications),
    skills: convertSkills(skills),
    work: convertWork(work),
  };
  return pug(merge(source, additional));
};
export default render;
