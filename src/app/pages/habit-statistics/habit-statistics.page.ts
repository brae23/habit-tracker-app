import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habit-statistics',
  templateUrl: './habit-statistics.page.html',
  styleUrls: ['./habit-statistics.page.scss'],
})
export class HabitStatisticsPage implements OnInit {
  title: string;

  constructor() { }

  ngOnInit() {
    this.title = "Habit Stats";
  }

}
