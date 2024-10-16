import{r as l,u as D,c as i,a as x,b,d as o,t as r,e as h,g as M,F as N,j as R}from"./index-2b376515.js";import{_ as T}from"./InputModal-7b012e06.js";import{_ as U}from"./ToastModal-82022abf.js";const q={class:"flex justify-center my-8 py-16"},F={class:"flex flex-col mx-5"},H={class:"input-label text-base mb-2"},L={key:0,class:"text-center text-slate-700 mt-5 text-sm"},K="saraLoginEmailHistory",G={__name:"ManageEmailView",setup(P){const d=l(!1),p=l(!1),n=l(""),m=l(""),t=l(""),f=l(""),_=l(""),y=l(""),c=l(""),v=D(),g=R(),w=i(()=>t.value?"請輸入您的轉移代碼：":"請輸入新的電子郵件地址："),V=i(()=>t.value?"例如：12345678":"例如：sara@web-tech.tw"),k=i(()=>t.value?`請於新的電子郵件信箱 ${m.value} 收取轉移代碼。`:""),C=i(()=>t.value?"text":"email"),j=i(()=>t.value?"請輸入轉移代碼":"請輸入電子郵件地址"),S=i(()=>!!t.value),$=()=>{window.history.length?v.back():v.replace("/")},E=async u=>{if(!u){n.value=j.value;return}n.value="",d.value=!0,t.value?await B(u):await I(u),d.value=!1},I=async u=>{var a;try{const s=await(await g.put("users/me/email",{json:{email:u}})).json();s!=null&&s.session_id?(t.value=s.session_id,f.value=s.session_ua,_.value=s.session_ip,y.value=s.session_tm,m.value=c.value,c.value=""):n.value="發生錯誤 (無錯誤代碼)"}catch(e){const s=((a=e==null?void 0:e.response)==null?void 0:a.status)||"無錯誤代碼";n.value=`發生錯誤 (${s})`,console.error(e.message)}},B=async u=>{var a;try{await g.patch("users/me/email",{json:{session_id:t.value,code:u}}),p.value=!0,n.value="修改成功，正在寫入憑證...",localStorage.setItem(K,m.value),setTimeout(()=>v.replace("/manage"),500)}catch(e){const s=((a=e==null?void 0:e.response)==null?void 0:a.status)||"無錯誤代碼";n.value=`發生錯誤 (${s})`,console.error(e.message)}};return(u,a)=>(x(),b(N,null,[o("div",q,[o("div",F,[o("label",H,r(w.value),1),h(T,{modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=e=>c.value=e),loading:d.value,done:p.value,placeholder:V.value,description:k.value,"input-type":C.value,onSubmit:E},null,8,["modelValue","loading","done","placeholder","description","input-type"])])]),o("div",{class:"flex justify-center mt-5"},[o("button",{class:"flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3",onClick:$}," 取消 ")]),S.value?(x(),b("div",L,[o("div",null,"申請時間："+r(y.value||"未知"),1),o("div",null,"申請識別碼："+r(t.value||"未知"),1),o("div",null,"申請來源裝置："+r(f.value||"未知"),1),o("div",null,"申請來源 IP 位址："+r(_.value||"未知"),1)])):M("",!0),h(U,{modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=e=>n.value=e)},null,8,["modelValue"])],64))}};export{G as default};