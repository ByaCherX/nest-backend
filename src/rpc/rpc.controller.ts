import { OnModuleInit, Inject, Controller, Get } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { TestClient, TEST_PACKAGE_NAME, TEST_SERVICE_NAME, hreq, msc } from "./proto/test1"
import { Observable, ReplaySubject } from "rxjs";
import { Metadata } from "@grpc/grpc-js";
import crypto from 'node:crypto'

@Controller('rpc')
export class rpcController {
    private test1_service: TestClient

    constructor(@Inject('rpc') private readonly client: ClientGrpc) {}
    
    onModuleInit() {
        this.test1_service = this.client.getService<TestClient>(TEST_SERVICE_NAME)
    }

    @Get('u_rpc')
    U_rpc() {
        return this.test1_service.U_rpc({str: '>u_rpc-node'})
    }

    @Get('ss_rpc')
    SS_rpc() {
        var res = this.test1_service.SS_rpc({str: '>ss_rpc-node'})
        res.subscribe({
            next: (value) => {console.log(value)},
            complete: () => {},
            error: (err) => {throw err}
        })
        return 'res cannot be return because subscribed !! (only 1 subscribe)'
    }

    @Get('CS_rpc')
    CS_rpc() {
        const hreq = new ReplaySubject<hreq>();
        var res = this.test1_service.CS_rpc(hreq)
        var i: number = 0
        setInterval(() => {
            hreq.next({str: 'cs_rpc::node{'+i+'}'})
            if(i == 2) { hreq.complete() /* Finish send */ }
            i++
        },1000)
        return res
    }
    
    @Get('M_rpc_d')
    M_rpc_d() {
        this.M_rpc(); this.M_rpc()
        this.M_rpc(); this.M_rpc()
        return '>>> only Benchmark'
    }

    @Get('M_rpc')
    async M_rpc() {
        const msc = new ReplaySubject<msc>();
        const meta = new Metadata()
        meta.add('type', 'm_rpc')
        var res = this.test1_service.M_rpc(msc, meta)

        var mxec = []
        res.subscribe({
            next: (res) => {
                const hrTime = process.hrtime()
                var d = hrTime[0] * 1000000000 + hrTime[1]  //* ns
                var ff = (d - res.tt)/1000000
                //console.log(ff)  //_verbose
                mxec.push(ff)
            },
            complete: () => {
                let sum: number = mxec.reduce(function(a, b){
                    return a + b;
                });
                console.log(sum.toFixed(6), 'ms')
            }
        })

        for(let i=0; i<1024; i++) {
            const hrTime = process.hrtime()
            var d = hrTime[0] * 1000000000 + hrTime[1]
            const bf = crypto.randomBytes(1)
            msc.next({data: bf, tt: d})
        }
        msc.complete()
        
        return 'res cannot be return because subscribed !! (only 1 subscribe)'
    }
}