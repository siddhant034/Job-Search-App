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
    //set default combo value
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
          // split location by ',' and '/'
          let splitArr = [];
          if (job.location.includes(',')) {
            splitArr = job.location.split(',');
          }
          else {
            splitArr = job.location.split('/');
          }
          for (let location of splitArr) {
            locationsObj[location] = location;
          }
          //handle 'Bangalore' and 'Bengaluru' case
          if (locationsObj['Bangalore'] && locationsObj['Bengaluru']) {
            delete locationsObj['Bengaluru'];
          }
        }
      }
      this.experienceLevels = Object.values(experienceLevelsObj);
      this.locations = Object.values(locationsObj);
      this.experienceLevels.unshift(this.DEFAULT_COMBO_OPTION);
      this.locations.unshift(this.DEFAULT_COMBO_OPTION);
    }
  }

  // filters list based on top level search parameters
  onSearchClick() {
    this.filteredJobsList = this.jobsList.filter((job: JobModel) => {
      let locationMatch: boolean;
      let experienceMatch: boolean;
      if (this.selectedExperience == this.DEFAULT_COMBO_OPTION) {
        experienceMatch = true;
      }
      else {
        experienceMatch = (job.experience.toLowerCase().trim() == this.selectedExperience.trim().toLowerCase());
      }
      if (this.selectedLocation == this.DEFAULT_COMBO_OPTION || this.selectedLocation == 'Anywhere in India') {
        locationMatch = true;
      }
      else {
        //compare each part of the job location with the selected option ex : Hyderabad, Mumbai
        let splitArr = [];
        if (job.location.includes(',')) {
          splitArr = job.location.split(',');
        }
        else {
          splitArr = job.location.split('/');
        }
        for (let location of splitArr) {
          if (location.toLowerCase().trim() == this.selectedLocation.trim().toLowerCase()) {
            locationMatch = true;
            break;
          }
        }
      }
      return (locationMatch && experienceMatch);
    });
    this.isJobsListVisible = true;
  }
}
