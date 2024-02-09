import { Component } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

}

// daily checklist to see which thigns you've filled out so far on home page that links to each 
// checklist, and if filled out would take you to edit instead of add
// view in DB? per user per table in tables visible
// select uesrid, tablename, join each table to see if filled out that day, where date = getdate 
// in api - where user = user

// create 3 square buttons - one for quick setup, one for detailed setup, one for include everything
// quick setup - choose which tables you want to see only (maybe include details on each)
// detailed setup - create custom form from questionprefs that goes thorugh every page of every table
// would have next button instead of save and next woudl take you to the next tab
// also probably good to have tutorial of what you're selecting (which questions you want to fill out in each section)

// djkfls