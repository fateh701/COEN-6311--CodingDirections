import { Component } from '@angular/core';
import {SharedService} from "../shared.service";
import Chart from 'chart.js/auto';
import "papaparse"

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  chart:any;
  revenueChart:any;
  totalRevenue: number = 0;
  colors: string[] = []; // Array to store dynamically generated colors
  searchPackage: string = ''; // Variable to store the search package name
  originalData: any[] = []; // Original chart data
  filteredData: any[] = []; // Filtered chart data

  constructor(private service:SharedService) {
    this.getTravelPackageVsBookingCountReport()
    this.getRevenuePerPackageReport()
  }

  //This is the main method
  getTravelPackageVsBookingCountReport= () => {
    this.service.getTravelPackageVsBookingCountData().subscribe(
      data => {
        this.filteredData= data;
        this.originalData =data;
        this.updateChart();
      },
      error => {
        console.log(error);
      },
    );
  }

  //based on frontend action ,this function below will act diff,for first time it will create chart instance and for next time (i.e it will update)
  updateChart(): void {
    const labels = this.filteredData.map(entry => entry.travel_package_name)
    const counts = this.filteredData.map(entry => entry.booking_count)

    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = counts;
      this.chart.update();
    } else {
      // Generate colors dynamically based on the number of columns
      this.colors = this.generateColors(counts.length);
      this.chart = new Chart('travelPackageVsBookingCountChart',{
          type:'bar',
          data:{
            labels: labels,
            datasets:[{
              label: 'Travel Package Vs Booking Count',
              data: counts,
              backgroundColor: this.colors, // Assign colors dynamically
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y',  //so to see travel package on y axis and count on x axis
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio:5,  //width/height ration
            animation: {
              duration: 2000, // Set the duration of the animation in milliseconds
              easing: 'easeInOutQuart' // Set the easing function for the animation
            }
          }
        });


    }

  }

  //for exporting chart data into csv format,NOTE :- dont use comma in travel package name,other wise while exporting to csv it will parse automatically into new column
  exportData() {
    const labels = this.chart.data.labels;
    const counts = this.chart.data.datasets[0].data;
    const csvData = this.formatDataAsCSV(labels, counts);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'TravelPackageVsBookingCount.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  formatDataAsCSV(labels: string[], counts: number[]): string {
    let csv = 'TravelPackageName,TotalBooked\n';
    for (let i = 0; i < labels.length; i++) {
      csv += `${labels[i]},${counts[i]}\n`;
    }
    return csv;
}

  formatRevenueDataAsCSV(labels: string[], counts: number[]): string {
    let csv = 'TravelPackageName,Revenue\n';
    for (let i = 0; i < labels.length; i++) {
      csv += `${labels[i]},${counts[i]}\n`;
    }
    return csv;
  }

  exportRevenueData() {
    const labels = this.revenueChart.data.labels;
    const counts = this.revenueChart.data.datasets[0].data;
    const csvData = this.formatRevenueDataAsCSV(labels, counts);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'RevenuePerPackage.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }



  //called from frontend when we provide input to search button
  applyFilter(): void {
    if (this.searchPackage.trim() === '') {
      this.filteredData = this.originalData;
    } else {
      this.filteredData = this.originalData.filter(entry =>
        entry.travel_package_name.toLowerCase().includes(this.searchPackage.toLowerCase())
      );
    }
    this.updateChart();
  }

  // Function to generate an array of random colors
  generateColors(count: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(this.randomLightColor());
  }
  return colors;
}

  randomLightColor(): string {
    const r = Math.floor(Math.random() * 156) + 100; // Red component (100-255)
    const g = Math.floor(Math.random() * 156) + 100; // Green component (100-255)
    const b = Math.floor(Math.random() * 156) + 100; // Blue component (100-255)
    return `rgb(${r}, ${g}, ${b})`;
  }


  getRevenuePerPackageReport(){
    this.service.getRevenuePerPackageData().subscribe(
      data => {
        const labels = data.map(entry => entry.travel_package_name)
        const counts = data.map(entry => entry.revenue)

        //Calculating the total revenue
        this.totalRevenue = counts.reduce((acc, val) => acc + val, 0);

        this.revenueChart = new Chart('revenuePerPackageChart',{
          type:'pie',
          data:{
            labels: labels,
            datasets:[{
              label: 'Revenue Per Package',
              data: counts,
              backgroundColor: this.generateColors(counts.length), // Assign colors dynamically
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio:4,  //width/height ration
            animation: {
              duration: 2000, // Set the duration of the animation in milliseconds
              easing: 'easeInOutQuart' // Set the easing function for the animation
            }
          }
        });




      },
      error => {
        console.log(error);
      },
    );
  }


}
