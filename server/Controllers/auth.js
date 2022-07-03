import User from "../models/User.js"
import bcrypt from "bcrypt"


const register = async (req,res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({...req.body})
        try{
            await newUser.save()    
            res.status(200).json(newUser)    
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    catch(err){
        res.status(500).json({msg:"Error occured while hashing password.", err})
    }  
}


const login = async (req,res)=>{    
    try{       
        const newUser = await User.findOne({username: req.body.username});
        if(newUser){
            try{
                const passwordMatched = await bcrypt.compare(req.body.password, newUser.password)
                
                passwordMatched
                ? res.status(200).json(newUser)
                : res.status(401).json("Password is incorrect.") 
            }
            catch(err){
                res.status(500).json({msg:"An error occured.", err})
            }                              
        }
        else{
            res.status(401).json("Username does not exist.")
        }        
    }
    catch(err){
        res.status(500).json({msg:"An error occured.", err})
    }
}

export {register, login}