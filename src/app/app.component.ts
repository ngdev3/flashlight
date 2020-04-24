import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    public toastController: ToastController,
    private brightness: Brightness
    // private oneSignal: OneSignal


  ) {
    this.initializeApp();
  }

  initializeApp() {

    // 6390095322
    this.platform.ready().then(() => {
      this.backButtonEvent();
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("71fa03bd-75ce-46d4-a7a7-d974bf38069f", "1059186594586")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ff3399");
      this.statusBar.styleLightContent();
      this.backgroundMode.enable();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    var dualCounter = 0;
    this.platform.backButton.subscribe(async () => {
      dualCounter++;
      const toast = await this.toastController.create({
        message: 'Press again to exit app.',
        duration: 2222
      });
      toast.present();
      console.log(dualCounter);
      if (dualCounter == 2) {
        navigator['app'].exitApp();
      }
    });

  }
}
