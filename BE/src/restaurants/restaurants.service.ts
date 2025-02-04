import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {

    constructor(private prismaservice:PrismaService){}



    getAll(){
        return this.prismaservice.restaurants.findMany()
    }
    getDetail(id:number){
        return this.prismaservice.restaurants.findFirst({
            where:{
                id
            }
        })
    }
    create(body,filename){
        body.image = filename.filename
        return this.prismaservice.restaurants.create({
            data:body
        })
    }



}
