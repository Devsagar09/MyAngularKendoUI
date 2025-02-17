import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl = "https://localhost:7294/api/UserMasters/";

  //call HttpClient
  constructor(private http: HttpClient) { }
  
  getAllUser():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id:number):Observable<any> {
    return this.http.get<any>(this.apiUrl + id);
  }

  createUser(user:any):Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  
  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + userId, updatedUser,{
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  
  deleteUser(id:number):Observable<any> {
    return this.http.delete<any>(this.apiUrl + id);
  }

  loginuser(user:any):Observable<any> {
    return this.http.post<any>(this.apiUrl + "login", user);
  }

}
