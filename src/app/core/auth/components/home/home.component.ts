import { Component } from '@angular/core';
import { MetroArtExplorerComponent } from "../../../../features/metro/components/metro-art-explorer/metro-art-explorer.component";

@Component({
  selector: 'app-home',
  imports: [MetroArtExplorerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
