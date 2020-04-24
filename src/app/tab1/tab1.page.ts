import { Component } from '@angular/core';
import { Shake } from '@ionic-native/shake/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  numbercounter: boolean = false;
  color = 'white'
  goalProgress = 10;
  constructor(
    private shake: Shake,
    private flashlight: Flashlight,
    private backgroundMode: BackgroundMode,
    private brightness: Brightness,
    private batteryStatus: BatteryStatus,
    public toastController: ToastController,

  ) {

    // watch change in battery status
    const subscription = this.batteryStatus.onChange().subscribe(status => {
      console.log(status.level, status.isPlugged);
      if (status.level < 10) {
        this.loadBatteryPage()
      }
    });


    this.brightness.setBrightness(0.5);
    this.numbercounter = true
    const watch = this.shake.startWatch(30).subscribe((a) => {
      console.log("Shake is going on")
      if (this.numbercounter) {
        this.color = '#F9F974'
        this.flashlight.switchOn();
        this.numbercounter = false;
      } else {
        this.color = 'white'
        this.numbercounter = true
        this.flashlight.switchOff();
      }
    });
  }

  async loadBatteryPage() {
    const toast = await this.toastController.create({
      message: 'Your Battery is about to Drain, Turn off App',
      duration: 2000
    });
    toast.present();
  }
  toggle() {
    if (this.numbercounter) {
      this.color = '#F9F974'
      this.flashlight.switchOn();
      this.numbercounter = false;
    } else {
      this.color = 'white'
      this.numbercounter = true
      this.flashlight.switchOff();
    }
  }

  setBadge(a) {
    let z = a / 100
    this.brightness.setBrightness(z);
  }

}
