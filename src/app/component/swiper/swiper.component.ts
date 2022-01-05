import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { throttle } from 'lodash';
import selfConfig from '../../../../self.json';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  // config
  loopTime = selfConfig.swiper.loopTime; // mS
  swiperDistence = selfConfig.swiper.swiperDistence;
  limitWith = selfConfig.swiper.limitWith; // 左右極限距離
  imgList = selfConfig.swiper.images; // 圖片列表

  imageIndex = 0;
  timer: ReturnType<typeof setTimeout> | null = null;
  mask: HTMLElement | null = null; // 監聽 mouse & touch
  imgDiv: HTMLElement | null = null; // 顯示範圍
  imgGroup: HTMLElement | null = null; // 全部圖片排列區
  swiperFlag: { start: boolean; stPos: Position; edPos: Position; offset: number } = {
    start: false,
    stPos: { x: 0, y: 0 },
    edPos: { x: 0, y: 0 },
    offset: 0,
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initImageSetting();
      this.setTimer();
      this.touchListener();
    }
  }

  onChangeImage(index: number) {
    this.changeImageIndex(index);
    this.clearTimer();
    this.setTimer();
  }

  private setTimer() {
    this.timer = setTimeout(() => {
      this.changeImageIndex();
      this.setTimer();
    }, this.loopTime);
  }
  private clearTimer() {
    this.timer !== null && clearTimeout(this.timer);
  }
  private changeImageIndex(index?: number) {
    if (index !== undefined) {
      if (index >= 0 && index < this.imgList.length) {
        this.imageIndex = index;
      }
    } else {
      if (this.imageIndex >= this.imgList.length - 1) {
        this.imageIndex = 0;
      } else {
        this.imageIndex++;
      }
    }
    this.regulate();
  }
  private initImageSetting() {
    this.imgDiv = document.getElementById('swiper-img-div');
    this.imgGroup = document.getElementById('swiper-img-group');
  }
  private touchListener() {
    this.mask = document.getElementById('swiper-mask');

    if (this.mask) {
      this.mask.addEventListener('touchstart', this.onStartOrDown.bind(this));
      this.mask.addEventListener('mousedown', this.onStartOrDown.bind(this));

      this.mask.addEventListener('touchmove', throttle(this.onMove.bind(this), 20));
      this.mask.addEventListener('mousemove', throttle(this.onMove.bind(this), 20));

      this.mask.addEventListener('touchend', this.onEndOrUp.bind(this));
      this.mask.addEventListener('mouseup', this.onEndOrUp.bind(this));
    }
  }
  private onStartOrDown(event: MouseEvent | TouchEvent) {
    if (this.swiperFlag.start) return;
    this.clearTimer();
    let x: number = 0,
      y: number = 0;
    if (this.isMouseEvent(event)) {
      x = event.clientX;
      y = event.clientY;
    } else {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }
    this.swiperFlag.stPos.x = x;
    this.swiperFlag.stPos.y = y;
    this.swiperFlag.start = true;
  }
  private onMove(event: MouseEvent | TouchEvent) {
    if (!this.swiperFlag.start) return;
    const { stPos, offset } = this.swiperFlag;
    const width = -1 * (this.imgDiv?.clientWidth || 0) * (this.imgList.length - 1) - this.limitWith;
    let x: number = 0,
      y: number = 0;
    if (this.isMouseEvent(event)) {
      x = event.clientX;
      y = event.clientY;
    } else {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }
    this.swiperFlag.edPos.x = x;
    this.swiperFlag.edPos.y = y;
    if (this.imgGroup) {
      let _offset = offset + x - stPos.x;
      if (_offset > this.limitWith) _offset = this.limitWith;
      else if (_offset < width) _offset = width;
      this.imgGroup.style.transform = `translate(${_offset}px, 0px)`;
    }
  }
  private onEndOrUp(event: MouseEvent | TouchEvent) {
    if (!this.swiperFlag.start) return;
    const isMouseEvent = this.isMouseEvent(event);
    if (isMouseEvent) {
      let x: number = 0,
        y: number = 0;
      x = event.clientX;
      y = event.clientY;
      this.swiperFlag.edPos.x = x;
      this.swiperFlag.edPos.y = y;
    }
    this.swiperFlag.start = false;
    let abs = 0;
    if (Math.abs(this.swiperFlag.stPos.x - this.swiperFlag.edPos.x) > this.swiperDistence / (isMouseEvent ? 1 : 2)) {
      abs = this.swiperFlag.stPos.x > this.swiperFlag.edPos.x ? 1 : -1;
    }
    this.changeImageIndex(this.imageIndex + abs);
    this.setTimer();
  }
  private isMouseEvent(v: MouseEvent | TouchEvent): v is MouseEvent {
    if (v instanceof MouseEvent) {
      return true;
    } else {
      return false;
    }
  }
  private regulate() {
    if (this.imgGroup && this.imgDiv) {
      const width = this.imgDiv.clientWidth;
      let _offset = 0;
      this.imgGroup.style.transform.replace(
        /(-)?[0-9]{1,}/,
        (match: string, p1: string | undefined, offset: number) => {
          _offset = parseInt(match);
          return match;
        }
      );
      this.swiperFlag.offset = this.imageIndex * width * -1;
      this.smooth(_offset, this.swiperFlag.offset);
    }
  }
  /**
   * @param start 開始位置
   * @param end 結束位置
   * @param time 耗時(mS)
   */
  private smooth(start: number, end: number, time = 150) {
    const _this = this;
    const interval = 20;
    let total = 0;

    function timer() {
      if (total >= time) {
        if (_this.imgGroup) _this.imgGroup.style.transform = `translate(${end}px, 0px)`;
      } else {
        setTimeout(() => {
          total += interval;
          const newPosX = start + (end - start) * (total / time);
          if (_this.imgGroup) {
            _this.imgGroup.style.transform = `translate(${newPosX}px, 0px)`;
          }
          timer();
        }, interval);
      }
    }

    timer();
  }
}
