import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastListService } from 'src/app/service/toast-list.service';
import { Toast } from 'src/model/toast.model';

@Component({
  selector: 'app-toast-list',
  templateUrl: './toast-list.component.html',
  styleUrls: ['./toast-list.component.css']
})
export class ToastListComponent implements OnInit, OnDestroy {

  private toastListSubscription!: Subscription;

  toastList!: Toast[];

  constructor(
    private toastListService: ToastListService
  ) { }

  ngOnInit(): void {
    this.toastListSubscription = this.toastListService.toastList$.subscribe((toastList: Toast[]) => {
      this.toastList = toastList;
    });
  }

  ngOnDestroy(): void {
    this.toastListSubscription.unsubscribe();
  }

  closeNotification(id: string): void {
    const toast = this.toastListService.removeToast(id);
    if(!toast) console.error("No se pudo cerrar la notificación");
  }
}
