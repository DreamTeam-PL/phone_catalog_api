import { Op, Sequelize } from 'sequelize';
import ProductModel from '../models/Product';
import { Product } from '../types/types';


export default { 
    getProduct: async (itemId:string) => { 
        try {
          const product = await ProductModel.findOne({ where: { itemId } });
      
          return {
            find: !!product,
            product
          }
        } catch (error) {
          throw new Error('Server Error. cannot to get product data.')
        }
    },
    getList: async (page:number, limit:number, sortBy:keyof Product, sortType:'asc'|'desc', onlyDiscounted:boolean=false) => {  
      
        try {
            const where = onlyDiscounted 
                ? Sequelize.where(Sequelize.literal('"fullPrice" - "price"'), { [Op.gt]: 0 } )
                : undefined;
            
            const totalProducts = await ProductModel.count({ where });
            const totalPages = Math.ceil(totalProducts / limit);
            const products = await ProductModel.findAll({
                attributes: {
                    include: [
                        [Sequelize.literal('CAST("fullPrice" - "price" AS DECIMAL(10, 2))'), 'discountAmount'],
                        [Sequelize.literal('CAST(((("fullPrice" - "price") * 100) / "fullPrice") AS DECIMAL(10, 2))'), 'discountPercentage'],
                
                    ],
                },
                offset: (page - 1) * limit,
                limit,
                order: [[sortBy, sortType]],
                where,
            }); 

      
            return {
                products,
                totalProducts,
                totalPages,
                currentPage: page,
            };
        } catch (error) {
            throw new Error('Blad podczas pobierania danych.')
        }
    },
};




