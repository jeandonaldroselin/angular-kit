export function cleanSpaceString<T extends object>(objectDirty: T): T {
    if (!objectDirty || Array.isArray(objectDirty)) {
      return objectDirty;
    }
    const objectClean = {...objectDirty};
    for (const [key, value] of Object.entries(objectClean)) {
      objectClean[key] = typeof value === 'string' ? value.trim() : value;
    }
    return objectClean;
  }
  
  export function cleanObject<T>(obj: any): T {
    const copiedObject = JSON.parse(JSON.stringify(obj));
    for (const propName in copiedObject) {
      if (copiedObject[propName] === null || copiedObject[propName] === undefined) {
        delete copiedObject[propName];
      }
    }
    return copiedObject;
  }
  