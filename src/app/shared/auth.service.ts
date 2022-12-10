import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { course } from './course';
import { lesson } from './lesson';
import { video } from './video';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://localhost:44349/api/User/api/v1/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}signUp`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/myProfile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
    // courses
    getCoursesList(): Observable<course[]> {
      return this.http.get<course[]>(this.endpoint + 'Course/api/v1/getAll?page=1&pageSize=5&sortDirection=ascending');
    }
  
    addCourse(course:any): Observable<course> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<course>(this.endpoint + 'Course/api/v1/create', course, httpOptions);
    }
  
    updateCourse(id:any,course: any): Observable<course> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<course>(this.endpoint + 'Course/api/v1/update'+ id, course, httpOptions);
    }
  
    deleteCourse(id: any): Observable<course> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.delete<course>(this.endpoint + 'Course/api/v1/delete/' + id, httpOptions);
    }
        // lesson
  getLessonList(): Observable<lesson[]> {
    return this.http.get<lesson[]>(this.endpoint + 'Lesson/api/v1/getAll?page=1&pageSize=5&sortDirection=ascending');
  }

  addLesson(lesson: any): Observable<lesson> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<lesson>(this.endpoint + 'Lesson/api/v1/create', lesson, httpOptions);
  }

  updateLesson(id:any,lesson: any): Observable<lesson> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<lesson>(this.endpoint + 'api/Lesson/api/v1/update'+ id, lesson, httpOptions);
  }

  deleteLesson(id: number): Observable<lesson> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<lesson>(this.endpoint + 'Lesson/api/v1/delete/' + id, httpOptions);
  }
  getAllCourseNames(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint + 'lesson/GetAllCourseNames');
  }
  // Video
   getVideoList(): Observable<video[]> {
        return this.http.get<video[]>(this.endpoint + 'Video/api/v1/getAll?page=1&pageSize=5&sortDirection=ascending');
      }
    
      addVideo(video: any): Observable<video> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<video>(this.endpoint + 'Video/api/v1/create', video, httpOptions);
      }
    
      updateVideo(id:any,video: any): Observable<video> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<video>(this.endpoint + 'Video/api/v1/update'+ id, video, httpOptions);
      }
    
      deleteVideo(id: number): Observable<video> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<video>(this.endpoint + 'Video/api/v1/delete/' + id, httpOptions);
      }
      getAllLessoNames(): Observable<any[]> {
        return this.http.get<any[]>(this.endpoint + 'lesson/GetAllLessonNames');
      }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}