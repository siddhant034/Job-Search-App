import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobModel } from '../models/JobModel';
@Injectable()
export class JobsFetchService {

    constructor(private http: HttpClient) {
    }

    fetchJobs(url: string) {
        if (!url) {
            return;
        }
        return this.http.get(url);
    }

}