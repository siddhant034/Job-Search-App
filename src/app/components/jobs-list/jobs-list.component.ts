import { Component, OnInit, Input } from '@angular/core';
import { JobModel } from '../../models/JobModel';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  @Input() jobsList : Array<JobModel>;
  filterText : string = '';
  displayList : Array<JobModel> = [];

  constructor() { }

  ngOnInit() {
  }

  sortByLocation(){

  }

  sortByExperience(){

  }

  filter(){
    
  }

  ngOnChanges(){
    this.filterText = '';
    this.displayList = this.jobsList;
    if(!this.displayList){
      this.displayList = [];
    }
  }

}
