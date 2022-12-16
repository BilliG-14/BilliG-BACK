import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { updateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { ProductRepository } from './product.repository';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findByTypeOfPost(typeOfPost: postType) {
    return await this.productRepository.findByTypeOfPost(typeOfPost);
  }

  async findByCategory(category: string) {
    return await this.productRepository.findByCategory(category);
  }

  async findByUser(user: string, typeOfPost: postType) {
    switch (typeOfPost) {
      case postType.lend:
        return this.productRepository.findByLender(user);
      case postType.borrow:
        return this.productRepository.findByBorrower(user);
    }
  }

  async findOneProduct(id: string) {
    return await this.productRepository.findById(id);
  }

  // 게시물 생성
  async createProduct(createProduct: CreateProductDTO): Promise<Product> {
    const {
      typeOfPost,
      category,
      author,
      title,
      contents,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    } = createProduct;

    const generateID = Date(); // 게시물 데이터 고유 ID 부여하기 ( 수정 필요 )

    const inputProduct = {
      id: generateID,
      typeOfPost,
      category,
      author,
      title,
      contents,
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    };
    const result = await this.productRepository.createProduct(inputProduct);
    return result.save();
  }

  // 게시물 수정
  async updateProduct(id: string, editproduct: updateProductDTO) {
    const {
      typeOfPost,
      category,
      author,
      title,
      contents,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    } = editproduct;

    const inputProduct = {
      ...(typeOfPost && { typeOfPost }),
      ...(category && { category }),
      ...(author && { author }),
      ...(title && { title }),
      ...(contents && { contents }),
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      ...(stateOfTransaction && { stateOfTransaction }),
      ...(address && { address }),
      ...(price && { price }),
      ...(period && { period }),
      ...(hashtag && { hashtag }),
      ...(delivery && { delivery }),
      ...(direct && { direct }),
    };
    const result = await this.productRepository.updateProduct(id, inputProduct);
    return result.save();
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
