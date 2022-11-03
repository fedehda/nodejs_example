module.exports ={
    isGoodPassword:(value)=>{
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]){8,}/;
        return regex.test(value);
    }   
}