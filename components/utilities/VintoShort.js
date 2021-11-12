import {transformShortVinToLarge} from '../functions/datafunctions'

export const vintoshort = (array) =>{
    let only_7 = []
    let largos = []
    array.forEach(elm=>{
        if(elm.length === 7){
            only_7.push(elm)
        }else{
            largos.push(elm)
        }
    })
    if(only_7.length > 0){
        return transformShortVinToLarge(only_7).then(res=>{
            if(res.error === true){
                return false
            }else{
                res.data.forEach(elm=>{
                    largos.push(elm.vin)
                })
                return largos
            }
        })
    }else{
        return largos
    }
}