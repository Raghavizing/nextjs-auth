import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function tokenDataHelper(request:NextRequest){
    try{
        const token = request.cookies.get("token")?.value || '';
        if(token){
            const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
            console.log(decodedToken);
            return decodedToken.id;
        }   
        else{
            return NextResponse.json({error:"Token Not Found",status:"500"});
        }
    }
    catch(error:any){
        return NextResponse.json({error:error.message,status:"500"});
    }
}