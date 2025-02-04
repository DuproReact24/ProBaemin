import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
interface UserLog{
                full_name: string,
                email: string,
                phone: string,
                address: string,
                password: string,
}
@Injectable()
export class UserService {
    constructor(private prismaservice:PrismaService){
        
    }
  async  register(userLogin){
        const saltOrRounds = 10;
       
        const hash = await  bcrypt.hash(userLogin.password, saltOrRounds);
        console.log(hash)
        userLogin.password = hash
        return this.prismaservice.users.create({
            data: {
                full_name: userLogin.full_name,
                email: userLogin.email,
                phone: userLogin.phone,
                address: userLogin.address,
                password: userLogin.password, 
              },
        })
    }
   async login(res:UserLog){
        const user = await this.prismaservice.users.findUnique({
            where:{email:res.email}
        })
        if (!user) {
            throw new Error('User not found');
          }
      
            const isPasswordValid = await bcrypt.compare(res.password, user.password);
            console.log(isPasswordValid )
            if (isPasswordValid) {
                return 'Login successful';
              } else {
                throw new Error('Invalid credentials');
              }
    }
}       
