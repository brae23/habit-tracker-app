import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from 'src/app/models/list';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IListItem } from 'src/app/models/i-list-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private baseUrl = `${environment.baseUrl}/api/lists`;

  constructor(private http: HttpClient) {}

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.baseUrl);
  }

  getDailyTaskList(): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/daily`);
  }

  getList(id: string): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/${id}`);
  }

  createList(list: Partial<List>): Observable<List> {
    return this.http.post<List>(this.baseUrl, list);
  }

  updateList(id: string, list: Partial<List>): Observable<List> {
    return this.http.put<List>(`${this.baseUrl}/${id}`, list);
  }

  deleteList(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}