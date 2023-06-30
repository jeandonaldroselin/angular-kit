import { FormatListingPipe } from './format-listing.pipe';
import {of} from 'rxjs';

describe('FormatListingPipe', () => {
  const unfiltered = [
    {libelle: 'B', id: 'B'},
    {libelle: 'A', id: 'A'},
    {libelle: 'C', id: 'C'}
  ];
  const unfilteredWithTwoFirstResults = [
    {libelle: 'B', id: 'B'},
    {libelle: 'A', id: 'A'}
  ];
  const filteredAscending = [
    {libelle: 'A', id: 'A'},
    {libelle: 'B', id: 'B'},
    {libelle: 'C', id: 'C'}
  ];
  const filteredAscendingWithTwoFirstResults = [
    {libelle: 'A', id: 'A'},
    {libelle: 'B', id: 'B'}
  ];
  const filteredDescending = [
    {libelle: 'C', id: 'C'},
    {libelle: 'B', id: 'B'},
    {libelle: 'A', id: 'A'}
  ];
  const filteredDescendingWithTwoFirstResults = [
    {libelle: 'C', id: 'C'},
    {libelle: 'B', id: 'B'}
  ];
  const sortingFunction = (attribute: string, order: 'asc'|'desc') => {
    return (a: any, b: any) => {
      let output;
      if (a[attribute] < b[attribute]) {
        output = order === 'asc' ? -1 : 1;
      } else if (a[attribute] > b[attribute]) {
        output = order === 'desc' ? -1 : 1;
      } else {
        output = 0;
      }
      return output;
    };
  }

  it('should create an instance', () => {
    const pipe = new FormatListingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array if an empty undefined observable is provided', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(undefined)).toEqual([]);
  });

  it('should return an empty array if a null undefined observable is provided', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should return an unchanged list', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered)).toEqual(unfiltered);
  });

  it('should return a sorted list (ascending)', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered, sortingFunction('libelle', 'asc'))).toEqual(filteredAscending);
  });

  it('should return a sorted list (descending)', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered, sortingFunction('libelle', 'desc'))).toEqual(filteredDescending);
  });

  it('should return an unfiltered list with two max results', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered, null, 2)).toEqual(unfilteredWithTwoFirstResults);
  });

  it('should return a sorted list (ascending) with two max results', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered, sortingFunction('libelle', 'asc'), 2)).toEqual(filteredAscendingWithTwoFirstResults);
  });

  it('should return a sorted list (descending) with two max results', () => {
    const pipe = new FormatListingPipe();
    expect(pipe.transform(unfiltered, sortingFunction('libelle', 'desc'), 2)).toEqual(filteredDescendingWithTwoFirstResults);
  });
});
