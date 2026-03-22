import { TestBed } from '@angular/core/testing';


describe('Category', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Category is not imported; either import the service or use a different provider
    // Example (uncomment and adjust as needed):
    // import { CategoryService } from './category.service';
    // service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
