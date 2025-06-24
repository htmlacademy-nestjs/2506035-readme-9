import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenPairRdo {
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJlbWFpbCI6InVzZXItMUB0ZXN0LmNvbSIsIm5hbWUiOiJGaXJzdCBhbmQgbGFzdCBuYW1lIiwiaWF0IjoxNzQ4MTE4MjM3LCJleHAiOjE3NDgxMTg1Mzd9.CajQZxqzFkvTsj_riiQDhdYNYBBOnXglK3eHNAe6V4o',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJlbWFpbCI6InVzZXItMUB0ZXN0LmNvbSIsIm5hbWUiOiJGaXJzdCBhbmQgbGFzdCBuYW1lIiwiaWF0IjoxNzQ4MTE4MjM3LCJleHAiOjE3NDgxMTg1Mzd9.CajQZxqzFkvTsj_riiQDhdYNYBBOnXglK3eHNAe6V4o',
  })
  @Expose()
  public refreshToken: string;
}
