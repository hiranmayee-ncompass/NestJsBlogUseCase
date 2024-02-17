import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'id'});
    }

    async validate(id:number, password:string){
        const userInfo = await this.authService.validateUser(id, password);
        if(!userInfo){
            throw new UnauthorizedException("You are not authorized");
        }
        console.log(userInfo)
        return userInfo;
    }
}