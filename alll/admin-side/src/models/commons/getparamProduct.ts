import { IListProduct } from "models/bases"

export const getParamProduct = ( param: IListProduct) => {
	let queryString = '/product?'
	let arrParam = ['']
	if(param){
		Object.keys(param).forEach((key, index) => {
			if (param[key].toString()) {
				arrParam.push(param[key])
				return (queryString +=
					arrParam.length === 2 ? `${key}=${param[key]}` : `&${key}=${param[key]}`)
			}
		})
	}
    return(queryString)
}