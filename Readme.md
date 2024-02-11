# ----------------------- Pinterest Clone ---------------------

*Data Association*
    Ek model se dusre model ko id ke through connect karna, matlab ki agar apke pas user hai
    then wo post banayega. Thus user is making a post to ham kya karte hai - jab do data apas 
    main closely related hote hai then ham dono ko jod dete hai!

    We give the id of one type of data to other type of data-> eg: we give the id of user to
    the data of the post he/she has created and the id of post to the data of user.

    So what we have to do:
        1. Make modals for data of user and data of post to be made.
        2. Now as the two models are created so to connect them we give 
        respective id to each other
        3. The (type) of id is : mongoose.Schema.Types.ObjectId
        4. Now hame pata hai ki hame user ki id deni hai post ko but mongoose ko
        ye baat nahi pata. 
        5. Thus we add one more field named (ref) matlab jo ham id post ko de rahe hai
        wo kis modal se belong karti hai.



# Pinterest Project ------ Road Map ---------

    1. '/' : Login Page
    2. '/profile' : Profile Page and saved posts and uploaded section
    3. '/feed' : sari images dikhegi
    4. '/click' : Image opens and can be saved
    5. '/board/:boardname' : Pura board dikhega ...

# Notes :

    uniqurename + path.extname(file.originalname)
    this is used to add extension to uploaded files

# Packages Used : 
    1. express-generator
    2. express-session
    3. connect-flash
    4. mongoose
    5. multer
    6. passport
    7. passport-local
    8. passport-local-mongoose