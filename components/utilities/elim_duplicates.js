export const elim_duplicates = (array) =>{
    let array_new = vaciar_array(array)
    array_new = [...new Set(array_new)]
    return array_new
}

const vaciar_array = (array) =>{
    return array.filter(function (i){
        if(i.trim() !== ''){
            return i
        }
    })
}