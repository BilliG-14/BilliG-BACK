import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findProducts(body) {
    return await this.productModel.find({ body });
  }

  // async findByTypeOfPost(typeOfPost: postType) {
  //   return await this.productRepository.findByTypeOfPost(typeOfPost);
  // }

  // async findByCategory(category: string) {
  //   return await this.productRepository.findByCategory(category);
  // }

  // async findProducts(user: string, typeOfPost: postType) {

  //   switch (typeOfPost) {
  //     case postType.lend:
  //       return await this.productRepository.findByLender(user);
  //     case postType.borrow:
  //       return await this.productRepository.findByBorrower(user);
  //   }
  // }

  async findOneProduct(id: string) {
    const result = await this.productModel
      .find({ _id: id })
      .populate('category')
      .populate('author')
      .populate('lender')
      .populate('borrower');
    return result;
  }

  // 게시물 생성
  async createProduct(createProduct: CreateProductDTO): Promise<Product> {
    const {
      postType,
      category,
      author,
      title,
      description,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      tradeWay,
    } = createProduct;

    const inputProduct = {
      postType,
      category,
      author,
      title,
      description,
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      tradeWay,
    };
    const result = await this.productModel.create(inputProduct);
    return result;
  }

  // 게시물 수정
  async updateProduct(id: string, editproduct: UpdateProductDTO) {
    const {
      postType,
      category,
      author,
      title,
      description,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      tradeWay,
    } = editproduct;

    const inputProduct = {
      ...(postType && { postType }),
      ...(category && { category }),
      ...(author && { author }),
      ...(title && { title }),
      ...(description && { description }),
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      ...(stateOfTransaction && { stateOfTransaction }),
      ...(address && { address }),
      ...(price && { price }),
      ...(period && { period }),
      ...(hashtag && { hashtag }),
      ...(tradeWay && { tradeWay }),
    };
    const result = await this.productModel.findOneAndUpdate(
      { _id: id },
      inputProduct,
      { returnDocument: 'after', returnNewDocument: true },
    );
    return result;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.findOneAndDelete({ _id: id });
    return result;
  }
}
