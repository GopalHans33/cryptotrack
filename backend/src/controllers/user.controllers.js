import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponce.js'
import { User } from '../models/user.model.js'

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;

        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong will generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, username, password } = req.body;
    if (
        [name, email, username, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400,"All Fields Are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User With Email Or Username Is Exists")
    }

    const user = await User.create({
        name,
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const LoginUser = asyncHandler( async (req, res) => {
    const {email, username, password} = req.body

    if(!username && !email){
        throw new ApiError(400, "username or email required")
    }
    const user = await User.findOne({$or: [{email},{username}]})

    if(!user){
        throw new ApiError(404, "user does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid User Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,{
            user: loggedInUser, accessToken, refreshToken
        },
    "User logged In Successfully")
    )
})

export { registerUser , LoginUser }; 