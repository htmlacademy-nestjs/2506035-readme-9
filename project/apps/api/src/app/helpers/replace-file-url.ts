import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { File } from '@project/core';

export async function replaceFileUrl(httpService: HttpService, id: string) {
  try {
    const { data } = await httpService.axiosRef.get<File>(
      `${ApplicationServiceURL.Files}/${id}`
    );

    const subdirectory = data.subDirectory.replace('\\', '/');

    return `${ApplicationServiceURL.FilesStatic}/${subdirectory}/${data.hashName}`;
  } catch {
    return id;
  }
}
