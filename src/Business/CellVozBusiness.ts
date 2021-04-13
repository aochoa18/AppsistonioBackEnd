import Axios from "axios";
import { TokenResponse } from "../models/TokenResponse";
import { TokenRequest } from "../models/TokenRequest";
import { SMSRequest } from "../models/SMSRequest";
import { config } from "process";
import { SMSResponse } from "../models/SMSResponse";
export class CellVozBusiness {
    apiKey: string = "df4fc1670a530b3b74c3975efe3841792eef63c6";
    account: string = "00486492247";
    password: string = "PayWay**2021";
    endpoint: string = "https://api.cellvoz.co/v2/";

    async SendOtp(phone: string, message: string): Promise<SMSResponse> {
        try {
            var token = await this.GetToken();
            if (token.token) {
                var smsReq: SMSRequest = new SMSRequest();
                smsReq.message = message;
                smsReq.number = phone;
                smsReq.type = 1;
                var config = {
                    headers: {
                        Authorization: "Bearer " + token.token,
                        "api-key": this.apiKey
                    }
                };
                var res = await Axios.post(this.endpoint + "sms/single", smsReq, config);
                var response: SMSResponse = res.data;
                return response;
            }
            else {
                response = new SMSResponse();
                response.success = false;
                response.message = token.message;
                return response;
            }
        }
        catch (error) {
            if (error.response)
                return error.response.data;
        }
    }

    async GetToken(): Promise<TokenResponse> {
        try {
            var tokenReq = new TokenRequest();
            tokenReq.account = this.account;
            tokenReq.password = this.password;
            var res = await Axios.post(this.endpoint + "auth/login", tokenReq);
            var token: TokenResponse = res.data;
            return token;
        }
        catch (error) {
            if (error.response) {
                //this.GuardarLog("personas; " + documento + "; " +JSON.stringify(error.response.config)+" ;"+JSON.stringify(error.response.data));
                return error.response.data;
            }
        }
    }
}