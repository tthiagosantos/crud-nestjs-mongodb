import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CompanyInterface } from './interface/company.interface';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_MODEL') private companyModel: Model<CompanyInterface>,
  ) {}
  async create(createCompanyDto: CompanyInterface) {
    const ifExisty = await this.findByName(createCompanyDto.name);
    if (ifExisty.length > 0) {
      throw new BadRequestException({ message: 'nome ja registrado' });
    }

    createCompanyDto.name = createCompanyDto.name.toUpperCase();
    await this.companyModel.create(createCompanyDto);
  }

  findAll() {
    return this.companyModel.find();
  }

  async findOne(id: string) {
    return this.companyModel.findById(id).exec();
  }

  async update(id: string, updateCompanyDto: CompanyInterface) {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.companyModel.findByIdAndDelete(id).exec();
  }

  async findByName(name: string) {
    const nametoLowerCase = name.toUpperCase();
    return this.companyModel.find({ name: nametoLowerCase }).exec();
  }
}
