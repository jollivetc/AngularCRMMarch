import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http:HttpClient) { }

  getAllConsumers():Observable<Consumer[]> {
    return this.http.get<Consumer[]>('/api/consumers');
  }

  findConsumers(search:string):Observable<Consumer[]>{
    //return this.http.get<Consumer[]>(`/api/consumers?q=${search}`);
    return this.http.get<Consumer[]>(`/api/consumers`, {params:{q:search}})
  }

  save(consumer:Consumer):Observable<Consumer>{
    if(consumer.id){
      return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer);
    }
    return this.http.post<Consumer>('/api/consumers', consumer);
  }

  findConsumerById(id:string):Observable<Consumer>{
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }

  deleteConsumer(id:number):Observable<Object>{
    return this.http.delete<Object>(`/api/consumers/${id}`)
  }
}
