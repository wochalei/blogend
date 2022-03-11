const nodemailer = require('nodemailer');

//创建一个SMTP客户端配置
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com', // 这是腾讯的邮箱 host
  port: 465,
  secure: true,
  auth: {
    user: 'qq13672926533@163.com', // 发送邮件的邮箱名
    pass: 'MVKRZKTKWTTZDXVE', // 邮箱的授权码，也可以使用邮箱登陆密码
  },
})
function  sendMail(target, { title, content }) {
  return new Promise((resolve,reject)=>{
    transporter.sendMail(
      {
        from: 'qq13672926533@163.com', // 发送人邮箱
        to: `${target}`, // 接收人邮箱，多个使用数组或用逗号隔开
        subject: `${title}`, // 主题
        html: `${content}`, // 邮件正文 可以为 HTML 或者 text 
      },
      (err, msg) => {
        if (err) {
          reject(err);
        } else {
          resolve(msg);
        }
      },
    )
  })
  
}
module.exports={
  sendMail
}
