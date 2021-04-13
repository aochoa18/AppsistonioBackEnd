import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class OtpRequest
{
    @jsonMember
    phoneNumber:string;
    
    @jsonMember
    otp:string;
} 
