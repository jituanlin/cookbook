import {fromTraversable, Traversal} from 'monocle-ts';
import {tree} from 'fp-ts';
import {Section} from '../types';
import {Tree} from 'fp-ts/Tree';

export const sectionM: Traversal<Tree<Section>, Section> = fromTraversable(
  tree.Traversable
)<Section>();

export const SectionM = (id: number): Traversal<Tree<Section>, Section> =>
  sectionM.filter((section: Section) => section.id === id);
