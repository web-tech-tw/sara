import{u as C,w as S,a as M,v as T,o as _,c as g,b as c,t as h,r as u,d as j,e as p,f,F as B,g as R,h as q}from"./index-723d37c4.js";import{_ as D}from"./InputModal-eaab557b.js";const F={class:"flex items-center space-x-2"},I={class:"font-bold"},N={__name:"ToastModal",props:{modelValue:{type:String},modelModifiers:{}},emits:["update:modelValue"],setup(v){let n;const e=C(v,"modelValue");function d(){n&&clearTimeout(n),e.value=""}return S(e,()=>{e.value&&(n=setTimeout(d,3e3))}),(a,r)=>M((_(),g("button",{type:"button",class:"fixed right-2 lg:right-24 top-24 z-50 rounded-md px-4 py-2 text-white transition bg-amber-600 hover:bg-slate-300",onClick:r[0]||(r[0]=(...m)=>a.closeToast&&a.closeToast(...m))},[c("div",F,[c("p",I,h(e.value),1)])],512)),[[T,e.value]])}},U={class:"flex justify-center my-8 py-16"},z={class:"flex flex-col mx-5"},A={class:"input-label text-base mb-2"},L={__name:"HomeView",setup(v){const n=u(!1),e=u(""),d=u(""),a=u(""),r=u(""),m=q(),b=j(),w=p(()=>a.value?"請輸入您的登入代碼：":"請輸入您的電子郵件地址："),y=p(()=>a.value?"例如：123456":"例如：sara@web-tech.tw"),x=p(()=>a.value?`請於您的電子郵件信箱 ${d.value} 收取登入代碼。`:""),V=async l=>{if(!l){e.value="請輸入資料";return}e.value="",n.value=!0,a.value?await k(l):await $(l),n.value=!1},$=async l=>{var t,s;try{const i=await(await m.post("tokens",{json:{email:l}})).json();i!=null&&i.session_id?(a.value=i.session_id,d.value=r.value,r.value=""):e.value="發生錯誤 (無錯誤代碼)"}catch(o){if(((t=o==null?void 0:o.response)==null?void 0:t.status)===404)sessionStorage.setItem("sara_register_email",l),b.push("/register");else{const i=((s=o==null?void 0:o.response)==null?void 0:s.status)||"無錯誤代碼";e.value=`發生錯誤 (${i})`,console.error(o.message)}}},k=async l=>{var t;try{await m.patch("tokens",{json:{session_id:a.value,code:l}}),e.value="登入成功，正在寫入憑證...",R()}catch(s){const o=((t=s==null?void 0:s.response)==null?void 0:t.status)||"無錯誤代碼";e.value=`發生錯誤 (${o})`,console.error(s.message)}};return(l,t)=>(_(),g(B,null,[c("div",U,[c("div",z,[c("label",A,h(w.value),1),f(D,{modelValue:r.value,"onUpdate:modelValue":t[0]||(t[0]=s=>r.value=s),loading:n.value,placeholder:y.value,description:x.value,onSubmit:V},null,8,["modelValue","loading","placeholder","description"])])]),f(N,{modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=s=>e.value=s)},null,8,["modelValue"])],64))}};export{L as default};
