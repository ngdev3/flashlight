import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private shake: Shake,
    private flashlight: Flashlight,
    private backgroundMode: BackgroundMode
  ) {

    const watch = this.shake.startWatch(10).subscribe((a) => {
      console.log(a)
      });
  }

  toggle(){
    
  }

}
