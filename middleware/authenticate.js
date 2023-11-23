const jwt = require('jsonwebtoken');
// const db = require('../db');
const HttpError = require('../helpers/httpError');
const {SECRET_KEY}= process.env;
const  { createClient } =require('@supabase/supabase-js');
const supabaseUrl = 'https://uuwnahknlrbjogoxtzwj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const authenticate =async(req, res, next)=>{
    const {authorization =""}= req.headers;
    const [bearer, token]=authorization.split(" ");

    if(bearer!= "Bearer"){
       HttpError(401, "Invalid token")
    };
    if (!token) {
       HttpError(401, "Token not provided");
    };

    try {
        const {id} = jwt.verify(token, SECRET_KEY);
    
        const {data} = await supabase
        .from('users')
        .select('*')
        .eq('id', id);
        
        if(data.length === 0){
            next(HttpError(401, 'Not authorized'));
        };
        
        req.user = data[0];

    } catch (error) {
    if(error instanceof jwt.TokenExpiredError){
        next(HttpError(401, "Expired token"));
    } else if (error instanceof jwt.JsonWebTokenError){
        next(HttpError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
      next();
  };

module.exports = authenticate;
