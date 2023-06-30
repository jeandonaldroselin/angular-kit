import { SafeResourceUrl } from "@angular/platform-browser";

export interface FileZoneItem {
    id?: number,
    name: string;
    description?: string;
    previewUrl: string|SafeResourceUrl;
    downloadUrl?: string;
    mimeType?: string;
    index?: number;
    file?: File;
};