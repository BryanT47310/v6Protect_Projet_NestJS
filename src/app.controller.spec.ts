import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('redirectToProducts', () => {
    it('should redirect to "/products"', () => {
      const mockResponse: any = {
        redirect: jest.fn(),
      };
      appController.redirectToProducts(mockResponse);

      expect(mockResponse.redirect).toHaveBeenCalledWith('/products');
    });
  });
});
