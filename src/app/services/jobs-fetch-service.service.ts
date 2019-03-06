import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class JobsFetchService {

    constructor(private http: HttpClient) {
    }

    fetchJobs(url : string) {
        if(!url){
            return;
        }
        return this.http.get(url);
    }

}