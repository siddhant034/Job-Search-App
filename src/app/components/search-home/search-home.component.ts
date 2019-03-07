import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { JobModel } from '../../models/JobModel';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {

  @Input() jobsList: Array<JobModel>;
  DEFAULT_COMBO_OPTION: string = '--Any--'
  filteredJobsList: Array<JobModel>;
  isJobsListVisible: boolean;
  selectedLocation: string;
  selectedExperience: string;
  experienceLevels = [];
  locations = [];

  constructor() { }

  ngOnInit() {
    this.selectedExperience = this.DEFAULT_COMBO_OPTION;
    this.selectedLocation = this.DEFAULT_COMBO_OPTION;
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes['jobsList']) {
      //make list of unique experience levels and locations
      let experienceLevelsObj = {};
      let locationsObj = {};
      for (let job of this.jobsList) {
        if (job.experience) {
          experienceLevelsObj[job.experience] = job.experience;
        }
        if (job.location) {
          locationsObj[job.location] = job.location;
        }
      }
      this.experienceLevels = Object.values(experienceLevelsObj);
      this.locations = Object.values(locationsObj);
      this.experienceLevels.unshift(this.DEFAULT_COMBO_OPTION);
      this.locations.unshift(this.DEFAULT_COMBO_OPTION);
    }
  }

  onSearchClick() {
    this.filteredJobsList = this.jobsList.filter((job: JobModel) => {
      let locationMatch: boolean;
      let experienceMatch: boolean;
      if (this.selectedExperience == this.DEFAULT_COMBO_OPTION) {
        experienceMatch = true;
      }
      else {
        experienceMatch = (job.experience.toLowerCase().trim() == this.selectedExperience);
      }
      if (this.selectedLocation == this.DEFAULT_COMBO_OPTION) {
        locationMatch = true;
      }
      else {
        locationMatch = (job.location.toLowerCase().trim() == this.selectedLocation);
      }
      return (locationMatch && experienceMatch);
    });
    this.isJobsListVisible = true;
  }

}
