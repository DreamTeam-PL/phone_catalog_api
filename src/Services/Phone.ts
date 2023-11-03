import { Phone } from '../types/types';
import PhoneModel from '../models/Phone';


export default { 
    getBy: async <T>(field: keyof Phone, value:T) => { 
        try {
            const data = await PhoneModel.findOne({ where: { [field]: value } }); 
            return { find: !!data, data  }
        } catch (error) { 
            throw new Error('Server Error. cannot to get phone data.')
        }
    },

    getList: async (page:number, limit:number, sortBy:keyof Phone, sortType:'asc'|'desc') => {  
      
        try {  
            const result = {
                data: await PhoneModel.findAll({ 
                    offset: (page - 1) * limit,
                    limit,
                    order: [[sortBy, sortType]]
                }),
                pages: 0,
                count: await PhoneModel.count(), 
                currentPage: page,
                itemsPerPage: limit,
            };

            return {...result, pages: Math.ceil(result.count / limit)};
        } catch (error) {
            throw new Error('Blad podczas pobierania danych.')
        }
    },
};




