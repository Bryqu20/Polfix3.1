import { Component } from '@angular/core';
import { MultiMediaService } from 'src/app/services/multi-media.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(private mediaService: MultiMediaService){}
}
// public mediaId: Number
