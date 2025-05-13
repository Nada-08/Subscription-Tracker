/*
    name: string
    required: true, 'Username is required'
    trim: true
    minlength: 2
    maxlength: 50,


    email: string
    required: true, 'email is required'
    unique: true
    trim: true
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Please fill a valid with a valid email address'] 

    password: string, 
    required: [true =, 'Password in required']
    minLength: 6
    

*/

// const userSchema = new 