
interface UniSuccessRequest {
	/**
	 * 开发者服务器返回的数据
	 */
	data: string | AnyObject | ArrayBuffer;
	/**
	 * 开发者服务器返回的 HTTP 状态码
	 */
	statusCode: number;
	/**
	 * 开发者服务器返回的 HTTP Response Header
	 */
	header: any;
	/**
	 * 开发者服务器返回的 cookies，格式为字符串数组
	 */
	cookies: string [];
}
export interface requireSuccess extends UniSuccessRequest {
	data:{
		code:number,
		msg:string,
		data?:string | AnyObject | ArrayBuffer,//请求失败无data
	}
}
 
// 请求返回的类型
export interface RequireProps<T>{
	data:T
}

// 分页
export interface ExtraProps {
	count: number,
	page: number|string,
	rows: number|string,
}

/*------------------------------------User-------------------------------------------------------*/ 
export type userInfoProps = {
	user_id: string,
	name: string,
	nick_name: string,
	user_image: string, //头像路径
	mobile: string,
	money: number,
	voucher_money: number,
	is_recharge: number,
	invitation_code: string,//邀请码
	api_token: string,
	is_user_vip: "N" | "Y" ,//用户是否是Vip N否 Y是
	end_time?: string, // vip过期时间
	type?: "day"|"week"|"month"|"quarter"|"year", //vip类型day 天卡week 周卡quarter 季卡
	
}
/*------------------------------------Pay-------------------------------------------------------*/ 
// 创建支付返回结果
export type createPayProps = {
	order_no:string,
	order_info_token:string
}
// 会员购买列表
export type vipTypeListProps = {
	money: number
	present: number
	is_hot: "N" | "Y"
	title: string
}
export interface PayRecordProps extends Partial<userInfoProps> {
	number: number|string,
	result_number: number,
	create_date: string,
	time: string,
}
/*-------------------------------------read-----------------------------------------------------------*/ 
export type ReadContentProps = {
	content: string[]
	line: number
	vip_line: boolean
	is_vip: "N" | 'Y',
	is_user_vip: "N" | 'Y'
}
export type ReadListProps = {
	book_id: number,
	book_title: string,
	cover: string,
	line: number,
	pen_name: string,
	content:string
}

