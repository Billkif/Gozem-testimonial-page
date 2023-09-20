import { Component, OnInit } from '@angular/core';
import { Pagination, Testimonial } from 'src/models/Testimonial';
import { TesmonialServiceService } from 'src/services/tesmonial-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeTestimonials: Array<Testimonial> = [];
  languages: Array<any> = [];
  timeout: any;
  paginationPage: Pagination = {
    current_page: 1,
    total_count: 0,
    total_pages: 1,
  };
  activePage: any = 1;
  activeLangIndex = 0;
  defaultSort = 'Older first';
  errmsg = '';
  searchText = '';
  startPages = new Array(0);
  endPages = new Array(0);
  loading = false;
  sortOptions = [
    {
      name: 'Oldest first',
      value: 'oldest_first',
    },
    {
      name: 'Newest first',
      value: 'newest_first',
    },
  ];
  searchData = {
    page: 1,
    language: '',
    exercise: '',
    order: 'oldest_first',
  };

  constructor(public testimonials: TesmonialServiceService) {}

  ngOnInit() {
    this.startPages = [1, 2, 3];
    this.getTestimonials();
    this.getLanguages();
  }
  getTestimonials(params?: any) {
    this.loading = true;
    this.activeTestimonials = [];
    this.startPages = [];
    this.endPages = [];
    this.errmsg = '';
    this.testimonials
      .getTestimonials(params)
      .toPromise()
      .then((res) => {
        this.testimonials.tesmonialList = res.data;
        this.paginationPage = res.pagination;
      })
      .catch((err) => {
        console.log('error', err);
        this.errmsg = 'Request failed, please try again';
      })
      .finally(() => {
        if (this.testimonials.tesmonialList.length) {
          this.activeTestimonials = this.testimonials.tesmonialList;
          this.activePage = this.paginationPage.current_page;
          this.endPages = [
            this.paginationPage.total_pages - 2,
            this.paginationPage.total_pages - 1,
            this.paginationPage.total_pages,
          ];
          if (
            this.activePage <= this.paginationPage.total_pages - 3 &&
            this.paginationPage.total_pages > 3
          ) {
            if (this.activePage < this.startPages[2]) {
            } else {
              this.startPages = [];
              for (let i = this.activePage; i < this.activePage + 3; i++) {
                this.startPages.push(i);
              }
            }
          } else {
            this.startPages = [];
            this.endPages = [];
            for (let j = 0; j < this.paginationPage.total_pages; j++) {
              this.endPages.push(j + 1);
            }
          }
        } else {
          this.errmsg = 'no testimonials for the selected filters';
        }

        this.searchData.exercise = '';
        this.loading = false;
      });
  }

  getLanguages() {
    this.errmsg = '';
    this.testimonials
      .getLanguages()
      .toPromise()
      .then((res) => {
        this.testimonials.languageList = res.data;
      })
      .catch((err) => {
        console.log('error', err);
        this.errmsg = 'Request failed, please try again';
      })
      .finally(() => {
        let filteredLangs = this.testimonials.languageList.filter(
          (item) => item.num_exercises > 0
        );
        this.languages = [
          {
            icon_url: 'assets/images/dropdown-icon.png',
            num_exercises: filteredLangs.length,
            title: 'All',
            slug: '',
          },
          ...filteredLangs,
        ];
      });
  }

  closeToast() {
    this.errmsg = '';
  }
  filterLanguage(language: any, index: any) {
    this.activeLangIndex = index;
    this.searchData.language = language.slug;
    this.getTestimonials(this.searchData);
  }

  filterBySort(sortType: any) {
    this.defaultSort = sortType.name;
    this.searchData.order = sortType.value;
    this.getTestimonials(this.searchData);
  }

  findBySearch(event?: any) {
    this.searchText = event || this.searchText;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (this.searchText.length == 0) {
        this.getTestimonials();
        return;
      }
      if (this.searchText.length < 4) {
        this.errmsg = 'enter atleast 4 letters';
        console.log('enter atleast 4 letters');
        return;
      } else {
        this.searchData.exercise = this.searchText;
        this.getTestimonials(this.searchData);
      }
    }, 1000);
  }

  getPage(page: any) {
    this.searchData.page = page;
    this.getTestimonials(this.searchData);
  }

  prevPage() {
    this.searchData.page = this.activePage - 1;
    this.getTestimonials(this.searchData);
  }
  nextPage() {
    this.searchData.page = this.activePage + 1;
    this.getTestimonials(this.searchData);
  }

  formatDate(dateString: string) {
    let date = new Date(Date.parse(dateString)).getTime();
    const now = new Date().getTime();
    let hours = Math.floor((now - date) / 3600000);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(weeks / 4);
    let years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 1) {
      return `${months} months ago`;
    } else if (weeks > 1) {
      return `${weeks} weeks ago`;
    } else if (days > 1) {
      return `${days} days ago`;
    } else {
      return `${hours} hours ago`;
    }
  }
}
