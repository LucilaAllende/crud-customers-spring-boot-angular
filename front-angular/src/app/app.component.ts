import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentTheme: string = 'auto';

  constructor(private themeService: ThemeService) { }
  

  ngOnInit() {
    this.themeService.getThemeObservable().subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  changeTheme(theme: 'light' | 'dark' | 'auto') {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }
}
