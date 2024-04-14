import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit {
  activity: any = {};
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.service.getSelectedActivity(id).subscribe(data => {
        this.activity = data;
      });
    }
  }

  onSubmit() {
    if (this.editing) {
      this.service.editActivity(this.activity.id, this.activity).subscribe(() => {
        console.log("edited!");
        location.reload();
      });
    } else {
      this.service.addActivity(this.activity).subscribe(() => {
        console.log("added!");
        location.reload();
      });
    }
  }

  reloadPage() {
    location.reload();
  }
}
