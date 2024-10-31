import{r as A,b as n,o as m,c as x,a as t,t as i,A as d,w as r,D as v,l as u,E}from"./index-ce6291c5.js";const S={class:"mt-10 mx-auto py-10 max-w-7xl px-12"},w={class:"sm:text-center lg:text-left"},f={class:"mt-3 text-4xl tracking-tight font-bold text-gray-900"},y={class:"block xl:inline"},h={key:0,class:"py-4 text-base text-slate-900 sm:mt-5 sm:mx-auto md:mt-5 lg:mx-0"},R={key:1},V={class:"py-4 text-base text-slate-900 sm:mt-5 sm:mx-auto md:mt-5 lg:mx-0"},D=["value"],I={class:"py-4 text-base text-slate-900 sm:mt-5 sm:mx-auto md:mt-5 lg:mx-0"},N={class:"mt-3 text-base text-slate-900 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"},O={class:"mt-3 text-base text-amber-600 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"},M={class:"mt-3 text-base text-slate-900 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"},B={__name:"DebugView",setup(X){const{VITE_SARA_TOKEN_NAME:c,VITE_SARA_GUARD_NAME:_}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_SARA_GUARD_NAME:"guard_token",BASE_URL:"/sara/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},a=localStorage.getItem(c),g=localStorage.getItem(_),p=!!a,e=A(!1),k=n(()=>e.value?"Xara Token":"Sara Token"),b=n(()=>{const l=e.value?"XARA":"SARA",s=`${l} ${a}|${g}`,o=`${l} ${a}`;return e.value?s:o}),T=n(()=>a?E(a):{});return(l,s)=>(m(),x("div",S,[t("div",w,[s[6]||(s[6]=t("h2",{class:"text-2xl tracking-tight font-bold text-red-500"},[t("span",{class:"block xl:inline"},"⛔ 警示：本頁面僅作為開發用途"),t("span",{class:"block xl:inline xl:ml-3"},"For debugging only")],-1)),t("h1",f,[t("span",y,i(k.value),1)]),s[7]||(s[7]=t("p",{class:"mt-3 text-base text-slate-900 sm:mx-auto lg:mx-0"}," 請勿洩漏給任何人（包括家人），避免他們拿來做壞壞的事情（比如刷爆你的信用卡）。 ",-1)),s[8]||(s[8]=t("p",{class:"mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"}," 請保密您的金鑰，這是您的身份識別機密金鑰。 ",-1)),p?(m(),x("div",R,[t("div",V,[s[1]||(s[1]=d(" Authorization: ")),t("textarea",{class:"w-full h-32 border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring",value:b.value,disabled:""},null,8,D)]),t("div",I,[s[2]||(s[2]=d(" Token ID: ")),t("code",null,i(T.value.jti),1)]),t("div",N,[r(t("input",{id:"is-with-guard","onUpdate:modelValue":s[0]||(s[0]=o=>e.value=o),class:"mr-3",type:"checkbox"},null,512),[[v,e.value]]),s[3]||(s[3]=t("label",{for:"is-with-guard"}," 啟用 Xara Token ",-1))]),r(t("p",O,s[4]||(s[4]=[t("span",{class:"block xl:inline"},"⚠️ 警告：",-1),t("span",{class:"block xl:inline"},"Xara Token 是一種高度危險的金鑰，請勿隨意測試。",-1)]),512),[[u,e.value]]),r(t("p",M,s[5]||(s[5]=[t("span",{class:"block xl:inline"},"（Xara Token 可以變更讀取所有帳號機密，甚至還能刪掉整個帳號）",-1),t("span",{class:"block xl:inline"},"（Xara Token 僅用於 Sara 系統自身）",-1)]),512),[[u,e.value]])])):(m(),x("p",h," 您尚未登入，請先登入後再查看金鑰。 "))])]))}};export{B as default};