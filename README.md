# Smarthome Dashboard

Dashboard enables user to oversee weather, power and switch status of the household. 

## Implemented Functionalities

* database for handling users
* persitent local storage for tokens
* Reload-less page switching 
* Grafana graphs 
* API for handling ESP calls 
* API for obtaining weather related data 
* API for obtaining power and energy related

## Architecture

<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153236121-72dca6df-9225-411e-932a-c55ab98be4db.png" width="500" />
</p>

## Login Page 
<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153239062-f4ea5707-7541-4453-967b-2160f618503f.jpg" width="250" />
</p>

* Login provides safety mechanisms such as limited number of wrong password entries.
* Persistent login, exept if user logouts prior to quitting the app.

# Registration From 
<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153239075-c4cf887d-5166-4f8b-8123-7064764a0df1.jpg" width="250" />
  <img src="https://user-images.githubusercontent.com/52485152/153239088-ee599b90-f70a-4c4e-9cd8-a20f2ce16495.jpg" width="250" /> 
  <img src="https://user-images.githubusercontent.com/52485152/153239098-33b322aa-2d1c-4d87-b4d2-82a8332a9f0d.jpg" width="250" />
</p>

* Registration form provides input validation.

# Page With Virtual Switches 
<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153288690-08933b38-4a2e-4f03-9fa8-61db77a32d31.jpg" width="250" />
</p>

* Syncs state of switch on reload.
* Syncs every 3 seconds in case state is changed from other device.

# Weather Page

<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153286883-d99d572e-3490-45ee-8fa9-93a6f3a27d32.jpg" width="250" />
  <img src="https://user-images.githubusercontent.com/52485152/153286842-5b8ea4a0-0cc0-4118-b68b-982278e2c8fd.jpg" width="250" /> 
  <img src="https://user-images.githubusercontent.com/52485152/153286835-50f2bf1d-c969-4130-8e52-e48287d2b11b.jpg" width="250" />
</p>

* Current weather status and average weather for past week.
* Graphs for past week 

# Power and Energy Page 
<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153295868-177ae4c0-4291-4f63-a383-9defede0acfd.jpg" width="250" />
  <img src="https://user-images.githubusercontent.com/52485152/153295979-87ad15bc-2f13-437f-ab02-642a7f8e77fd.jpg" width="250" />
  <img src="https://user-images.githubusercontent.com/52485152/153295885-a46c1360-3223-4072-aeb6-05cfa6784eef.jpg" width="250" />
</p>
<p float="center">
  <img src="https://user-images.githubusercontent.com/52485152/153295988-73589f03-d977-4769-b317-4ff1a9ccd53e.jpg" width="250" />
  <img src="https://user-images.githubusercontent.com/52485152/153296009-c6bbe828-e99f-4a17-8796-f40eca58d2dd.jpg" width="250" />
</p>

* Current and daily average power status 
* Energy usage for today and past 4 months 
* Graphs for past 3 days 
