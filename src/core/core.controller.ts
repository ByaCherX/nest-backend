import { Controller, Get } from "@nestjs/common";
import { CoreService } from "./core.service";



@Controller('core')
export class CoreController {
    constructor(private coreService: CoreService) {}

    @Get('/')
    corevalue() {
        return this.coreService.coreget()
    }
    @Get('/c')
    coreCval() {
        return this.coreService.coreget()+"\\c"
    }
}


