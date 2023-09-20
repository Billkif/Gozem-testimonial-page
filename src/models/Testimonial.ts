export interface Testimonial {
  id: string;
  mentor: string;
  exercise: any;
  language: any;
  content: string;
  created_at: string;
}

export interface Pagination {
  current_page: number;
  total_count: number;
  total_pages: number;
}
