export function selectMatchingItem<T> (
    input: string|T,
    list: Array<T>,
    attributeToCompare: string,
    foundItemCallback: (item: T) => void
  ): boolean {
    // automatically select an item if a result matchs in list
    if(typeof input === 'string' && list !== undefined) {
      const foundItem = list.find((item) => {
        // Get deep or simple attributes (affaire.libelle.etc...)
        const itemValue = attributeToCompare.split('.').reduce((newObj, key, i) => i === 0 ? item[key] : newObj[key], null);
        return itemValue?.toLowerCase() === input.toLowerCase()
      });
      if(!!foundItem) {
        foundItemCallback(foundItem);
        return true;
      }
      return false;
    }
    return false;
  }
  
  export function suggestItems(key: string,
                               value: string|object,
                               filterFunction: (filters: any) => any,
                               searchFunction: () => any,
                               emptyFunction: () => any) {
    const filterValue = value && value[key] !== undefined && value[key] !== null
      ? value[key]
      : value;
    filterFunction({filters: {[key]: filterValue}});
    const valueType = value !== undefined && value !== null ? typeof value : 'none';
    const executeAfterFilter = { string: () => {
        searchFunction();
    }, object: () => {
        emptyFunction();
    }, none: () => {}};
    executeAfterFilter[valueType]();
  }
  
  
  
  