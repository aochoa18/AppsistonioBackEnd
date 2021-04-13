import { jsonObject, jsonMember } from 'typedjson';
import { DomiciliarioProductos } from '../entities/DomiciliarioProductos';

@jsonObject
export class DomiciliarioProductosRequest {
    @jsonMember
    domiciliarioProductos: string;

    get DomiciliarioProductos(): DomiciliarioProductos {
        try {
            //var serializer = new TypedJSON(Domiciliario);
            var usr: DomiciliarioProductos = JSON.parse(this.domiciliarioProductos);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
}