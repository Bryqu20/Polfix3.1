import { Component, OnInit  } from '@angular/core';
import { MultiMediaService } from './services/multi-media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean
  constructor(private mediaService: MultiMediaService){
    this.loading = false
  }
  ngOnInit(){
  }
}
