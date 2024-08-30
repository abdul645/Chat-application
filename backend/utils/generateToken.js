import jwt from 'jsonwebtoken';
const generateTokenSetcookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //milisecond
        httpOnly: true, // prevent XSS attacks, also known as cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
    // Cross-site scripting (XSS) is a type of cyberattack that involves injecting malicious code into a vulnerable web application. The code can be executed when a victim loads the website. XSS attacks can have serious consequences, including: 
    // Session hijacking: Attackers can impersonate authorized users and perform any action allowed by the user account. 
    // Defacing websites: Attackers can alter the content of a corporate website to damage the company's image or spread misinformation. 
    // Credential theft: Attackers can steal credentials.
}


export default generateTokenSetcookie