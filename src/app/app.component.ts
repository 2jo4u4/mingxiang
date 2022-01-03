import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgList = [
    {
      alt: 'background1',
      uri: 'https://drscdn.500px.org/photo/49283436/q%3D80_m%3D1500/v2?sig=1ed2028934ebb3ef7d35957aa25987ef4c3f28d17da2c56e3f748232828393d3',
    },
    {
      alt: 'background2',
      uri: 'https://drscdn.500px.org/photo/94580949/m%3D2048_of%3D1/v2?sig=bb76fc1017c80b49acfe0f2ae1ed2acb2b0e4d7ad512f3e3249ac67ab79ea399',
    },
  ];
  imageIndex = 0;
  image = this.imgList[this.imageIndex];
  timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    setInterval(() => {
      if (this.imageIndex === this.imgList.length - 1) {
        this.imageIndex = 0;
      } else {
        this.imageIndex++;
      }
      this.image = this.imgList[this.imageIndex];
    }, 5000);
  }

  onChangeImage(index: number) {
    this.imageIndex = index;
    this.image = this.imgList[this.imageIndex];
  }
}
