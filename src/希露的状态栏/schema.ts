const 纪元枚举 = z.enum(['灰色纪元', '破晓纪元', '繁星纪元']);
const 季节枚举 = z.enum(['春季', '夏季', '秋季', '冬季']);
const 痕迹类型枚举 = z.enum(['随记', '关键', '花语']);

export const Schema = z
  .object({
    时间: z.string().describe('格式为 时:分').prefault('12:00'),
    日期: z
      .object({
        纪元: 纪元枚举.prefault('破晓纪元'),
        季节: 季节枚举.prefault('春季'),
        日: z.coerce
          .number()
          .transform(v => _.clamp(v, 1, 15))
          .describe('1到15之间')
          .prefault(1),
      })
      .prefault({}),
    地点: z.string().describe('所在地点，使用村庄、城市等泛指词汇').prefault('村庄'),

    希露的痕迹: z
      .record(
        z.string().describe('物品名称或事件简述'),
        z
          .object({
            描述: z.string().describe('物品或事件的客观描述'),
            希露的回忆: z.string().describe('以希露本人视角的联想回忆'),
            类型: 痕迹类型枚举.prefault('随记'),
          })
          .prefault({}),
      )
      .prefault({}),

    追忆瓣: z.coerce.number().describe('由系统自动计算，请勿手动修改').prefault(0),

    希露的花珀: z
      .object({
        描述: z
          .string()
          .prefault(
            '一块温暖的、水滴状的透明琥珀，里面封存着一片没有枯萎的雏菊花芯。',
          ),
        阶段: z.enum(['嫩芽', '伴花', '含苞', '花开']).prefault('嫩芽'),
      })
      .prefault({}),

    希露的回音: z
      .string()
      .describe('希露对主角最新行为的此刻感想')
      .prefault('……'),
  })
  .transform(data => {
    const 关键痕迹数量 = _(data.希露的痕迹)
      .values()
      .filter({ 类型: '关键' })
      .size();
    data.追忆瓣 = 关键痕迹数量;

    if (data.追忆瓣 >= 3) {
      data.希露的花珀.阶段 = '花开';
    } else if (data.追忆瓣 === 2) {
      data.希露的花珀.阶段 = '含苞';
    } else if (data.追忆瓣 === 1) {
      data.希露的花珀.阶段 = '伴花';
    } else {
      data.希露的花珀.阶段 = '嫩芽';
    }

    return data;
  })
  .prefault({});

export type Schema = z.output<typeof Schema>;
