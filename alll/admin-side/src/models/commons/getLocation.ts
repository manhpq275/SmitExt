import { IListProduct } from "models/bases"

export const getLocation = (location: string, param: IListProduct) => {
	let arrParam = ['']
	Object.keys(param).forEach((key, index) => {
		if (param[key].toString()) {
			arrParam.push(param[key])
			return (location += arrParam.length === 2 ? `?${key}=${param[key]}` : `&${key}=${param[key]}`)
		}
	})
	return location
}