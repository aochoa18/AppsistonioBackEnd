import { jsonObject, jsonMember, TypedJSON } from 'typedjson';
import { Domiciliario } from '../entities/Domiciliario';

@jsonObject
export class DomiciliarioRequest {
    @jsonMember
    domiciliario: string;

    get Domiciliario(): Domiciliario {
        try {
            //var serializer = new TypedJSON(Domiciliario);
            var usr: Domiciliario = JSON.parse(this.domiciliario);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
}