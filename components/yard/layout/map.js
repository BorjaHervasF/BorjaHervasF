import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import $ from 'jquery'

const map = () => {

    var [data, setData, dataRef] = useState([])

    useEffect(() => {
        if(localStorage.getItem('CampaLayout')){
            setData(JSON.parse(localStorage.getItem('CampaLayout')))
    
            console.log(dataRef.current)
    
            montarTablero(dataRef.current.anchoCampa, dataRef.current.altoCampa, montarParkings)
        }
    }, [])

    const montarParkings = () =>{
        dataRef.current.idsParkings.forEach(element => {
            element.forEach(id => {
                $('#'+id).addClass('bg-blue-400')
                $('#'+id).addClass('border-blue-400')
            });
        });
    }

    const previsualizacionParking = (e) =>{
        let coordd = String(e.target.id)
        dataRef.current.idsParkings.map(elm=>{
            if(elm.includes(coordd)){
                elm.map((pk=>{
                    document.getElementById(pk).classList.remove('bg-blue-400')
                    document.getElementById(pk).classList.remove('border-blue-400')
                    document.getElementById(pk).classList.add('bg-blue-500')
                    document.getElementById(pk).classList.add('border-blue-500')
                }))
            }else{
                elm.map((pk=>{
                    document.getElementById(pk).classList.add('bg-blue-400')
                    document.getElementById(pk).classList.add('border-blue-400')
                    document.getElementById(pk).classList.remove('bg-blue-500')
                    document.getElementById(pk).classList.remove('border-blue-500')
                }))
            }
        })
    }

    const montarTablero = (ancho,alto, callback) =>{
        var cols = ancho; 
        var rows = alto; 
        var html = "";
        let coln = 1
        let rown = 1 
        
        for (let k = 0; k < rows; k++) {
            let tr = document.createElement('tr');
            tr.id = rown
            for (let u = 0; u < cols; u++) {
                let td = document.createElement('td')
                td.className = ' w-4 h-4'
                td.id = rown+'_'+coln
                td.onmouseover = (e) => previsualizacionParking(e)
                tr.appendChild(td)
                coln++
            }

            coln = 1
            rown++
            document.getElementById('wsgrid').appendChild(tr)
        }

        callback()
    }


    return (
        <div className="w-full border-2 rounded-xl p-4 justify-center flex mt-5">
            <div className="w-full justify-center flex">
                <table id="wsgrid">

                </table>
            </div>
        </div>
    );
}

export default map;