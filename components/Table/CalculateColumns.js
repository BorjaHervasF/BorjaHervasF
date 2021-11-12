

export const calcular_columnas = (columns) =>{
    let array = []
    if(columns.length > 0){
        columns.forEach((columna,i)=>{
            if(columna.accessor){
                if(columna.accessor === 'vin'){
                    columna.width = 200
                }
                if(columna.accessor === 'model'){
                    columna.width = 220
                }
                if(columna.accessor === 'vin_short'){
                    columna.width = 140
                }
                if(columna.accessor === 'state'){
                    columna.width = 180
                }
                if(columna.accessor === 'color'){
                    columna.width = 200
                }
                if(columna.accessor === 'country'){
                    columna.width = 160
                }
                if(columna.accessor === 'position'){
                    columna.width = 160
                }
                if(columna.accessor === 'holds'){
                    columna.width = 160
                }
                if(columna.accessor === 'holdsCount'){
                    columna.width = 160
                }
                if(columna.accessor === 'shipping_rule'){
                    columna.width = 180
                }    
                try {
                    if(columna.accessor.includes('dt')){
                        columna.width = 200
                    }    
                } catch (error) {
                    columna.width = 200;
                }


            }
            array.push(columna)
        })
        return array
    }else{
        return columns
    }
}