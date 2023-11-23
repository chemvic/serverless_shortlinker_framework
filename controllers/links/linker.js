// require("dotenv").config();
const Hashids = require('hashids');
const axios = require('axios');
const  { createClient } =require('@supabase/supabase-js');
const supabaseUrl = 'https://uuwnahknlrbjogoxtzwj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let longLink='';
let shortLink='';

const makeShort = async(req, res, next)=>{
const {longLink}= req.body;
const userId =req.user;  
if (longLink==='') {
    return res.status(400).json({message: 'Enter a valid URL'});
};

try {
  const isAvailable = await checkUrl(longLink);

if (!isAvailable) {
    return res.status(400).json({message: 'Your URL is not valid'})
};  
} catch (error) {
    throw error;
};


try {
 const link = await supabase
  .from('links')
  .select('*')
  .eq('link', longLink); 

  if (link.data.length>0) {
    shortLink = `http://localhost:3000/${link.data[0].shortcode}`;
    return res.status(200).json({shortLink: shortLink});
  };
} catch (error) {
  throw error;
};  

  let hashids = new Hashids(longLink, 6);
  const id = hashids.encode(7, 4, 9);

  try {
   const newLink =  await supabase
  .from('links')
  .insert([
    {
      shortcode: id,
      link: longLink,
      user_id: userId.id
    },
  ]); 
  } catch (error) {
    throw error;
  };  

  shortLink = `http://localhost:3000/${id}`;

res.status(201).json({
  success:"OK",
  shortLink: shortLink,
  user_id: userId.id
});
};




const reroute =async(req, res, next)=>{
// const userId =req.user;  
const shortCode =req.params.shortCode;

try {
  const link = await supabase
  .from('links')
  .select('*')
  .eq('shortcode', shortCode);

  if (link.data.length===0) {
    return res.status(404).json({message: "Invalid short URL"})
  };

  res.redirect(link.data[0].link);

} catch (error) {
  return error;
};
};

async function checkUrl(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        return false;
    };
};

const showAllLinks =async(req, res, next)=>{
    const userId =req.user; 

    const link = await supabase
    .from('links')
    .select('*')
    .eq('user_id', userId.id);

    if (link.data.length===0) {
        return res.status(200).json({message: "This user didn`t create any short URL"})
      };
      const listLinks =link.data.map(item=>`http://localhost:3000/${item.shortcode}`);
      console.log("LIST OF LINKS: ", listLinks);

      res.status(200).json({
        success: "OK",
        created_links: listLinks
      })    

};

module.exports = { makeShort, reroute, showAllLinks };