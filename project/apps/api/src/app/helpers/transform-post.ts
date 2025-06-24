import { HttpService } from '@nestjs/axios';
import { Post } from '@project/core';
import { replaceFileUrl } from './replace-file-url';
import { fillUserInfo } from './fill-user-info';
import { PostType } from '@prisma/client';

export async function transformPost(httpService: HttpService, record: Post) {
  await fillUserInfo(httpService, record);

  if (record?.type === PostType.PHOTO) {
    record.content['photoUrl'] = await replaceFileUrl(
      httpService,
      record.content['photoId']
    );
  }
}
