import { Component, OnInit, Input } from '@angular/core';
import { JobModel } from '../../models/JobModel';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  @Input() jobsList: Array<JobModel>;
  filterText: string = '';
  displayList: Array<JobModel> = [];
  locationToggle: boolean = false;
  experienceToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // called on sort toggle change
  onToggleChange(type) {
    if (type == 1) {
      this.locationToggle = !this.locationToggle;
    }
    else {
      this.experienceToggle = !this.experienceToggle;
    }
    this.sortList();
  }

  // sorts list of displayed jobs
  sortList() {
    // if both toggles are false then leave list as it is
    if (!this.locationToggle && !this.experienceToggle) {
      return;
    }
    this.displayList = this.displayList.sort((job1: JobModel, job2: JobModel) => {
      if (this.locationToggle && this.experienceToggle) {
        if(!job1.location){
          return 1;
        }
        if(!job2.location){
          return -1;
        }
        let locationDiff = job1.location.toLowerCase().trim().localeCompare(job2.location.toLowerCase().trim());
        if (locationDiff > 0) {
          return -1;
        }
        else if (locationDiff < 0) {
          return 1;
        }
        else {
          return -1*(job1.experience.trim().toLowerCase().localeCompare(job2.experience.trim().toLowerCase()));
        }
      }
      else if (this.locationToggle) {
        return -1*(job1.location.trim().toLowerCase().localeCompare(job2.location.trim().toLowerCase()));
      }
      else {
        return -1*(job1.experience.trim().toLowerCase().localeCompare(job2.experience.trim().toLowerCase()));
      }
    })
  }

  // filters list of jobs based on title, skills or company name
  filter() {
    this.filterText = this.filterText.trim().toLowerCase();
    if (!this.filterText || this.filterText == '') {
      this.displayList = this.jobsList;
    }
    else {
      this.displayList = this.jobsList.filter((x: JobModel) => {
        if (x.skills.trim().toLowerCase().includes(this.filterText) || x.companyname.trim().toLowerCase().startsWith(this.filterText) || x.title.trim().toLowerCase().includes(this.filterText)) {
          return true;
        }
        return false;
      });
    }
    this.sortList();
  }

  //opens apply link in new tab
  onApplyClick(link: string) {
    window.open(link, '_blank');
  }

  //called when top level search params are changed
  ngOnChanges() {
    // take jobs list to initial state
    this.filterText = '';
    this.experienceToggle = false;
    this.locationToggle = false;
    this.displayList = this.jobsList;
    if (!this.displayList) {
      this.displayList = [];
    }
  }

}
