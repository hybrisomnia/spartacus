import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromUserStore from '../../../../user/store';
import * as fromAuthStore from './../../../../auth/store';
import { Store } from '@ngrx/store';

import * as fromRouting from '../../../../routing/store';

@Component({
  selector: 'y-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromUserStore.UserState>) {}

  orders$: Observable<any>;
  isLoaded$: Observable<boolean>;
  subscription: Subscription;
  private PAGE_SIZE = 5;
  private user_id: string;

  ngOnInit() {
    this.subscription = this.store
      .select(fromAuthStore.getUserToken)
      .subscribe(userData => {
        if (userData && userData.userId) {
          this.user_id = userData.userId;
          this.store.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.PAGE_SIZE
            })
          );
        }
      });

    this.orders$ = this.store.select(fromUserStore.getOrders).pipe(
      tap(orders => {
        if (Object.keys(orders.orders).length === 0) {
          this.store.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.PAGE_SIZE
            })
          );
        }
      })
    );

    this.isLoaded$ = this.store.select(fromUserStore.getOrdersLoaded);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  viewPage(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  goToOrderDetail(order) {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['my-account/orders/', order.code]
      })
    );
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }) {
    this.store.dispatch(
      new fromUserStore.LoadUserOrders({
        userId: this.user_id,
        pageSize: this.PAGE_SIZE,
        currentPage: event.currentPage,
        sort: event.sortCode
      })
    );
  }
}
