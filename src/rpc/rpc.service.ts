import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { TEST_PACKAGE_NAME, TEST_SERVICE_NAME, TestClient, hrep, hreq } from "./proto/test1";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";


@Injectable()
export class rpcService implements OnModuleInit {
    private test1_service: TestClient
    
    constructor(@Inject('rpc') private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.test1_service = this.client.getService<TestClient>(TEST_SERVICE_NAME)
    }
    async U_rpc(req: hreq): Promise<hrep> {
        let tt: hrep = {msg:''}
        var res = this.test1_service.U_rpc(req)
        res.subscribe({
            next: (value) => { tt = value }
        })
        return tt
    }
}