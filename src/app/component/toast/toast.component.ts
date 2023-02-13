import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ToastListService } from 'src/app/service/toast-list.service';
import { Toast } from 'src/model/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  private autoHideSubscription!: Subscription;

  @Input() toast!: Toast;
  @Output() toClose: EventEmitter<string> = new EventEmitter();

  autoHide$!: Observable<Toast>;

  constructor(
    private toastListService: ToastListService
  ) {
    this.autoHide$ = new Observable((observer: Subscriber<Toast>) => {
      const timeOut = setTimeout(() => {
        observer.next(this.toast);
      }, this.toast.options?.timeToLive || 1000);

      return {
        unsubscribe() {
          clearTimeout(timeOut);
        },
      }
    });
  }

  ngOnInit(): void {
    if(this.toast.options?.autoHide){
      this.autoHideSubscription = this.autoHide$.subscribe((toast: Toast) => {
        this.toastListService.removeToast(toast.id);
      });
    }
  }

  ngOnDestroy(): void {
    if(this.autoHideSubscription){
      this.autoHideSubscription.unsubscribe();
    }
  }

  close(): void{
    this.toClose.emit(this.toast.id);
  }
}
