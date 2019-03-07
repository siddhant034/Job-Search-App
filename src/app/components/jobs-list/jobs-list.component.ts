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
  locationToggle: boolean;
  experienceToggle: boolean;

  constructor() { }

  ngOnInit() {
  }

  onToggleChange(type) {
    if (type == 1) {
      this.locationToggle = !this.locationToggle;
    }
    else {
      this.experienceToggle = !this.experienceToggle;
    }
    this.sortList();
  }

  sortList() {
    if (!this.locationToggle && !this.experienceToggle) {
      return;
    }
    this.displayList = this.displayList.sort((job1: JobModel, job2: JobModel) => {
      if (this.locationToggle && this.experienceToggle) {
        let locationDiff = job1.location.toLowerCase().trim().localeCompare(job2.location.toLowerCase().trim());
        if (locationDiff > 0) {
          return 1;
        }
        else if (locationDiff < 0) {
          return -1;
        }
        else {
          return job1.experience.trim().toLowerCase().localeCompare(job2.experience.trim().toLowerCase());
        }
      }
      else if (this.locationToggle) {
        return job1.location.toLowerCase().trim().localeCompare(job2.location.toLowerCase().trim());
      }
      else {
        return job1.experience.trim().toLowerCase().localeCompare(job2.experience.trim().toLowerCase());
      }
    })
  }

  filter() {
    this.filterText = this.filterText.trim().toLowerCase();
    if (!this.filterText || this.filterText == '') {
      this.displayList = this.jobsList;
    }
    else {
      this.displayList = this.jobsList.filter((x: JobModel) => {
        x.skills.trim().toLowerCase().includes(this.filterText) || x.companyname.trim().toLowerCase().startsWith(this.filterText) || x.title.trim().toLowerCase().includes(this.filterText);
      });
    }
    this.sortList();
  }

  ngOnChanges() {
    this.filterText = '';
    this.experienceToggle = false;
    this.locationToggle = false;
    this.displayList = this.jobsList;
    if (!this.displayList) {
      this.displayList = [];
    }
  }

}
