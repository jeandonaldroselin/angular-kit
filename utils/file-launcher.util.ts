export const EXCEL_EXTENSIONS = ['xls','xlsx','xlsm','csv'];
export const WORD_EXTENSIONS = ['doc','docx','docm'];

export const hasExtentions = (resourceUrl: string, extensions: string[]): boolean => (
  extensions.includes(resourceUrl.split('.').pop())
)

export const getFileUrlReplacedPlaceholder = (resourceUrl: string,
                                              placeholders: { [key: string]: string }): string => (
  Object.keys(placeholders)
    .reduce((previous: string, current: string) => {
        const searchValue = !placeholders[current] ? `/${current}` : current;
        const replaceValue = !placeholders[current] ? '' : placeholders[current];
        return previous.replace(searchValue, replaceValue);
      }
      , resourceUrl)
);


export const getUrlToLaunch = (resourceUrl: string, isNetworkResource: boolean): string => {
  let urlToLaunch = (isNetworkResource ? resourceUrl.split('\\').join('/') : resourceUrl);
  if(isNetworkResource) {
    const isExcel = hasExtentions(resourceUrl, EXCEL_EXTENSIONS);
    const isWord = hasExtentions(resourceUrl, WORD_EXTENSIONS);
    if(isExcel) {
      urlToLaunch = `ms-excel:ofe|u|${urlToLaunch}`;
    } else if(isWord) {
      urlToLaunch = `ms-word:ofe|u|${urlToLaunch}`;
    }
  } else {
    urlToLaunch = urlToLaunch.split(' ').join('%');
  }
  return urlToLaunch;
}

export function launchFile(originalResourceUrl: string,
                     placeholders?: { [key: string]: string},
                     errorFunction?: (fileUrl: string) => any) {
  const isNetworkResource = ![
    originalResourceUrl.indexOf('http://'),
    originalResourceUrl.indexOf('https://')
  ].includes(0);
  const resourceUrlWithReplacedPlaceholder = !!placeholders ? getFileUrlReplacedPlaceholder(originalResourceUrl, placeholders) : originalResourceUrl;
  const urlToLaunch = getUrlToLaunch(resourceUrlWithReplacedPlaceholder, isNetworkResource);
  let openResult = null;
  try {
    openResult = window.open(urlToLaunch, '_blank');
  } catch(e) {} finally {
    if (!openResult) {
      if(!!errorFunction) {
        errorFunction(urlToLaunch);
      }
    }
  }
}
