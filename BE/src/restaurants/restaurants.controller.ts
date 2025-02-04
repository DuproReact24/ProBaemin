import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Get('/getall')
  getAll(){

    return this.restaurantsService.getAll()


  }
  @Get('/getdetail/:id')
  getDetail(@Param('id') id:string){
    return this.restaurantsService.getDetail(+id)

  }
  @Post('/create')
  @UseInterceptors(FileInterceptor("hinhAnh", {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname),
    })
  }))
  create(@Body() body,@UploadedFile() file){
    
     return this.restaurantsService.create(body,file)
  }
  
}
