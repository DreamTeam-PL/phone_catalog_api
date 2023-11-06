import { Sequelize, WhereOptions } from 'sequelize';
import ProductModel from '../models/Product';
import { Product, Phone } from '../types/types';
import PhoneModel from '../models/Phone';

type GetListOptions = {
    page: number;
    limit: number;
    sortBy: keyof Product | 'discountAmount' | 'discountPercentage';
    sortType: 'asc' | 'desc'; 
    where?: WhereOptions; // Parametr 'where' typu WhereOptions
  };
  
export default { 
    getProductBy: async <T>(field: keyof Product, value:T) => { 
        try {
          const product = await ProductModel.findOne({ where: { [field]: value } }); 
          return {
            find: !!product,
            data: product
          }
        } catch (error) { 
          throw new Error('Server Error. cannot to get product data.')
        }
    },


    getProductList: async ({
        page,
        limit,
        sortBy,
        sortType, 
        where, 
    }: GetListOptions) => {
        try {
            const result = {
            data: await ProductModel.findAll({
                attributes: {
                include: [
                    [Sequelize.literal('CAST("fullPrice" - "price" AS DECIMAL(10, 2))'), 'discountAmount'],
                    [
                    Sequelize.literal('CAST(((("fullPrice" - "price") * 100) / "fullPrice") AS DECIMAL(10, 2))'),
                    'discountPercentage',
                    ],
                ],
                },
                offset: (page - 1) * limit,
                limit,
                order: [[sortBy, sortType]],
                where,
            }),
            pages: 0,
            count: await ProductModel.count({ where }),
            currentPage: page,
            itemsPerPage: limit,
            };
        
            return { ...result, pages: Math.ceil(result.count / limit) };
            } catch (error) {
                throw new Error('Błąd podczas pobierania danych.');
            }
    },

    getPhoneBy: async <T>(field: keyof Phone, value:T) => { 
        try {
            const data = await PhoneModel.findOne({ where: { [field]: value } }); 
            return { find: !!data, data  }
        } catch (error) { 
            throw new Error('Server Error. cannot to get phone data.')
        }
    },

    getPhoneList: async ({
        page,
        limit,
        sortBy,
        sortType, 
        where, 
    }: GetListOptions) => {
        try {
            const result = {
            data: await PhoneModel.findAll({ 
                offset: (page - 1) * limit,
                limit,
                order: [[sortBy, sortType]],
                where,
            }),
            pages: 0,
            count: await PhoneModel.count({ where }),
            currentPage: page,
            itemsPerPage: limit,
            };
        
            return { ...result, pages: Math.ceil(result.count / limit) };
            } catch (error) {
                return console.error('Błąd podczas pobierania danych.', error);
            }
    },

};




