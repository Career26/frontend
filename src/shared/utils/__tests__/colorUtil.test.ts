import { getColorsObject } from '../colorUtil';

const industries = [1, 2].map((id) => `Industry ${id}`);
const mockColors = {
  'Industry 1': 'pink',
  'Industry 2': 'orange',
};

describe('colorUtil', () => {
  it('Should return new colors object', () => {
    expect(getColorsObject({ initialColors: {}, industries })).toEqual(mockColors);
  });
  it('Should not replace existing color', () => {
    expect(getColorsObject({ initialColors: mockColors, industries: [industries[0]] })).toEqual(
      mockColors,
    );
  });
});
