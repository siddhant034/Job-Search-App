import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { JobModel } from '../../models/JobModel';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {

  @Input() jobsList: Array<JobModel>;
  filteredJobsList: Array<JobModel>;
  experienceLevels = [];
  locations = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes['jobsList']) {
      //make list of unique experience levels and locations
      let experienceLevelsObj = {};
      let locationsObj = {};
      for (let job of this.jobsList) {
        experienceLevelsObj[job.experience] = job.experience;
        locationsObj[job.location] = job.location;
      }
      this.experienceLevels = Object.values(experienceLevelsObj);
      this.experienceLevels = ['a', 'b'];
      this.locations = Object.values(locationsObj);
      this.locations = ['a', 'b'];
    }
  }

  onSearchClick() {
    this.filteredJobsList = this.jobsList.filter((job: JobModel) => {
      return true;
    });
  }

}
