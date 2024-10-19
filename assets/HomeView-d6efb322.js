import{r as i,u as W,c as d,o as J,a as m,b,d as e,e as u,t as v,f as _,g as z,h as k,w as G,v as Q,F as X,i as H,j as Y}from"./index-5376dda8.js";import{b as Z,s as ee}from"./index-a06124f1.js";import{_ as se,u as te}from"./ToastModal-9560dfa4.js";import{_ as oe}from"./InputModal-4b23d408.js";const ae={key:0},le={class:"flex justify-center my-8 py-16"},ne={class:"flex flex-col mx-auto"},re={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},ie={class:"overflow-hidden shadow-md"},ue={class:"p-6 bg-white border-b border-gray-200"},ce={class:"text-slate-900 my-3"},de={key:1},ve={class:"flex justify-center my-8 py-16"},pe={class:"flex flex-col mx-5"},me={class:"input-label text-base mb-2"},be={key:0,class:"flex justify-center mt-5"},ye={key:1,class:"flex justify-center mt-5"},xe={key:2,class:"text-center text-slate-700 mt-5 text-sm"},ge={class:"text-center text-slate-700 mt-5 text-sm"},f="saraLoginEmailHistory",fe="saraRegisterEmail",Ce={__name:"HomeView",setup(he){const h=i(!1),w=i(!1),S=i(!0),y=i(""),a=i(""),c=i(""),l=i(""),C=i(""),j=i(""),V=i(""),x=i(""),g=te(),R=W(),$=d(()=>l.value?"請輸入您的登入代碼：":"請輸入您的電子郵件地址："),E=d(()=>l.value?"例如：123456":"例如：sara@web-tech.tw"),N=d(()=>l.value?`請於您的電子郵件信箱 ${c.value} 收取登入代碼。`:""),D=d(()=>l.value?"text":"email"),I=d(()=>l.value?"請輸入登入代碼":"請輸入電子郵件地址"),A=d(()=>Z()&&!l.value),B=d(()=>!l.value&&!!y.value),K=d(()=>!!l.value),M=async()=>{var r;const{value:t}=x;if(!t){a.value=I.value;return}const s=await g.post("tokens/passkeys",{json:{email:t}}),{session_id:o,session_options:n}=await s.json();try{const p=await ee({optionsJSON:n});await g.patch("tokens/passkeys",{json:{session_id:o,credential:p}}),w.value=!0,a.value="登入成功，正在寫入憑證...",localStorage.setItem(f,t),H()}catch(p){const O=((r=p==null?void 0:p.response)==null?void 0:r.status)||"無錯誤代碼";a.value=`發生錯誤 (${O})`,console.error(p.message)}},P=()=>{localStorage.removeItem(f),y.value="",a.value="成功清除登入記錄"},T=()=>{sessionStorage.setItem(fe,c.value),R.push("/register")},U=()=>{location.reload()},q=async t=>{if(!t){a.value=I.value;return}a.value="",h.value=!0,l.value?await L(t):await F(t),h.value=!1},F=async t=>{var s,o;try{const r=await(await g.post("tokens",{json:{email:t}})).json();r!=null&&r.session_id?(l.value=r.session_id,C.value=r.session_ua,j.value=r.session_ip,V.value=r.session_tm,c.value=t,y.value="",x.value=""):a.value="發生錯誤 (無錯誤代碼)"}catch(n){if(((s=n==null?void 0:n.response)==null?void 0:s.status)===404)c.value=t,S.value=!1,x.value="";else{const r=((o=n==null?void 0:n.response)==null?void 0:o.status)||"無錯誤代碼";a.value=`發生錯誤 (${r})`,console.error(n.message)}}},L=async t=>{var s;try{await g.patch("tokens",{json:{session_id:l.value,code:t}}),w.value=!0,a.value="登入成功，正在寫入憑證...",localStorage.setItem(f,c.value),H()}catch(o){const n=((s=o==null?void 0:o.response)==null?void 0:s.status)||"無錯誤代碼";a.value=`發生錯誤 (${n})`,console.error(o.message)}};return J(()=>{y.value=localStorage.getItem(f)}),(t,s)=>(m(),b(X,null,[S.value?(m(),b("div",de,[e("div",ve,[e("div",pe,[e("label",me,v($.value),1),_(oe,{modelValue:x.value,"onUpdate:modelValue":s[0]||(s[0]=o=>x.value=o),loading:h.value,done:w.value,placeholder:E.value,description:N.value,"input-type":D.value,"input-history":y.value,onSubmit:q},null,8,["modelValue","loading","done","placeholder","description","input-type","input-history"])])]),A.value?(m(),b("div",be,[e("button",{class:"flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3",onClick:M},[e("span",null,[_(z(Y),{class:"h-5 w-5"})]),s[7]||(s[7]=e("span",{class:"font-bold"}," Passkey ",-1))])])):k("",!0),B.value?(m(),b("div",ye,[e("button",{class:"flex items-center space-x-2 bg-white-500 text-sm text-black font-bold py-1 md:px-3 px-4 hover:bg-slate-100 rounded mr-3",onClick:P},s[8]||(s[8]=[e("span",{class:"font-bold"}," 清除登入記錄 ",-1)]))])):k("",!0),K.value?(m(),b("div",xe,[e("div",null,"申請時間："+v(V.value||"未知"),1),e("div",null,"申請識別碼："+v(l.value||"未知"),1),e("div",null,"申請來源裝置："+v(C.value||"未知"),1),e("div",null,"申請來源 IP 位址："+v(j.value||"未知"),1)])):k("",!0),G(e("div",ge,[e("div",null,"目標電子郵件地址："+v(c.value||"未知"),1)],512),[[Q,c.value]])])):(m(),b("div",ae,[e("div",le,[e("div",ne,[e("div",re,[e("div",ie,[s[4]||(s[4]=e("div",{class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"}," 尚未註冊 ",-1)),e("div",ue,[s[2]||(s[2]=u(" 您好，您輸入的電子郵件地址： ")),e("div",ce,v(c.value),1),s[3]||(s[3]=u(" 尚未於 Sara 系統註冊帳號。 "))]),s[5]||(s[5]=e("div",{class:"p-6 bg-white border-b border-gray-200"},[u(" 若您確定曾經註冊過："),e("br"),u(" 請檢查您輸入的電子郵件地址，"),e("br"),u(" 並點選「取消」以重新輸入。 ")],-1)),s[6]||(s[6]=e("div",{class:"p-6 bg-white border-b border-gray-200"},[u(" 若您未曾註冊："),e("br"),u(" 請點選「註冊」以進行註冊。"),e("br"),u(" 註冊即代表您同意我們的 "),e("a",{href:"https://web-tech.tw/#/privacy",class:"text-sky-500 hover:text-sky-700",target:"_blank"}," 隱私權政策 "),u("。 ")],-1)),e("div",{class:"p-6 bg-white border-b border-gray-200 text-right"},[e("button",{class:"bg-amber-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-600 rounded mr-3",onClick:T}," 註冊 "),e("button",{class:"bg-white shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",onClick:U}," 取消 ")])])])])])])),_(se,{modelValue:a.value,"onUpdate:modelValue":s[1]||(s[1]=o=>a.value=o)},null,8,["modelValue"])],64))}};export{Ce as default};
