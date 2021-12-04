function Validate(products, total){
    if(products.length > 0 && total > 0){
        return true;
    }else{
        return false;
    }
}

module.exports.Validate = Validate;