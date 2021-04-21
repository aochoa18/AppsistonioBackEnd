import { IncomingMessage } from "http";
import { Socket } from "net";
import { SMSResponse } from "../models/SMSResponse";
import { SocketParameter } from "../models/SocketModel";
import { CellVozBusiness } from "./CellVozBusiness";

export class UtilBusiness {
    async CreateOTP(phoneNumber: string, otp: string): Promise<SMSResponse> {
        var SMSB = new CellVozBusiness();
        var message: string = "Su codigo de verificacion para AppSistonio es " + otp;
        var otpMsg = await SMSB.SendOtp("57" + phoneNumber, message);
        return otpMsg;
    }

    CreateSocketParameter(key: string, value: any): SocketParameter {
        var param = new SocketParameter();
        param.key = key;
        param.value = JSON.stringify(value);
        return param;
    }
}