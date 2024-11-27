const FilteredComponent = () => <div>FilteredComponent</div>;
FilteredComponent.name = 'FilteredComponent';

const ExcludedComponent = () => <div>ExcludedComponent</div>;
ExcludedComponent.name = 'ExcludedComponent';

const TEST_CASE = {
  isReactElement: [
    // INFO: 기본 케이스
    {
      input: <div />,
      expectedOutput: true,
    },
    // INFO: 기본 케이스가 아닌 경우
    {
      input: {},
      expectedOutput: true,
    },
  ],
  getComponentTypeCheck: [
    {
      input: {
        children: [
          <FilteredComponent key="1" />,
          <ExcludedComponent key="2" />,
          <FilteredComponent key="3" />,
        ],
        filteredComponentName: FilteredComponent.name,
      },
      expectedOutput: 2,
    },
  ],
};

export { TEST_CASE };
