import axios from 'axios'
import {API} from './apiurl.js'
export const Login = (user, pass, compound) =>{
        return axios
        .post(API + "/login", {
            username: user,
            password: pass,
            compoundId: compound
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res =>{
           return res.data
        })
        .catch(err =>{
            return err
        })
}


export const resetPassword = (password, repeatPassword, token) => {
    return axios
    .post(API + "/resetPassword", {
        password: password,
        repeatPassword: repeatPassword,
        token:token
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res =>{
       return res.data
    })
    .catch(err =>{
        return err
    })
}

export const sendRecoveryKey = (email) => {
    return axios
    .post(API + "/sendRecoveryKey", {
        email:email
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res =>{
       return res.data
    })
    .catch(err =>{
        return err
    })
}




export const getCompounds = () =>{
    return axios
        .get( API + "/getCompounds")
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getFilas = () =>{
    return axios
        .get( API + "/loadChildrenByType/2", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getParkings = () =>{
    return axios
        .get( API + "/loadChildrenByType/1", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const deleteParking = (json) =>{
    return axios
        .post( API + "/deletePosition", json,{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const getStock = () =>{
    return axios
        .get( API + "/stock", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const DownloadExcel = (name, excel) => {
    return axios
    .post(API + "/excel/"+name, excel)
    .then(res =>{
       return res.data
    })
    .catch(err =>{
        return err
    })
}


//USERS
export const getUsersTable = () =>{
    return axios
        .get( API + "/handheld", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getUsersStates = () =>{
    return axios
        .get( API + "/users/widget", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const logoutUser = (id) =>{
    return axios
        .get( API + "/logoutHandheld/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const resetPassUser = (id) =>{
    return axios
        .get( API + "/resetPasswordHandheld/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const generateUsernameHandheld = (name,surname) =>{
    return axios
        .post( API + "/generateUsernameHandheld",{name: name, surname: surname},{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createHandheldUser = (name,surname, username) =>{
    return axios
        .post( API + "/createHandheldUser",{name: name, surname: surname, username: username, roleid: '1'},{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}



//DEVICES
export const getDevices = () =>{
    return axios
        .get( API + "/devicesType", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const createDevice = (name,imei,typeid) =>{
    return axios
        .post( API + "/createDevice",{name: name, imei: imei, typeId: typeid},{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// VIN INFO
export const VinInfo = (id) =>{
    return axios
        .post( API + "/vehicleInfo",{vinId: id},{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// CHANGE POSITION
export const getCompounChildren = () =>{
    return axios
        .get( API + "/compoundChildren", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getPositionsChildren = (id) =>{
    return axios
        .get( API + "/loadChildren/"+ id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const changeVinPosition = (id, vin) =>{
    return axios
        .post( API + "/changeVinPosition",{positionId: id, vin: vin},{
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const getVins = (id) =>{
    return axios
        .get( API + "/getVins/"+ id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getVinsPOST = (array) =>{
    return axios
        .post( API + "/getVins",{positionsId: array}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

// SEARCH VIN AND MOVEMENTS

export const Search = (json) =>{
    return axios
        .post( API + "/search",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}



// REGLAS
export const getRules = () =>{
    return axios
        .get( API + "/getRules", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getRelevants = () =>{
    return axios
        .get( API + "/getRelevants", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const loadRelevant = (id) =>{
    return axios
        .get( API + "/loadRelevant/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const activarRule = (id) =>{
    return axios
        .get( API + "/ruleToggleActive/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createRuleAxios = (json) =>{
    return axios
        .post( API + "/createRule",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


//HOLDS
export const getHolds = () =>{
    return axios
        .get( API + "/getHolds", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createHoldAxios = (json) =>{
    return axios
        .post( API + "/createHold",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getHoldsFast = () =>{
    return axios
        .get( API + "/getHoldsFast", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const releaseVinsHold = (vins) =>{
    return axios
        .post( API + "/releaseVinsHold",vins, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


export const toggleHold = (id) =>{
    return axios
        .get( API + "/toggleActive/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const addVinsToHold = (json) =>{
    return axios
        .post( API + "/addVinsToHold",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}




// BLOQUES
export const getBlocks = () =>{
    return axios
        .get( API + "/getBlocks", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getBlock = (id) =>{
    return axios
        .get( API + "/loadBlock/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const removeBlock = (id) =>{
    return axios
        .get( API + "/removeBlock/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const toggleBlock = (id) =>{
    return axios
        .get( API + "/blockToggleActive/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createBlock = (name) =>{
    return axios
        .post( API + "/createBlock",{name:name}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const addBlock = (json) =>{
    return axios
        .post( API + "/addBlock",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

// ORDENADR COLUMNAS
export const saveProfile = (json) =>{
    return axios
        .post( API + "/saveProfile",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// BLOQUEAR O DESBLOQUEAR PARKINGS
export const toggleActiveParking = (id) =>{
    return axios
        .post( API + "/toggleById",{positionId: id}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// GET PIN 
export const generatePin = () =>{
    return axios
        .get( API + "/generatePin", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const deletePin = () =>{
    return axios
        .get( API + "/deletePin", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

// CHARTS 
export const graphicYardCapacity = () =>{
    return axios
        .get( API + "/graphicYardCapacity", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const movementsGraphic = () =>{
    return axios
        .get( API + "/movementsGraphic", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const dwellTimeGraphic = () =>{
    return axios
        .get( API + "/dWellTime", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const transportGraphic = () =>{
    return axios
        .get( API + "/transportGraphic", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// TOPS DASHBOARD
export const topRules = () =>{
    return axios
        .get( API + "/topRules", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const topMovements = () =>{
    return axios
        .get( API + "/topMovements", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

//SHORT VIN TO LARGE
export const transformShortVinToLarge = (vins) =>{
    return axios
        .post( API + "/transformShortVinToLarge",{vins: vins}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// REPORTS
export const reportYardWeb = () =>{
    return axios
        .get( API + "/reportYardWeb", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}


// LOADS / CARGAS
export const getLoads = () =>{
    return axios
        .get( API + "/getLoads", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const setLoad = (json) =>{
    return axios
        .post( API + "/createLoadWithVins",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}



// EDITOR
export const getTableEditor = (name) =>{
    return axios
        .post( API + "/editor/getTable",{name: name}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createInsertArray = (name) =>{
    return axios
        .post( API + "/editor/createInsertArray",{name: name}, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const InsertArrayEditor = (json) =>{
    return axios
        .post( API + "/editor/createWithArray",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const updateWithArrayEditor = (json) =>{
    return axios
        .post( API + "/editor/updateWithArray",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const deleteEditorRecord = (json) =>{
    return axios
        .post( API + "/editor/delete",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const createPosition = (json) =>{
    return axios
        .post( API + "/createPosition",json, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getInspections = () =>{
    return axios
        .get( API + "/inspections/get", {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getChildNodes = (id) =>{
    return axios
        .get( API + "/inspections/getChildsFromParent/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getStrucureHeadersTable = (id) =>{
    return axios
        .get( API + "/inspections/generateOrderedStructureHeaderAccessor/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getResultsByFlexDisplay = (id) =>{
    return axios
        .get( API + "/inspections/getResultsByFlexDisplay/"+id, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}

export const getResultsByOneNode = (idLastChildNode, parentId) =>{
    return axios
        .get( API + '/inspections/getResultsByOneNode'+'/'+parentId+'/'+ idLastChildNode, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const getDesings = () =>{
    return axios
        .get( API + '/getDesings', {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const getCheckVins = (vinsToCheck) =>{
    return axios
        .post( API + '/checkVins', vinsToCheck, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const sendDataInspection = (dataInspection) =>{
    return axios
        .post( API + '/inspections/create', dataInspection, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const sendDataTask = (dataTask) =>{
    return axios
        .post( API + '/inspections/createTaskWithChilds', dataTask, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const getNodeTypes = () =>{
    return axios
        .get( API + '/inspections/getNodesType', {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
export const removeVehiclesFromLoad = (vins) =>{
    return axios
        .post( API + '/removeVehiclesFromLoad', vins, {
            withCredentials: true,
            headers: { Authorization: `${sessionStorage.Authorization}` }
        })
        .then(res =>{
            return res.data
        })
        .catch(err =>{
            return err
        })
}
