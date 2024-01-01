import gAxios from "@utils/axiosGlobal";

export async function getPackage(){
    return gAxios.get('api/package')
        .then(response => {
            return response;
        })
        .catch(err => err.response)
}