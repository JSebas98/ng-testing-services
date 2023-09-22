import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';

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
      const mockProductList: Product[] = generateManyProducts(2);

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

  describe('Tests for getAll()', () => {
    it('should return a product list with 3 products', (doneFn) => {
      const mockProductList: Product[] = generateManyProducts(3);

      productsService.getAll().subscribe((productList) => {
        expect(productList.length).toEqual(mockProductList.length);
        doneFn();
      });

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProductList);
      httpController.verify();
    });

    it('should return a product list with correct taxes', (doneFn) => {
      const mockProductList: Product[] = [
        {
          ...generateOneProduct(),
          price: 100
        },
        {
          ...generateOneProduct(),
          price: 200
        }
      ];

      productsService.getAll().subscribe((productList) => {
        expect(productList[0].taxes).toBe(19);
        expect(productList[1].taxes).toBe(38);
        doneFn();
      });

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProductList);
      httpController.verify();
    });

    it('should return a product list with taxes on 0 for invalid prices', (doneFn) => {
      const mockProductList: Product[] = [
        {
          ...generateOneProduct(),
          price: 0
        },
        {
          ...generateOneProduct(),
          price: -200
        }
      ];

      productsService.getAll().subscribe((productList) => {
        expect(productList[0].taxes).toBe(0);
        expect(productList[1].taxes).toBe(0);
        doneFn();
      });

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProductList);
      httpController.verify();
    });

    it('should sent a request with limit 10 and offset 3', (doneFn) => {
      const mockProductList: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      productsService.getAll();

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      const params = req.request.params;
      req.flush(mockProductList);
      
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

      httpController.verify();
    });
  });
});
