import OSS from 'ali-oss';
//用于与阿里云对象存储服务（OSS）进行交互的 Node.js 客户端。它提供了一系列方法来操作存储在 OSS 上的对象，例如上传、下载、删除和列出文件等。
import {
    NODE_ENV,
    OSS_ACCESS_KEY_ID,
    OSS_ACCESS_KEY_SECRET,
    OSS_BUCKET,
    OSS_REGION,
} from '@/config';

const globalForAliOSS = global as unknown as { aliOSS: OSS | undefined };
//创建了一个全局缓存对象 globalForAliOSS，用于存储 aliOSS 客户端实例。

//初始化 ali-oss 客户端。
//如果全局对象中已经存在 aliOSS 实例，则使用该实例，否则创建一个新的实例。
export const aliOSS =
    globalForAliOSS.aliOSS ??
    new OSS({
        accessKeyId: OSS_ACCESS_KEY_ID ?? '',//阿里云的访问密钥 ID。
        accessKeySecret: OSS_ACCESS_KEY_SECRET ?? '',//阿里云的访问密钥密钥。
        region: OSS_REGION ?? '',//OSS 存储的区域。
        bucket: OSS_BUCKET ?? '',//OSS 存储桶的名称。
    });

if (NODE_ENV !== 'production') globalForAliOSS.aliOSS = aliOSS;