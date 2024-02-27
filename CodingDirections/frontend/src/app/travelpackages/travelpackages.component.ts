import { Component } from '@angular/core';

@Component({
  selector: 'app-travelpackages',
  templateUrl: './travelpackages.component.html',
  styleUrl: './travelpackages.component.css'
})
export class TravelpackagesComponent {

}
const cancelTravelPackage = async (TravelPackage_name) => {
  try {
    const response = await fetch(`/TravelPackage/${TravelPackage_name}/cancel`, {
      method: 'PUT'
    });
    if (response.ok) {
      console.log('canceled');
    } else {
      console.error('Failed to cancel');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const updateTravelPackage = async (TravelPackage_name, newData) => {
  try {
    const response = await fetch(`/TravelPackage/${TravelPackage_name}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    if (response.ok) {
      console.log('updated');
    } else {
      console.error('Failed to update');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const express = require('express');
const app = express();
const port = 3000;
let TravelPackage = [
    { name: ‘’, date: '', flights: '', hotels: ‘’, activities:’’},
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render(‘TravelPacakage, {TravelPackage });
});

app.post('/update Travel’Package, (req, res) => {
    const {  name, flights, hotels, activities } = req.body;
    const TravelPackage = TravelPackage.find(TravelPackage => TravelPackage.name == name);
    if (booking) {
     TravelPackage.flights = flights;
      TravelPackage.hotels = hotels;
        TravelPackage.activities = activities;
        res.redirect('/');
    } else {
        res.status(404).send(‘not found');
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



