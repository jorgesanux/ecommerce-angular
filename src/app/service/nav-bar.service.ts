import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NavBarService {
  updateClock(): Observable<Date> {
    return new Observable((observer) => {
      const timer = setInterval(() => {
        observer.next(new Date());
      }, 1000);

      return {
        unsubscribe() {
          clearInterval(timer);
        }
      };
    });
  }
}
