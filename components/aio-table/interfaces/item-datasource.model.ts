import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, of, finalize, map, tap } from "rxjs";
import { BaseFindRequest, BasePaginatedResponse } from "src/app/models/request.model";

export class PaginatedItemsDataSource<T> implements DataSource<T> {

    private itemsSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private itemsCountSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public itemsCount$ = this.itemsCountSubject.asObservable();

    constructor(private loadingMethod: Function,
                private startLoadingMethod?: Function,
                private endLoadingMethod?: Function,
                private mappingMethod?: Function) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.itemsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }

    loadItems(filterFormValues = {},
              sortDirection = '',
              pageIndex = 0,
              pageSize = 10) {

        this.loadingSubject.next(true);
        this.startLoadingMethod();
        
        const filters: BaseFindRequest = {
            ...filterFormValues,
            orderBy: sortDirection,
            record_number: pageSize,
            page: pageIndex+1
        };
        this.loadingMethod(filters)
            .pipe(
                tap((data: BasePaginatedResponse<any>) => this.itemsCountSubject.next(data.data.pagination.total)),
                map((data: BasePaginatedResponse<any>) => this.mappingMethod ? this.mappingMethod(data.data.content) : data.data.content),
                catchError(() => of([])),
                finalize(() => {
                    this.loadingSubject.next(false);
                    this.endLoadingMethod ? this.endLoadingMethod() : null;
                })
            )
            .subscribe(items => {
                this.setItems(items);
            });
    }
    
    setItems(items: any[]): void {
        this.itemsSubject.next(items);
    }
}
