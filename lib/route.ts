import User from "@/interfaces/UserEntity";

export const getPowers = ([begin, end]: PowerEnum, n: number) => {
    let num = 0;
    for (let i = begin; i <= end; i++) {
        let bool = (n >> i) % 2 === 1;
        if (bool) num += Math.pow(2, i - begin);
    }
    return num;
}

//采用位判断权限。0-31有效
/**
 * [begin,end].开区间
 */
export type PowerEnum = [number, number];
/**
 * 3 账号权限
 * 1  可登录                 
 * 10 可编辑信息（修改姓名、密码等）       
 * 11 可编辑他人信息
 */
export const AccountPower: PowerEnum = [0, 1];
/**
 * 7 权限大小
 * 权限优先级，111（7）为最高权限，且可以设置他人账号权限。
 * 高优先级可编辑低优先级的账号，同优先级之间不可编辑。
 */
export const PowerSize: PowerEnum = [2, 4];

/**
 * 文章权限
 * 01 可发布文章
 * 10 可审批文章
 * 11 可编辑文章
 */
export const PostsPower: PowerEnum = [5, 6]

/**
 * 课程权限
 * 01 可发布课程
 * 10 可审批课程
 * 11 可编辑课程
 */
export const CoursePower: PowerEnum = [7, 8]

/**
 * 讨论权限
 * 01 可发布评论
 * 10 可发布话题
 * 11 可审批、编辑评论、话题
 */
export const DiscussPower: PowerEnum = [9, 10]

/**
 * 班级权限
 * 00 无
 * 01 可创建班级
 * 10 可编辑班级
 * 11 可编辑班级
 */
export const ClassesPower: PowerEnum = [11, 12];
