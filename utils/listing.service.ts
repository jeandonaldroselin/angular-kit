import { EventEmitter, Injectable } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, firstValueFrom, map, merge, of, startWith, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { SessionInfoService } from '@project/utils/session-info.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private sessionInfoService: SessionInfoService) { }

  async export(request: any, apiSpecificPath: string) {
    const token = await firstValueFrom(this.sessionInfoService.get());
    request.access_token = token.token;
    const params = Object.keys(request)
    .filter(function(key) {
      return !!request[key];
    })
    .map(function(key) {
        return key + '=' + encodeURIComponent(request[key]);
    }).join('&');
    window.open(`${environment.apiBaseUrl}/api/${apiSpecificPath}/export?${params}` , '_blank');
}

  handleFiltering<T1, T2>(getFormValuesFunction: Function,
                  filteringFunction: Function,
                  sort: MatSort,
                  paginator: MatPaginator,
                  pageSize: number,
                  filterChanged: EventEmitter<MatFormField>,
                  loadingFunction: Function){
    return merge(sort.sortChange, paginator.page, filterChanged)
    .pipe(
      startWith({}),
      switchMap(() => {
        const formValues = <T1>getFormValuesFunction();
        loadingFunction();
        return filteringFunction(Object.assign({
          orderBy: `${sort.active}|${sort.direction}`,
          page: paginator.pageIndex + 1,
          record_number: pageSize
        }, this.removeEmptyAttributes(formValues))
        ).pipe(catchError(() => of(null)));
      }),
      map(result => {
        // Flip flag to show that loading has finished.
        const requestReqult = <T2>result as any;
        const data = requestReqult?.data;

        if (data === null) {
          return {
            data: [],
            resultsCount: requestReqult?.pagination?.total
          };
        }

        // resultCount explanation :
        // Only refresh the result length if there is new result. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.

        return {
          data,
          resultsCount: requestReqult?.pagination.total
        };
      }),
    )
  }

  private removeEmptyAttributes(obj: Object) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v != ''));
  }

}
