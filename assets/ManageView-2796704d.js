import{r as i,k as R,c as L,o as M,l as O,a as n,b as a,d as t,m as U,e as o,t as r,w as c,n as w,f,p as H,F as k,q as j,h as B}from"./index-b865481a.js";import{_ as G,u as F}from"./ToastModal-149c08f7.js";const K={class:"flex justify-center my-8 py-16"},X={key:0,class:"flex flex-col mx-auto"},q={class:"max-w-2xl mx-auto sm:px-6 lg:px-8"},$={key:0,class:"overflow-hidden shadow-md"},z={class:"p-6 bg-white border-b border-gray-200"},J={class:"p-6"},P={class:"p-6"},Q={class:"p-6 bg-white border-b border-gray-200"},W={class:"flex rounded bg-white"},Y={key:1,class:"overflow-hidden shadow-md"},Z={class:"p-6 bg-white border-b border-gray-200"},ee={class:"flex rounded bg-white"},te={class:"p-6 bg-white border-b border-gray-200"},se={key:2,class:"overflow-hidden shadow-md"},oe={class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"},re={class:"p-6 bg-white border-b border-gray-200"},le={key:0,class:"p-6 bg-white border-b border-gray-200"},ne={class:"list-disc ml-7"},ae={key:1},ue={__name:"ManageView",setup(de){const{VITE_INDEX_INTE_HOST:y,VITE_SARA_TOKEN_NAME:E,VITE_SARA_GUARD_NAME:h}={VITE_INDEX_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_SARA_GUARD_NAME:"guard_token",BASE_URL:"/sara/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d=i(""),p=i(!1),m=i(!1),g=i({confirm:""}),b=i({nickname:""}),s=R({isLoaded:!1,isError:!1}),x=F(),T=L(()=>Array.isArray(s==null?void 0:s.roles)&&s.roles.length),_=()=>{localStorage.removeItem(E),localStorage.removeItem(h),location.replace(y)},S=()=>{p.value=!0},A=()=>{p.value=!1},V=async()=>{if(g.value.confirm!=="DELETE"){d.value="請輸入 DELETE 以確認刪除";return}await x.delete("users/me"),d.value="刪除成功",setTimeout(()=>{location.replace(y)},1300)},C=()=>{m.value=!0},D=()=>{m.value=!1},N=async()=>{await x.put("users/me",{json:{nickname:b.value.nickname}}),d.value="修改成功",setTimeout(()=>{location.reload()},1300)};return M(async()=>{try{const e=await(await x.get("users/me")).json(),{profile:u}=e;Object.assign(s,u),s.isLoaded=!0;const{nickname:l}=u;b.value.nickname=l}catch(v){console.warn(v.message)}}),(v,e)=>{const u=O("router-link");return n(),a(k,null,[t("div",K,[s.isLoaded?(n(),a("div",X,[t("div",q,[p.value?(n(),a("div",$,[e[16]||(e[16]=U('<div class="px-6 py-4 bg-white border-b border-gray-200 font-bold"> 刪除帳號 </div><div class="p-6 bg-white border-b border-gray-200 text-red-600"> ⚠️ 請注意，刪除帳號後，所有資料將無法復原。 </div><div class="p-6 bg-white border-b border-gray-200"><p class="text-amber-500"> ‼️ 刪除並非完全抹除 ‼️ </p> 本系統將保留您的「Sara 系統使用者識別碼」以供您先前曾使用的服務繼續應用，但會將您的暱稱及電子郵件地址設為無效。<br> 這意味著，您將 <span class="text-red-600">永久喪失</span> 本帳號的存取權限，您將不再被識別為「同一個使用者」。但您的互動紀錄仍會保留在系統中作為服務參照。 <div class="my-3"> 以下是將被刪除的資料： <ul class="list-disc ml-6"><li>暱稱</li><li>電子信箱地址</li><li>您對本「Sara 系統使用者識別碼」之存取權限</li></ul></div> 在帳號刪除後，您將無法再次使用此帳號登入本系統。<br> 但您可使用相同的電子郵件地址重新註冊新帳號。 </div><div class="p-6 bg-white border-b border-gray-200 text-red-600"> 請注意，刪除帳號後，所有資料將無法復原。<br> 本操作無法撤銷，請謹慎考慮。<br> 若確定刪除，請輸入 DELETE 以確認。 </div>',4)),t("div",z,[e[13]||(e[13]=o(" 將被刪除的帳號資訊如下： ")),t("div",J,[e[3]||(e[3]=t("span",{class:"text-gray-600"},"暱稱：",-1)),o(r(s.nickname),1),e[4]||(e[4]=t("br",null,null,-1)),e[5]||(e[5]=t("span",{class:"text-gray-600"},"電子郵件地址：",-1)),o(r(s.email),1),e[6]||(e[6]=t("br",null,null,-1)),e[7]||(e[7]=t("span",{class:"text-red-600"},"（資料將會立即抹除，不會保存您的資訊）",-1))]),e[14]||(e[14]=o(" 將解除存取權限的使用者識別碼如下： ")),t("div",P,[e[8]||(e[8]=t("span",{class:"text-gray-600"},"Sara 系統使用者識別碼：",-1)),o(r(s._id),1),e[9]||(e[9]=t("br",null,null,-1)),e[10]||(e[10]=t("span",{class:"text-gray-600"},"Sara 系統權限烙印：",-1)),o(r(s.roles.length)+" 組",1),e[11]||(e[11]=t("br",null,null,-1)),e[12]||(e[12]=t("span",{class:"text-red-600"},"（資料仍會保留在系統中，但將無法再次使用）",-1))])]),t("div",Q,[t("div",W,[e[15]||(e[15]=t("label",{class:"w-20 px-4 py-1 text-gray-600",for:"confirm"},"刪除：",-1)),c(t("input",{id:"confirm","onUpdate:modelValue":e[0]||(e[0]=l=>g.value.confirm=l),class:"border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none",placeholder:"若確定刪除，請輸入 DELETE",type:"text"},null,512),[[w,g.value.confirm]])])]),t("div",{class:"p-6 bg-white border-gray-200 text-right"},[t("button",{class:"bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3",onClick:V}," 確定修改 "),t("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",onClick:A}," 取消 ")])])):m.value?(n(),a("div",Y,[e[21]||(e[21]=t("div",{class:"px-6 py-4 bg-white border-b border-gray-200 font-bold"}," 修改個人資料： ",-1)),t("div",Z,[t("div",ee,[e[17]||(e[17]=t("label",{class:"w-20 px-4 py-1 text-gray-600",for:"nickname"},"暱稱：",-1)),c(t("input",{id:"nickname","onUpdate:modelValue":e[1]||(e[1]=l=>b.value.nickname=l),class:"border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none",placeholder:"例如：星川 サラ",type:"text"},null,512),[[w,b.value.nickname]])])]),t("div",te,[e[19]||(e[19]=o(" 若要修改電子郵件地址，請點 ")),f(u,{class:"text-sky-500 hover:text-sky-700",to:"/manage/email"},{default:H(()=>e[18]||(e[18]=[o(" 此處 ")])),_:1}),e[20]||(e[20]=o(" 。 "))]),t("div",{class:"p-6 bg-white border-gray-200 text-right"},[t("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3",onClick:N}," 確定修改 "),t("button",{class:"bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded",onClick:D}," 取消 ")])])):(n(),a("div",se,[t("div",oe," 您好，"+r(s.nickname)+"，這裡是您的個人資料： ",1),t("div",re,[e[22]||(e[22]=t("span",{class:"text-gray-600"},"暱稱：",-1)),o(r(s.nickname),1),e[23]||(e[23]=t("br",null,null,-1)),e[24]||(e[24]=t("span",{class:"text-gray-600"},"電子郵件地址：",-1)),o(r(s.email),1),e[25]||(e[25]=t("br",null,null,-1)),e[26]||(e[26]=t("span",{class:"text-gray-600"},"Sara 系統使用者識別碼：",-1)),o(r(s._id),1)]),t("div",{class:"p-6 bg-white border-b border-gray-200 text-right"},[t("button",{class:"bg-amber-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-600 rounded mr-3",onClick:_}," 登出 "),t("button",{class:"bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3",onClick:S}," 刪除帳號 "),t("button",{class:"bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded",onClick:C}," 修改個人資料 ")]),T.value?(n(),a("div",le,[e[27]||(e[27]=t("span",{class:"text-gray-600"},"持有權限：",-1)),t("ul",ne,[(n(!0),a(k,null,j(s.roles,(l,I)=>(n(),a("li",{key:I},r(l),1))),128))])])):B("",!0)]))])])):(n(),a("div",ae,r(s.isError?"發生錯誤":"載入中..."),1))]),f(G,{modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=l=>d.value=l)},null,8,["modelValue"])],64)}}};export{ue as default};
