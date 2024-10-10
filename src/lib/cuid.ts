//cuid2 是一个用于生成唯一标识符的库，由 Parallel Drive 开发。
// 适用于需要生成唯一 ID 的各种应用场景，例如数据库主键、文件名、会话 ID 等。
import cuid2 from '@paralleldrive/cuid2'
export const createCuid = () => {
    return cuid2.createId();
};

export const isCuid = (id: string) => {
    return cuid2.isCuid(id);//用于验证给定的字符串是否为有效的 CUID
};