import { Component, OnInit } from '@angular/core';
import { JobsFetchService } from './services/jobs-fetch-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  url : string = 'https://api.myjson.com/bins/kez8a';

  constructor(
    private jobsFetchService: JobsFetchService
  ) { }

  ngOnInit() {
    this.jobsFetchService.fetchJobs(this.url).subscribe((data)=>{
      console.log('data',data);
    })
  }
}
