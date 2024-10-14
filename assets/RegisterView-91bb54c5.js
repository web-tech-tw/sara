import{r as i,u as S,c as m,g as k,o as V,a as j,b as n,t as _,d as C,F as E,e as I,f as R}from"./index-a40a15f2.js";import{_ as $}from"./InputModal-c7ecf2ad.js";const q={class:"flex justify-center my-8 py-16"},B={class:"flex flex-col mx-5"},M={class:"input-label text-base mb-2"},F={class:"input-label text-base mb-2 text-red-600"},L={__name:"RegisterView",props:{email:{type:String,required:!0}},setup(N){const u=i(!1),t=i(""),p=i(""),r=i(""),c=i(""),d=S(),v=R(),g=m(()=>r.value?"請輸入您的註冊代碼：":"請輸入您的暱稱："),f=m(()=>r.value?"例如：1234567":"例如：星川 サラ"),b=m(()=>r.value?`請於您的電子郵件信箱 ${p.value} 收取註冊代碼。`:""),x=()=>{window.history.length?d.back():d.replace("/")},h=async e=>{if(!e){t.value="請輸入資料";return}t.value="",u.value=!0,r.value?await w(e):await y(e),u.value=!1},y=async e=>{var s;const a=sessionStorage.getItem("sara_register_email");try{const l=await(await v.post("users",{json:{email:a,nickname:e}})).json();l!=null&&l.session_id?(r.value=l.session_id,p.value=c.value,c.value=""):t.value="發生錯誤 (無錯誤代碼)"}catch(o){const l=((s=o==null?void 0:o.response)==null?void 0:s.status)||"無錯誤代碼";t.value=`發生錯誤 (${l})`,console.error(o.message)}},w=async e=>{var a;try{await v.patch("users",{json:{session_id:r.value,code:e}}),t.value="註冊成功，正在寫入憑證...",sessionStorage.removeItem("sara_register_email"),I()}catch(s){const o=((a=s==null?void 0:s.response)==null?void 0:a.status)||"無錯誤代碼";t.value=`發生錯誤 (${o})`,console.error(s.message)}};return k(()=>{sessionStorage.getItem("sara_register_email")||d.replace("/")}),(e,a)=>(V(),j(E,null,[n("div",q,[n("div",B,[n("label",M,_(g.value),1),n("p",F,_(t.value),1),C($,{modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=s=>c.value=s),loading:u.value,placeholder:f.value,description:b.value,onSubmit:h},null,8,["modelValue","loading","placeholder","description"])])]),n("div",{class:"flex justify-center mt-5"},[n("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3",onClick:x}," 取消 ")])],64))}};export{L as default};