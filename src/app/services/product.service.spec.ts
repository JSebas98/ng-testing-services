import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('Tests for getAllSimple()', () => {
    it('should return a product list', (doneFn) => {
      const mockProductList: Product[] = [
        {
          id: '123',
          title: 'string',
          price: 123,
          images: ['img', 'img2'],
          description: 'string',
          category: {
            id: 123,
            name: 'category1'
          }
        }
      ];

      productsService.getAllSimple().subscribe((productList) => {
        expect(productList.length).toEqual(mockProductList.length);
        expect(productList).toEqual(mockProductList);
        doneFn();
      });

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProductList);
      httpController.verify();
    });
  });
});
