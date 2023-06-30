import {
    hasExtentions,
    getFileUrlReplacedPlaceholder,
    getUrlToLaunch,
    WORD_EXTENSIONS, EXCEL_EXTENSIONS
  } from './file-launcher.util';
  
  describe('Test file launcher util', () => {
  
    describe('hasExtentions', () => {
      it('Should return true because provided valid word files', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file.doc';
        const file2 = 'C:/MyFolder/my-file.docx';
        const file3 = 'C:/MyFolder/my-file.docm';
        // When
        const result1 = hasExtentions(file1, WORD_EXTENSIONS);
        const result2 = hasExtentions(file2, WORD_EXTENSIONS);
        const result3 = hasExtentions(file3, WORD_EXTENSIONS);
        // Then
        expect(result1).toBeTrue();
        expect(result2).toBeTrue();
        expect(result3).toBeTrue();
      });
      it('Should return false because provided invalid word files', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file.xsl';
        const file2 = 'C:/MyFolder/my-file.txt';
        const file3 = 'C:/MyFolder/my-file.jpeg';
        // When
        const result1 = hasExtentions(file1, WORD_EXTENSIONS);
        const result2 = hasExtentions(file2, WORD_EXTENSIONS);
        const result3 = hasExtentions(file3, WORD_EXTENSIONS);
        // Then
        expect(result1).toBeFalse();
        expect(result2).toBeFalse();
        expect(result3).toBeFalse();
      });
      it('Should return true because provided valid excel files', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file.xls';
        const file2 = 'C:/MyFolder/my-file.xlsx';
        const file3 = 'C:/MyFolder/my-file.xlsm';
        const file4 = 'C:/MyFolder/my-file.csv';
        // When
        const result1 = hasExtentions(file1, EXCEL_EXTENSIONS);
        const result2 = hasExtentions(file2, EXCEL_EXTENSIONS);
        const result3 = hasExtentions(file3, EXCEL_EXTENSIONS);
        const result4 = hasExtentions(file4, EXCEL_EXTENSIONS);
        // Then
        expect(result1).toBeTrue();
        expect(result2).toBeTrue();
        expect(result3).toBeTrue();
        expect(result4).toBeTrue();
      });
      it('Should return false because provided invalid excel files', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file';
        const file2 = 'C:/MyFolder/my-file.txt';
        const file3 = 'C:/MyFolder/my-file.jpeg';
        // When
        const result1 = hasExtentions(file1, EXCEL_EXTENSIONS);
        const result2 = hasExtentions(file2, EXCEL_EXTENSIONS);
        const result3 = hasExtentions(file3, EXCEL_EXTENSIONS);
        // Then
        expect(result1).toBeFalse();
        expect(result2).toBeFalse();
        expect(result3).toBeFalse();
      });
    });
  
    describe('getFileUrlReplacedPlaceholder', () => {
      it('Should return file url with all placeholders replaced', () => {
        // Give
        const filePath = 'http://www.my-url.com/[TEXT1]/[TEXT2]/[TEXT3]';
        const placeholders = {
          '[TEXT1]': 'MonTexte1',
          '[TEXT2]': 'MonTexte2',
          '[TEXT3]': 'MonTexte3',
        };
        // When
        const result = getFileUrlReplacedPlaceholder(filePath, placeholders);
        // Then
        const filePathReplaced = 'http://www.my-url.com/MonTexte1/MonTexte2/MonTexte3';
        expect(result).toEqual(filePathReplaced);
      });
  
      it('Should return file url with all placeholders replaced', () => {
        // Give
        const filePath = 'http://www.my-url.com/[TEXT1]/[TEXT2]/[TEXT3]';
        const placeholders = {
          '[TEXT1]': 'MonTexte1',
          '[TEXT2]': '',
          '[TEXT3]': 'MonTexte3',
        };
        // When
        const result = getFileUrlReplacedPlaceholder(filePath, placeholders);
        // Then
        const filePathReplaced = 'http://www.my-url.com/MonTexte1/MonTexte3';
        expect(result).toEqual(filePathReplaced);
      });
  
      it('Should return file url with placeholders partially replaced', () => {
        // Give
        const filePath = 'http://www.my-url.com/[TEXT1]/[TEXT2]/[TEXT3]';
        const placeholders = {
          '[TEXT1]': 'MonTexte1',
          '[TEXT2]': 'MonTexte2',
        };
        // When
        const result = getFileUrlReplacedPlaceholder(filePath, placeholders);
        // Then
        const filePathReplaced = 'http://www.my-url.com/MonTexte1/MonTexte2/[TEXT3]';
        expect(result).toEqual(filePathReplaced);
      });
      it('Should return file url with not placeholder replaced', () => {
        // Give
        const filePath = 'http://www.my-url.com/[TEXT1]/[TEXT2]/[TEXT3]';
        const placeholders = {};
        // When
        const result = getFileUrlReplacedPlaceholder(filePath, placeholders);
        // Then
        const filePathReplaced = 'http://www.my-url.com/[TEXT1]/[TEXT2]/[TEXT3]';
        expect(result).toEqual(filePathReplaced);
      });
    });
  
    describe('getUrlToLaunch', () => {
      it('Should return unchanged file url for remote files', () => {
        // Give
        const filePath = 'http://www.my-url.com/MonTexte1/MonTexte2/MonTexte2';
        const isNetworkResource = false;
        // When
        const result = getUrlToLaunch(filePath, isNetworkResource);
        // Then
        const urlToLaunch = 'http://www.my-url.com/MonTexte1/MonTexte2/MonTexte2';
        expect(result).toEqual(urlToLaunch);
      });
      it('Should return file url for local excel files with microsoft exel scheme', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file.xls';
        const file2 = 'C:/MyFolder/my-file.xlsx';
        const file3 = 'C:/MyFolder/my-file.xlsm';
        const file4 = 'C:/MyFolder/my-file.csv';
        const isNetworkResource = true;
        // When
        const result1 = getUrlToLaunch(file1, isNetworkResource);
        const result2 = getUrlToLaunch(file2, isNetworkResource);
        const result3 = getUrlToLaunch(file3, isNetworkResource);
        const result4 = getUrlToLaunch(file4, isNetworkResource);
        // Then
        expect(result1).toEqual('ms-excel:ofe|u|C:/MyFolder/my-file.xls');
        expect(result2).toEqual('ms-excel:ofe|u|C:/MyFolder/my-file.xlsx');
        expect(result3).toEqual('ms-excel:ofe|u|C:/MyFolder/my-file.xlsm');
        expect(result4).toEqual('ms-excel:ofe|u|C:/MyFolder/my-file.csv');
      });
      it('Should return file url for local word files with microsoft word scheme', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file.doc';
        const file2 = 'C:/MyFolder/my-file.docx';
        const file3 = 'C:/MyFolder/my-file.docm';
        const isNetworkResource = true;
        // When
        const result1 = getUrlToLaunch(file1, isNetworkResource);
        const result2 = getUrlToLaunch(file2, isNetworkResource);
        const result3 = getUrlToLaunch(file3, isNetworkResource);
        // Then
        expect(result1).toEqual('ms-word:ofe|u|C:/MyFolder/my-file.doc');
        expect(result2).toEqual('ms-word:ofe|u|C:/MyFolder/my-file.docx');
        expect(result3).toEqual('ms-word:ofe|u|C:/MyFolder/my-file.docm');
      });
      it('Should return unchanged file url for local other files', () => {
        // Give
        const file1 = 'C:/MyFolder/my-file';
        const file2 = 'C:/MyFolder/my-file.txt';
        const file3 = 'C:/MyFolder/my-file.jpeg';
        const isNetworkResource = true;
        // When
        const result1 = getUrlToLaunch(file1, isNetworkResource);
        const result2 = getUrlToLaunch(file2, isNetworkResource);
        const result3 = getUrlToLaunch(file3, isNetworkResource);
        // Then
        expect(result1).toEqual(file1);
        expect(result2).toEqual(file2);
        expect(result3).toEqual(file3);
      });
    });
  
  
  })
  