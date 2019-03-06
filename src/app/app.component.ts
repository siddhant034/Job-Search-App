import { Component, OnInit } from '@angular/core';
import { JobsFetchService } from './services/jobs-fetch-service.service';
import { JobModel } from './models/JobModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  url: string = 'https://api.myjson.com/bins/kez8a';
  jobsList: Array<JobModel> = [];

  constructor(
    private jobsFetchService: JobsFetchService
  ) { }

  ngOnInit() {
    // this.jobsFetchService.fetchJobs(this.url).subscribe((data)=>{
    // if(data){
    //   this.jobsList = data;
    // }
    // })
  }
}
