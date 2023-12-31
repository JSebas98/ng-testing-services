import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });
    productsService = TestBed.inject(ProductsService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('Tests for getAllSimple()', () => {
    it('should be intercepted by TokenInterceptor', (doneFn) => {
      spyOn(tokenService, 'getToken').and.returnValue('tkn-123');

      productsService.getAllSimple().subscribe(() => {
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush([]);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer tkn-123');
    });

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
    });

    it('should sent a request with limit 10 and offset 3', (doneFn) => {
      const mockProductList: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      productsService.getAll(limit, offset).subscribe(() => {
        doneFn();
      });

      // Http config to mock request and response
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      const params = req.request.params;
      req.flush(mockProductList);
      
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
      
    });
  });

  describe('Tests for create()', () => {
    it('should create a user through a POST request', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: mockProduct.title,
        price: mockProduct.price,
        images: mockProduct.images,
        description: mockProduct.description,
        categoryId: mockProduct.category.id
      };

      productsService.create({...dto}).subscribe(() => {
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProduct);

      expect(req.request.method).toBe('POST');
    });

    it('should return a created product', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: mockProduct.title,
        price: mockProduct.price,
        images: mockProduct.images,
        description: mockProduct.description,
        categoryId: mockProduct.category.id
      };

      productsService.create({...dto}).subscribe((product) => {
        expect(product).toEqual(mockProduct);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProduct);
    });

    it('should send the dto passed as argument without any changes', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: mockProduct.title,
        price: mockProduct.price,
        images: mockProduct.images,
        description: mockProduct.description,
        categoryId: mockProduct.category.id
      };

      productsService.create({...dto}).subscribe(() => {
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProduct);
      
      expect(req.request.body).toEqual(dto);
    });
  });

  describe('Tests for updated()', () => {
    it('should update a user through a PUT request', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Updated product title.'
      };

      productsService.update(mockProduct.id, {...dto}).subscribe(() => {
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockProduct.id}`;
      const req = httpController.expectOne(url);
      req.flush({
        ...mockProduct,
        title: 'Updated product title.'
      });

      expect(req.request.method).toBe('PUT');
    });

    it('should return an updated product', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Updated product title.'
      };

      productsService.update(mockProduct.id, {...dto}).subscribe((product) => {
        expect(product).toEqual({
          ...mockProduct,
          title: 'Updated product title.'
        });
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockProduct.id}`;
      const req = httpController.expectOne(url);
      req.flush({
        ...mockProduct,
        title: 'Updated product title.'
      });
    });

    it('should send the dto passed as argument without any changes', (doneFn) => {
      const mockProduct: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Updated product title.'
      };

      productsService.update(mockProduct.id, {...dto}).subscribe((product) => {
        expect(product).toEqual({
          ...mockProduct,
          title: 'Updated product title.'
        });
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockProduct.id}`;
      const req = httpController.expectOne(url);
      req.flush({
        ...mockProduct,
        title: 'Updated product title.'
      });
      
      expect(req.request.body).toEqual(dto);
    });
  });

  describe('Tests for delete()', () => {
    it('should delete a product through a DELETE request', (doneFn) => {
      const mockProduct: Product = generateOneProduct();

      productsService.delete(mockProduct.id).subscribe(() => {
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockProduct.id}`;
      const req = httpController.expectOne(url);
      req.flush(true);

      expect(req.request.method).toBe('DELETE');
    });

    it('should delete a product', (doneFn) => {
      const mockResponse = true;
      const mockId = '123-asd-41-sa-2';

      productsService.delete(mockId).subscribe((result) => {
        expect(result).toBe(mockResponse);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });
  });

  describe('Tests for getOne()', () => {
    it('should get one product', (doneFn) => {
      const mockProduct = generateOneProduct();
      const mockId = mockProduct.id;

      productsService.getOne(mockId).subscribe((result) => {
        expect(result).toBe(mockProduct);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(mockProduct);
      expect(req.request.method).toBe('GET');
    });

    it('should return a proper message when response is 404', (doneFn) => {
      const mockId = '123';
      const errorMessage = 'El producto no existe';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: errorMessage
      };

      productsService.getOne(mockId).subscribe({
        error: (error) => {
          expect(error).toEqual(errorMessage);
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(errorMessage, mockError);
      expect(req.request.method).toBe('GET');
    });

    it('should return a proper message when response is 409', (doneFn) => {
      const mockId = '123';
      const errorMessage = 'Algo esta fallando en el server';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: errorMessage
      };

      productsService.getOne(mockId).subscribe({
        error: (error) => {
          expect(error).toEqual(errorMessage);
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(errorMessage, mockError);
      expect(req.request.method).toBe('GET');
    });

    it('should return a proper message when response is 401', (doneFn) => {
      const mockId = '123';
      const errorMessage = 'No estas permitido';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: errorMessage
      };

      productsService.getOne(mockId).subscribe({
        error: (error) => {
          expect(error).toEqual(errorMessage);
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(errorMessage, mockError);
      expect(req.request.method).toBe('GET');
    });

    it('should return a proper message when response is 500', (doneFn) => {
      const mockId = '123';
      const errorMessage = 'Ups algo salio mal';
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: errorMessage
      };

      productsService.getOne(mockId).subscribe({
        error: (error) => {
          expect(error).toEqual(errorMessage);
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${mockId}`;
      const req = httpController.expectOne(url);
      req.flush(errorMessage, mockError);
      expect(req.request.method).toBe('GET');
    });
  });
});
