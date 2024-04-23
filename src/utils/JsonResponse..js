export const jsonResponse=(statusCode,data,message)=>{
    return {
        code:statusCode,
        data:data,
        message:message
    }
}