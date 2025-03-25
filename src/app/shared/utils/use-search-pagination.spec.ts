import { useSearchablePaginatedList } from './use-search-pagination';

describe('useSearchablePaginatedList', () => {
  const mockData = [
    { name: 'South Africa', capital: ['Pretoria'] },
    { name: 'Namibia', capital: ['Windhoek'] },
    { name: 'Zimbabwe', capital: ['Harare'] }
  ];

  const signalData = () => mockData;

  it('filters data by name', () => {
    const utils = useSearchablePaginatedList(signalData, {
      searchFn: (item, term) => item.name.toLowerCase().includes(term)
    });

    utils.setSearchTerm('nam');
    expect(utils.filteredData().length).toBe(1);
    expect(utils.filteredData()[0].name).toBe('Namibia');
  });

  it('paginates filtered data', () => {
    const utils = useSearchablePaginatedList(signalData, { pageSize: 2 });

    expect(utils.paginatedData().length).toBe(2);
    utils.setPage(1);
    expect(utils.paginatedData().length).toBe(1);
  });
});
