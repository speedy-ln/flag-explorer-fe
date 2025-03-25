import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MatToolbar, MatFormField, MatInput, MatIcon, FormsModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  searchText: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchChanged.emit(this.searchText.trim().toLowerCase());
  }
}
