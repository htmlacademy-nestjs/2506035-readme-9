import { HttpService } from '@nestjs/axios';
import { Comment, Post } from '@project/core';
import { ApplicationServiceURL } from '../app.config';

export async function fillUserInfo(httpService: HttpService, record: Post | Comment) {
  try {
    const { data } = await httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${record.userId}`);
    record['user'] = data;
  } catch {
    console.error(`Error retrieving user data ${record.userId}`);
  }
}
