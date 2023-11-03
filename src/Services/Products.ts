import { Op, Sequelize } from 'sequelize'
import ProductModel from '../models/Product'
import { Product } from '../types/types'

export default {
  getBy: async <T>(field: keyof Product, value: T) => {
    try {
      const product = await ProductModel.findOne({ where: { [field]: value } })
      console.log('PR:', product)
      return {
        find: !!product,
        product,
      }
    } catch (error) {
      throw new Error('Server Error. cannot to get product data.')
    }
  },

  getList: async (
    page: number,
    limit: number,
    sortBy: keyof Product,
    sortType: 'asc' | 'desc',
    onlyDiscounted: boolean = false
  ) => {
    try {
      const where = onlyDiscounted
        ? Sequelize.where(Sequelize.literal('"fullPrice" - "price"'), {
            [Op.gt]: 0,
          })
        : undefined

      const result = {
        data: await ProductModel.findAll({
          attributes: {
            include: [
              [
                Sequelize.literal(
                  'CAST("fullPrice" - "price" AS DECIMAL(10, 2))'
                ),
                'discountAmount',
              ],
              [
                Sequelize.literal(
                  'CAST(((("fullPrice" - "price") * 100) / "fullPrice") AS DECIMAL(10, 2))'
                ),
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
      }

      return { ...result, pages: Math.ceil(result.count / limit) }
    } catch (error) {
      throw new Error('Blad podczas pobierania danych.')
    }
  },

  getRecommendedProducts: async (count: number) => {
    try {
      const allProducts = await ProductModel.findAll()

      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random())

      const recommendedProducts = shuffledProducts.slice(0, count)

      return recommendedProducts
    } catch (error) {
      throw new Error('Błąd podczas pobierania rekomendowanych produktów.')
    }
  },
}
