import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastOptions, ToastType } from 'src/model/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastListService {
  private toastList: Toast[] = [];
  private defaultTimeToLive = 2000;

  private toastListSubject: BehaviorSubject<Toast[]>;
  toastList$: Observable<Toast[]>;


  constructor() {
    this.toastListSubject = new BehaviorSubject<Toast[]>([]);
    this.toastList$ = this.toastListSubject.asObservable();
  }

  getToastList(): Toast[] {
    return this.toastList;
  }

  info(text: string, options?: ToastOptions): void{
    if(!options) options = {
      autoHide: true,
      timeToLive: this.defaultTimeToLive
    };
    this.addToast({
      id: crypto.randomUUID(),
      type: ToastType.Info,
      text,
      options
    });
  }

  error(text: string, options?: ToastOptions): void{
    if(!options) options = {
      autoHide: false,
      showCloseButton: true
    };
    this.addToast({
      id: crypto.randomUUID(),
      type: ToastType.Error,
      text,
      options
    });
  }

  success(text: string, options?: ToastOptions): void{
    if(!options) options = {
      autoHide: true,
      timeToLive: this.defaultTimeToLive
    };
    this.addToast({
      id: crypto.randomUUID(),
      type: ToastType.Success,
      text,
      options
    });
  }

  warning(text: string, options?: ToastOptions): void{
    if(!options) options = {
      autoHide: false,
      showCloseButton: true
    };
    this.addToast({
      id: crypto.randomUUID(),
      type: ToastType.Warning,
      text,
      options
    });
  }

  addToast(toast: Toast): void {
    this.toastList.push(toast);
    this.toastListSubject.next(this.toastList);
  }

  removeToast(id: string): Toast | null {
    const toastIndex = this.toastList.findIndex(t => t.id === id);
    const removedToast = this.toastList.splice(toastIndex, 1);
    if(removedToast.length > 0){
      this.toastListSubject.next(this.toastList);
      return removedToast[0];
    }
    return null;
  }
}
