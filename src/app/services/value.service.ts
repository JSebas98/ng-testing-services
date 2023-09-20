import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'Test value';

  constructor() { }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getPromiseValue(): Promise<string> {
    return Promise.resolve('Test promise value');
  }

  public getObservableValue(): Observable<string> {
    return of('Test observable value');
  }
}
