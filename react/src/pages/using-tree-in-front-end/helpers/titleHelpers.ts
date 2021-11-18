import {Title} from '../types';
import {option, pipeable, readonlyArray as ra} from 'fp-ts';
import {Option} from 'fp-ts/Option';
import {sequenceT} from 'fp-ts/Apply';

export const find = (id: number | null) => (
  titles: readonly Title[]
): Option<Title> => ra.findFirst((title: Title) => title.id === id)(titles);

export const findByParentId = (parentId: number | null) => (
  titles: readonly Title[]
): Option<Title> =>
  ra.findFirst((title: Title) => title.parentId === parentId)(titles);

export const idOf = (title: Title): number => title.id;

export const idsOf = (titles: readonly Title[]): readonly number[] =>
  ra.map((title: Title) => title.id)(titles);

export const filterByParentId = (parentId: number | null) => (
  titles: readonly Title[]
): readonly Title[] =>
  ra.filter((title: Title) => title.parentId === parentId)(titles);

export const coRecTree = (titles: readonly Title[]) => (
  id: number
): Option<[Title, number[]]> => {
  const self = find(id)(titles);

  const seeds = pipeable.pipe(
    self,
    option.map(s => filterByParentId(s.id)(titles)),
    option.map(ts => ra.map((t: Title) => t.id)(ts))
  );

  return sequenceT(option.option)(self, seeds as Option<number[]>);
};
