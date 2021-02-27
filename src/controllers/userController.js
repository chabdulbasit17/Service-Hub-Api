const {User} = require("../../database/models")

const  signUp = async (req,res)=>{
   
    const { username, first_name, last_name, email, password } = req.body;
    try{
        const user = await User.create({
            username,
            first_name,
            last_name,
            email,
            password,
          });
        res.json({
            error: false,
            message: "User successfully created"
        })
    } catch(err) {
        res.json({
            error: true,
            message: "An error occured"
        })
        console.log(err);
    }
}

const signIn = (req, res)=>{
    res.send("Test Sign In");
}

module.exports= {
    signUp,
    signIn
}