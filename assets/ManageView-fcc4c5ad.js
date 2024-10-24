import{b as R,a as N,u as E,_ as O}from"./ToastModal-70ac9e70.js";import{C as I,b as k,d as P,o as c,c as g,a as e,t as y,x as p,w as $,j as U,F as M,D as V,l as q,h as j,E as L,i as D,r as _,G as A,B as H,g as B,y as G,z as K}from"./index-5dc7a5ae.js";const F={class:"flex justify-center my-8 py-16"},W={key:0},z={key:1},J={key:2,class:"flex flex-col mx-auto"},Q={class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"},X={class:"p-6 bg-white border-b border-gray-200"},Y={class:"p-6 bg-white border-b border-gray-200"},Z={class:"text-center text-slate-600"},ee=["onClick"],te={key:0,class:"p-6 bg-white border-b border-gray-200"},se={class:"list-disc ml-7"},oe={__name:"ManageProfileShow",emits:["state","status"],setup(f,{emit:x}){const{VITE_HOME_INTE_HOST:r,VITE_SARA_TOKEN_NAME:n,VITE_SARA_GUARD_NAME:d}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_SARA_GUARD_NAME:"guard_token",BASE_URL:"/sara/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},a=x,s=I({passkeys:[],isLoad:!0,isDead:!1}),l=k(()=>Array.isArray(s==null?void 0:s.roles)&&s.roles.length),o=k(()=>R()),v=()=>{localStorage.removeItem(n),localStorage.removeItem(d),location.replace(r)},m=()=>{a("state",{name:"ManageProfileDelete",props:{id:s._id,nickname:s.nickname,email:s.email,roles:s.roles}})},u=()=>{a("state",{name:"ManageProfileEdit",props:{nickname:s.nickname}})},b=w=>{a("state",{name:"ManagePasskeyShow",props:w})},t=async()=>{const w=E(),i=await w.post("users/me/passkeys"),{session_id:h,session_options:S}=await i.json();let T;try{T=await N({optionsJSON:S})}catch(C){console.error(C),a("status",{message:"通行金鑰新增失敗"});return}try{await w.patch("users/me/passkeys",{json:{session_id:h,credential:T}}),a("status",{message:"通行金鑰新增成功"}),setTimeout(()=>{location.reload()},1300)}catch(C){console.error(C),a("status",{message:"通行金鑰新增失敗"});return}};return P(async()=>{const w=E();try{const h=await(await w.get("users/me")).json(),{profile:S}=h;Object.assign(s,S),requestAnimationFrame(()=>{s.isLoad=!1})}catch(i){console.warn(i.message),s.isDead=!0}}),(w,i)=>(c(),g("div",F,[s.isDead?(c(),g("div",W," 發生錯誤 ")):s.isLoad?(c(),g("div",z," 載入中... ")):(c(),g("div",J,[e("div",Q," 您好，"+y(s.nickname)+"，這裡是您的個人資料： ",1),e("div",X,[i[0]||(i[0]=e("span",{class:"text-gray-600"},"暱稱：",-1)),p(y(s.nickname),1),i[1]||(i[1]=e("br",null,null,-1)),i[2]||(i[2]=e("span",{class:"text-gray-600"},"電子郵件地址：",-1)),p(y(s.email),1),i[3]||(i[3]=e("br",null,null,-1)),i[4]||(i[4]=e("span",{class:"text-gray-600"},"Sara 系統使用者識別碼：",-1)),p(y(s._id),1)]),e("div",{class:"p-6 bg-white border-b border-gray-200 text-right"},[e("button",{class:"bg-amber-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-600 rounded mr-3",onClick:v}," 登出 "),e("button",{class:"bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3",onClick:m}," 刪除帳號 "),e("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded",onClick:u}," 修改個人資料 ")]),e("div",Y,[i[6]||(i[6]=e("span",{class:"text-gray-600"},"通行金鑰：",-1)),$(e("div",Z," 尚未設定通行金鑰 ",512),[[U,!s.passkeys.length]]),e("div",null,[(c(!0),g(M,null,V(s.passkeys,(h,S)=>(c(),g("button",{key:S,class:"w-full bg-white text-sm text-slate-700 font-bold py-3 md:px-8 px-4 my-1 hover:bg-slate-300 rounded",onClick:T=>b(h)},y(h.label),9,ee))),128))]),o.value?(c(),g("button",{key:0,class:"w-full bg-white shadow-md text-sm text-slate-700 font-bold py-3 md:px-8 px-4 my-3 hover:bg-slate-300 rounded",onClick:t},[q(j(L),{class:"w-6 h-6 inline-block -mt-1 mr-2"}),i[5]||(i[5]=p(" 新增通行金鑰 "))])):D("",!0)]),l.value?(c(),g("div",te,[i[7]||(i[7]=e("span",{class:"text-gray-600"},"持有權限烙印：",-1)),e("ul",se,[(c(!0),g(M,null,V(s.roles,(h,S)=>(c(),g("li",{key:S},y(h),1))),128))])])):D("",!0)]))]))}},ae={class:"flex justify-center my-8 py-16"},ne={class:"flex flex-col mx-auto"},re={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},le={class:"overflow-hidden shadow-md"},ie={class:"p-6 bg-white border-b border-gray-200"},de={class:"rounded bg-white md:flex"},ue=["disabled"],pe={class:"p-6 bg-white border-gray-200 text-right"},be=["disabled"],ce=["disabled"],me={__name:"ManageProfileEdit",props:{nickname:{type:String,required:!0}},emits:["state","status"],setup(f,{emit:x}){const r=f,n=x,d=_(!1),a=_(!1),s=I({nickname:r.nickname}),l=k(()=>d.value||a.value),o=()=>{n("state",{name:"ManageUpdateEmailRequest"})},v=()=>{location.reload()},m=async()=>{await E().put("users/me",{json:s}),a.value=!0,n("status",{message:"修改成功"}),setTimeout(()=>{location.reload()},1300)},u=async()=>{d.value=!0,await m(),d.value=!1};return(b,t)=>(c(),g("div",ae,[e("div",ne,[e("div",re,[e("div",le,[t[4]||(t[4]=e("div",{class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"}," 修改個人資料： ",-1)),e("div",ie,[e("div",de,[t[1]||(t[1]=e("label",{class:"w-full py-1 text-gray-600 md:w-16",for:"nickname"}," 暱稱： ",-1)),$(e("input",{id:"nickname","onUpdate:modelValue":t[0]||(t[0]=w=>s.nickname=w),class:"w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring",placeholder:"星川 サラ",type:"text",disabled:l.value},null,8,ue),[[A,s.nickname]])])]),e("div",{class:"p-6 bg-white border-b border-gray-200"},[t[2]||(t[2]=p(" 若要修改電子郵件地址，請點 ")),e("span",{class:"cursor-pointer text-sky-500 hover:text-sky-700",onClick:o}," 此處 "),t[3]||(t[3]=p(" 。 "))]),e("div",pe,[e("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3",disabled:l.value,onClick:u}," 確定修改 ",8,be),e("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",disabled:l.value,onClick:v}," 取消 ",8,ce)])])])])]))}},ge={class:"flex justify-center my-8 py-16"},ye={class:"flex flex-col mx-auto"},xe={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},ve={class:"overflow-hidden shadow-md"},_e={class:"p-6 bg-white border-b border-gray-200"},we={class:"p-6"},fe={class:"p-6"},he={class:"p-6 bg-white border-b border-gray-200"},ke={class:"rounded bg-white md:flex"},Se=["disabled"],Ee={class:"p-6 bg-white border-gray-200 text-right"},$e=["disabled"],Ae=["disabled"],Te={__name:"ManageProfileDelete",props:{id:{type:String,required:!0},nickname:{type:String,required:!0},email:{type:String,required:!0},roles:{type:Array,required:!0}},emits:["status"],setup(f,{emit:x}){const{VITE_HOME_INTE_HOST:r}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_SARA_GUARD_NAME:"guard_token",BASE_URL:"/sara/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},n=f,d=x,a=_(!1),s=_(!1),l=_(""),o=k(()=>a.value||s.value),v=()=>{location.reload()},m=async()=>{await E().delete("users/me"),s.value=!0,d("status",{message:"刪除成功"}),setTimeout(()=>{location.replace(r)},1300)},u=async()=>{const{value:b}=l;if(b!=="DELETE"){d("status",{message:"請輸入 DELETE 以確認刪除"});return}a.value=!0,await m(),a.value=!1};return(b,t)=>(c(),g("div",ge,[e("div",ye,[e("div",xe,[e("div",ve,[t[14]||(t[14]=H('<div class="px-6 py-4 bg-white border-b border-gray-200 font-bold"> 刪除帳號 </div><div class="p-6 bg-white border-b border-gray-200 text-red-600"> ⚠️ 請注意，刪除帳號後，所有資料將無法復原。 </div><div class="p-6 bg-white border-b border-gray-200"><p class="text-amber-500"> ‼️ 刪除並非完全抹除 ‼️ </p> 本系統將保留您的「Sara 系統使用者識別碼」以供您先前曾使用的服務繼續應用，但會將您的暱稱及電子郵件地址設為無效值。<br> 這意味著，您將 <span class="text-red-600">永久喪失</span> 本帳號的存取權限，您將不再被識別為「同一個使用者」。但您的互動紀錄仍會保留在系統中作為服務參照。 <div class="my-3"> 以下是將被刪除的資料： <ul class="list-disc ml-6"><li>暱稱</li><li>電子郵件地址</li><li>您對本「Sara 系統使用者識別碼」之存取權限</li></ul></div> 在帳號刪除後，您將無法再次使用此帳號登入本系統。<br> 但您可使用相同的電子郵件地址重新註冊新帳號。 </div><div class="p-6 bg-white border-b border-gray-200 text-red-600"> 請注意，刪除帳號後，所有資料將無法復原。<br> 本操作無法撤銷，請謹慎考慮。<br> 若確定刪除，請輸入 DELETE 以確認。 </div>',4)),e("div",_e,[t[11]||(t[11]=p(" 將被刪除的帳號資訊如下： ")),e("div",we,[t[1]||(t[1]=e("span",{class:"text-gray-600"},"暱稱：",-1)),p(y(n.nickname),1),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("span",{class:"text-gray-600"},"電子郵件地址：",-1)),p(y(n.email),1),t[4]||(t[4]=e("br",null,null,-1)),t[5]||(t[5]=e("span",{class:"text-red-600"},"（資料將會立即抹除，不會保存您的資訊）",-1))]),t[12]||(t[12]=p(" 將解除存取權限的使用者識別碼如下： ")),e("div",fe,[t[6]||(t[6]=e("span",{class:"text-gray-600"},"Sara 系統使用者識別碼：",-1)),p(y(n.id),1),t[7]||(t[7]=e("br",null,null,-1)),t[8]||(t[8]=e("span",{class:"text-gray-600"},"Sara 系統權限烙印：",-1)),p(y(n.roles.length)+" 組",1),t[9]||(t[9]=e("br",null,null,-1)),t[10]||(t[10]=e("span",{class:"text-red-600"},"（資料仍會保留在系統中，但將無法再次使用）",-1))])]),e("div",he,[e("div",ke,[t[13]||(t[13]=e("label",{class:"w-full py-1 text-gray-600 md:w-16",for:"confirm"}," 刪除： ",-1)),$(e("input",{id:"confirm","onUpdate:modelValue":t[0]||(t[0]=w=>l.value=w),class:"w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring",placeholder:"若確定刪除，請輸入 DELETE",type:"text",disabled:o.value},null,8,Se),[[A,l.value]])])]),e("div",Ee,[e("button",{class:"bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3",disabled:o.value,onClick:u}," 確定刪除 ",8,$e),e("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",disabled:o.value,onClick:v}," 取消 ",8,Ae)])])])])]))}},Ce={class:"flex justify-center my-8 py-16"},Me={class:"flex flex-col mx-auto"},Ve={class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"},De={class:"p-6 bg-white border-b border-gray-200"},Ie={__name:"ManagePasskeyShow",props:{id:{type:String,required:!0},label:{type:String,required:!0},publicKey:{type:String,required:!0},counter:{type:Number,required:!0},transports:{type:Array,required:!0},createdAt:{type:String,required:!0},updatedAt:{type:String,required:!0}},emits:["state","status"],setup(f,{emit:x}){const r=f,n=x,d=k(()=>{var l;return(l=r.transports)!=null&&l.length?r.transports.join("、"):"不支援"}),a=()=>{n("status",{message:"尚未實作"})},s=()=>{n("state",{name:"ManageProfileShow"})};return(l,o)=>(c(),g("div",Ce,[e("div",Me,[e("div",Ve," Passkey 通行金鑰 — "+y(r.label),1),e("div",De,[o[0]||(o[0]=e("span",{class:"text-gray-600"},"金鑰識別碼: ",-1)),p(y(r.id),1),o[1]||(o[1]=e("br",null,null,-1)),o[2]||(o[2]=e("span",{class:"text-gray-600"},"使用次數*: ",-1)),p(y(r.counter),1),o[3]||(o[3]=e("br",null,null,-1)),o[4]||(o[4]=e("span",{class:"text-gray-600"},"傳輸機制: ",-1)),p(y(d.value),1),o[5]||(o[5]=e("br",null,null,-1)),o[6]||(o[6]=e("span",{class:"text-gray-600"},"建立時間: ",-1)),p(y(r.createdAt),1),o[7]||(o[7]=e("br",null,null,-1)),o[8]||(o[8]=e("span",{class:"text-gray-600"},"更新時間: ",-1)),p(y(r.updatedAt),1),o[9]||(o[9]=e("br",null,null,-1))]),o[10]||(o[10]=e("div",{class:"p-6 bg-white border-b border-gray-200 text-sm text-gray-600 inline-block"},[e("span",null,"*「Passkeys 通行金鑰」並非「Security Keys 安全金鑰」，"),e("span",null,"雖 WebAuthn 2 規範曾因安全考量（重放攻擊問題）提及「Signature Counter 簽名計數器」機制。"),e("span",null,"但由於跨裝置傳輸驗證特性，因現今各家安全裝置廠商的同步技術問題因素，"),e("span",null,[p("當前絕大部分裝置"),e("b",null,"並無實作"),p("「使用次數」跨裝置計數同步機制。")]),e("span",null,"基於各項技術原因限制，本數值將永久保持為「0」。")],-1)),e("div",{class:"p-6 bg-white border-gray-200 text-right"},[e("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3",onClick:a}," 修改 "),e("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",onClick:s}," 返回 ")])])]))}},qe={class:"flex justify-center my-8 py-16"},Re={class:"flex flex-col mx-auto"},Ne={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},Oe={class:"overflow-hidden shadow-md"},Pe={class:"p-6 bg-white border-b border-gray-200"},Ue={class:"rounded bg-white md:flex"},je=["disabled"],Le={class:"p-6 bg-white border-gray-200 text-right"},He=["disabled"],Be=["disabled"],Ge={__name:"ManageUpdateEmailRequest",emits:["state","status"],setup(f,{emit:x}){const r=x,n=_(!1),d=_(!1),a=_(""),s=k(()=>n.value||d.value),l=()=>{location.reload()},o=async m=>{const t=await(await E().put("users/me/email",{json:{email:m}})).json();d.value=!0,r("state",{name:"ManageUpdateEmailVerify",props:{sessionId:t.session_id,sessionTm:t.session_tm,sessionUa:t.session_ua,sessionIp:t.session_ip,currentMail:m}})},v=async()=>{const{value:m}=a;if(!m){r("status",{message:"請輸入新的電子郵件地址"});return}n.value=!0,await o(m),n.value=!1};return(m,u)=>(c(),g("div",qe,[e("div",Re,[e("div",Ne,[e("div",Oe,[u[2]||(u[2]=e("div",{class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"}," 修改電子郵件地址： ",-1)),e("div",Pe,[e("div",Ue,[u[1]||(u[1]=e("label",{class:"w-full py-1 text-gray-600 md:w-64",for:"email"}," 新的電子郵件地址： ",-1)),$(e("input",{id:"email","onUpdate:modelValue":u[0]||(u[0]=b=>a.value=b),class:"w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring",placeholder:"例如：sara@web-tech.tw",type:"email",disabled:s.value},null,8,je),[[A,a.value]])])]),e("div",Le,[e("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3",disabled:s.value,onClick:v}," 確定修改 ",8,He),e("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",disabled:s.value,onClick:l}," 取消 ",8,Be)])])])])]))}},Ke={class:"flex justify-center my-8 py-16"},Fe={class:"flex flex-col mx-auto"},We={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},ze={class:"overflow-hidden shadow-md"},Je={class:"p-6 bg-white border-b border-gray-200"},Qe={class:"rounded bg-white md:flex"},Xe=["disabled"],Ye={class:"p-6 bg-white border-gray-200 text-right"},Ze=["disabled"],et=["disabled"],tt={__name:"ManageUpdateEmailVerify",props:{sessionId:{type:String,required:!0},sessionTm:{type:String,required:!0},sessionUa:{type:String,required:!0},sessionIp:{type:String,required:!0},currentMail:{type:String,required:!0}},emits:["status"],setup(f,{emit:x}){const r=f,n=x,d=_(!1),a=_(!1),s=_(""),l=k(()=>d.value||a.value),o=()=>{location.reload()},v=async u=>{await E().patch("users/me/email",{json:{session_id:r.sessionId,code:u}}),a.value=!0,n("status",{message:"修改成功"}),setTimeout(()=>{location.reload()},1300)},m=async()=>{const{value:u}=s;if(!u){n("status",{message:"請輸入轉移代碼"});return}d.value=!0,await v(u),d.value=!1};return(u,b)=>(c(),g("div",Ke,[e("div",Fe,[e("div",We,[e("div",ze,[b[2]||(b[2]=e("div",{class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"}," 修改電子郵件地址： ",-1)),e("div",Je,[e("div",Qe,[b[1]||(b[1]=e("label",{class:"w-full py-1 text-gray-600 md:w-64",for:"code"}," 轉移代碼： ",-1)),$(e("input",{id:"code","onUpdate:modelValue":b[0]||(b[0]=t=>s.value=t),class:"w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring",placeholder:"例如：12345678",type:"text",disabled:l.value},null,8,Xe),[[A,s.value]])])]),e("div",Ye,[e("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3",disabled:l.value,onClick:m}," 確定修改 ",8,Ze),e("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",disabled:l.value,onClick:o}," 取消 ",8,et)])])])])]))}},at={__name:"ManageView",setup(f){const x=_("ManageProfileShow"),r=_(null),n=_(""),d={ManageProfileShow:oe,ManageProfileEdit:me,ManageProfileDelete:Te,ManagePasskeyShow:Ie,ManageUpdateEmailRequest:Ge,ManageUpdateEmailVerify:tt},a=k(()=>d[x.value]),s=({name:o,props:v})=>{x.value=o,r.value=v??{},requestAnimationFrame(()=>{window.scroll({behavior:"smooth",top:0})})},l=({message:o})=>{n.value=o};return(o,v)=>(c(),g(M,null,[(c(),B(K(a.value),G(r.value,{onState:s,onStatus:l}),null,16)),q(O,{modelValue:n.value,"onUpdate:modelValue":v[0]||(v[0]=m=>n.value=m)},null,8,["modelValue"])],64))}};export{at as default};