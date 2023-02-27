import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Restaurant, RestaurantDetailModel, SocialContactModel } from 'src/models/restaurant-info.model';
import { GetReviewInfoRequest, UpdateReviewReplyRequest, ReviewInfoModel } from 'src/models/review-info.model';
import { RestaurantService } from '../restaurant.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ResponseModel } from 'src/models/response.model';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { BadReviewLabelItem, GoodReviewLabelItem } from 'src/constant/review-label.constant';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  @Input() isLoading: boolean = true;
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;

  info: Restaurant;
  reviews: Array<ReviewInfoModel>;
  displayReview: Array<ReviewInfoModel>;
  socialContact: Array<SocialContactModel>;

  totalReview: number = 0;
  totalRating: number = 0;

  todayReview: Array<ReviewInfoModel> = [];
  todayRating: number = 0;

  countGoodReview: number = 0;

  totalDisplayReview: number = 0;
  totalReviewHaveImage: number = 0;
  totalReviewHaveComment: number = 0;
  totalReviewHaveFoodRecommend: number = 0;

  // for filter reviews
  keywords: string = "";
  ratingFilter: number = 6;
  isSelectedTotalReview: boolean = true;
  isSelectedOnlyReviewHaveImage: boolean = false;
  isSelectedOnlyReviewHaveComment: boolean = false;
  isSelectedOnlyReviewHaveFoodRecommend: boolean = false;

  star: Array<string>;
  awsS3Url = environment.awsS3Url;
  userId: string;
  restaurantId: string;
  RecommendMenu: Array<string> = [];


  constructor(
    private restaurantService: RestaurantService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    this.restaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId) ?? '';
    this.getRestaurantDetail();
    this.getRestaurantReviews();
  }

  getRestaurantDetail() {
    let request = new GetReviewInfoRequest();
    request.userId = this.userId;
    request.restaurantId = this.restaurantId;
    this.restaurantService.getRestaurantDetail(request).subscribe(
      (response: ResponseModel<RestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          this.info = response.data.restaurantInfo;
          this.socialContact = response.data.socialContact;
        }
    })
  }

  getRestaurantReviews() {
    this.restaurantService.getRestaurantReviews(this.restaurantId).subscribe(
      (response: ResponseModel<Array<ReviewInfoModel>>) => {
        if (response && response?.status === 200) {
          this.reviews = response.data;
          this.reviews.reverse();
          this.displayReview = this.reviews;
          if (this.reviews.length != 0) {
            this.totalReview = this.reviews.length
            let ratingCount = 0;
            this.reviews.forEach(x => {
              ratingCount += x.rating
            });
            this.totalRating = ratingCount/this.reviews.length

            this.reviews.forEach(element => {
              let today = new Date();
              let reviewDate = new Date(element.createAt)
              if (this.checkIsToday(today,reviewDate)) {
                this.todayReview.push(element);
              }
              if (element.rating >= 3) {
                this.countGoodReview += 1;
              }
              element.reviewTimeString = this.getReviewTimeInString(reviewDate)
              element.userName = element.userName.replace(/(?<!^).(?!$)/g, '*')
              this.RecommendMenu = (element.foodRecommendList.length != 0)? [ ...this.RecommendMenu, ...(element.foodRecommendList)] : this.RecommendMenu
              this.RecommendMenu = [...new Set(this.RecommendMenu)];
            });

            this.countReviewFilter();

            if (this.todayReview.length != 0) {
              let ratingCount = 0;
              this.todayReview.forEach(x => {
                ratingCount += x.rating;
              });
              this.todayRating = ratingCount/this.todayReview.length;
            }

          }
          this.isLoading = false;
        }
        else {
          this.reviews = [];
          this.isLoading = false;
        }
    })
  }

  checkIsToday(d1: Date, d2: Date) {
    let result = (d1.getFullYear() == d2.getFullYear() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getDate() == d2.getDate());
    return result;
  }

  getReviewTimeInString(date: Date) {
    let stringTime = "";
    let today = new Date();
    let diffTime = (+today - +date)/60000;
    // diffTime/60000 time difference in minute unit
    if (diffTime < 60) {
      if (diffTime < 1) {
        stringTime = "เมื่อวิที่นาทีที่แล้ว"
      }
      else if (diffTime < 60) {
        stringTime = String(Math.floor(diffTime)) + " นาทีที่แล้ว"
      }
    }
    else if (diffTime >= 60 && diffTime < 1440) {
      stringTime = String(Math.floor(diffTime/60)) + " ชั่วโมงที่แล้ว"
    }
    else if (diffTime >= 1440 && diffTime < 10080) {
      stringTime = String(Math.floor(diffTime/60/24)) + " วันที่แล้ว"
    }
    else if (diffTime >= 10080 && diffTime < 40320) {
      stringTime = String(Math.floor(diffTime/60/24/7)) + " สัปดาห์ที่แล้ว"
    }
    else if (diffTime >= 10080 && diffTime < 483840) {
      stringTime = String(Math.floor(diffTime/60/24/7/4)) + " เดือนที่แล้ว"
    }
    else if (diffTime >= 483840 ) {
      stringTime = String(Math.floor(diffTime/60/24/7/4/12)) + " ปีที่แล้ว"
    }
    return stringTime;
  }

  changeFilterButton(i: number) {
    switch(i) {
      case 1:
        this.isSelectedTotalReview = true;
        this.isSelectedOnlyReviewHaveImage = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveFoodRecommend = false;
        this.displayReview = this.reviews.filter(item =>
          ((this.ratingFilter==6)? true : item.rating == this.ratingFilter)
          && ((this.keywords=="")? true : item.comment.includes(this.keywords))
          );
        this.countReviewFilter();
        break;
      case 2:
        this.isSelectedOnlyReviewHaveImage = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveFoodRecommend  = false;
        this.displayReview = this.reviews.filter(item =>
          item.imageLink.length != 0
          && ((this.ratingFilter==6)? true : item.rating == this.ratingFilter)
          && ((this.keywords=="")? true : item.comment.includes(this.keywords))
          );
        break;
      case 3:
        this.isSelectedOnlyReviewHaveComment = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveImage = false;
        this.isSelectedOnlyReviewHaveFoodRecommend = false;
        this.displayReview = this.reviews.filter(item =>
          item.comment.length != 0
          && ((this.ratingFilter==6)? true : item.rating == this.ratingFilter)
          && ((this.keywords=="")? true : item.comment.includes(this.keywords))
          );
        break;
      case 4:
        this.isSelectedOnlyReviewHaveFoodRecommend = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveImage = false;
        this.displayReview = this.reviews.filter(item =>
          item.foodRecommendList.length != 0
          && ((this.ratingFilter==6)? true : item.rating == this.ratingFilter)
          && ((this.keywords=="")? true : item.comment.includes(this.keywords))
          );
        break;
    }
  }

  clearFilter() {
    this.isSelectedOnlyReviewHaveImage = false;
    this.isSelectedOnlyReviewHaveComment = false;
    this.isSelectedOnlyReviewHaveFoodRecommend  = false;
    this.keywords = "";
    this.ratingFilter = 6;
    this.changeFilterButton(1);
  }

  getReviewLabel(type: number) {
    if (type > 5) {
      return GoodReviewLabelItem.find(x => x.id === type)?.name;
    } else {
      return BadReviewLabelItem.find(x => x.id === type)?.name;
    }
  }

  countReviewFilter() {
    this.totalDisplayReview =  this.displayReview.length;
    this.totalReviewHaveImage = 0;
    this.totalReviewHaveComment = 0;
    this.totalReviewHaveFoodRecommend = 0;
    this.displayReview.forEach(element => {
      if (element.comment != "") {
        this.totalReviewHaveComment += 1
      }
      if (element.imageLink.length !=0) {
        this.totalReviewHaveImage += 1
      }
      if (element.foodRecommendList.length !=0) {
        this.totalReviewHaveFoodRecommend += 1
      }
    });
  }

  onSubmitReplyComment(f: NgForm, i: number) {
    this.spinner.show();
    let data = this.displayReview[i];;
    let request = new UpdateReviewReplyRequest();
    request.reviewId = data.reviewId;
    request.replyComment = f.value.replyComment;
    
    this.restaurantService.updateReplyReviewInfo(request).subscribe(
      (response: ResponseModel<boolean>) => {
        this.spinner.hide();
        if (response && response?.status === 200) {
          this.successModal.openSuccessModal(true, 'Update Reply successful');
        } else {
          this.successModal.openSuccessModal(false, response.message);
        }
    });
  }
}
