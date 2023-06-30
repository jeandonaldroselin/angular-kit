import { Component, Input } from '@angular/core';
import { AccessTokenPipe } from '../../pipes/access-token.pipe';
import { FileZoneItem } from './file-zone-download.model';

@Component({
  selector: 'app-file-zone-download',
  templateUrl: './file-zone-download.component.html',
  styleUrls: ['./file-zone-download.component.scss']
})
export class FileZoneDownloadComponent {

  @Input()
  fileZoneItem!: FileZoneItem;

  @Input()
  label: string = 'Télécharger';

  constructor(public accessTokenPipe: AccessTokenPipe) { }

  async download(): Promise<void> {
    const url = await this.accessTokenPipe.transform(this.fileZoneItem.downloadUrl);
    window.open(url, '_blanc');
  }

}

