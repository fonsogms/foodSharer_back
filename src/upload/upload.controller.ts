import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('upload')
@UseGuards(AuthGuard())
export class UploadController {
  @Post('/image')
  uploadImage(@Req() req: Request) {
    return { url: req.file.path, public_id: req.file.filename };
  }
}
