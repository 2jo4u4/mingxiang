import { Component, OnInit } from '@angular/core';
import selfConfig from '../../self.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logo = selfConfig.logo; // 公司資訊
  contact = selfConfig.contact; // 聯絡資訊

  ngOnInit(): void {}
}
