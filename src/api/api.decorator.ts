/**
 *_ API Decorator
 ** Execution Context need include
 ** CallHandler can be import ?
 */

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const API = (...metadata: string[]) => SetMetadata('api', metadata)
export const Roles = Reflector.createDecorator<string[]>();
// for Roles, do this ->
//=> const roles = this.reflector.get(Roles, context.getHandler());

export enum ApiHL_enum {
    API_CTX = '&ctx',
    API_PTX = '&ptx'
}

/** TypeScript 5.0 Typed Decorator (TEST ONLY) */
/*
function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);
    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }
    return replacementMethod;
}
*/

  
