function d(e){const t=new Uint8Array(e);let n="";for(const i of t)n+=String.fromCharCode(i);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function E(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),n=(4-t.length%4)%4,a=t.padEnd(t.length+n,"="),i=atob(a),o=new ArrayBuffer(i.length),c=new Uint8Array(o);for(let s=0;s<i.length;s++)c[s]=i.charCodeAt(s);return o}function A(){return(window==null?void 0:window.PublicKeyCredential)!==void 0&&typeof window.PublicKeyCredential=="function"}function m(e){const{id:t}=e;return{...e,id:E(t),transports:e.transports}}function y(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}class r extends Error{constructor({message:t,code:n,cause:a,name:i}){super(t,{cause:a}),this.name=i??a.name,this.code=n}}function I({error:e,options:t}){var a,i,o;const{publicKey:n}=t;if(!n)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new r({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((a=n.authenticatorSelection)==null?void 0:a.requireResidentKey)===!0)return new r({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((i=n.authenticatorSelection)==null?void 0:i.userVerification)==="required")return new r({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((o=n.authenticatorSelection)==null?void 0:o.userVerification)==="required")return new r({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new r({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new r({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return n.pubKeyCredParams.filter(s=>s.type==="public-key").length===0?new r({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new r({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const c=window.location.hostname;if(y(c)){if(n.rp.id!==c)return new r({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new r({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new r({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new r({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return e}class S{createNewAbortSignal(){if(this.controller){const n=new Error("Cancelling existing WebAuthn API call for new one");n.name="AbortError",this.controller.abort(n)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const _=new S,P=["cross-platform","platform"];function O(e){if(e&&!(P.indexOf(e)<0))return e}async function N(e){var w;const{optionsJSON:t,useAutoRegister:n=!1}=e;if(!A())throw new Error("WebAuthn is not supported in this browser");const a={...t,challenge:E(t.challenge),user:{...t.user,id:E(t.user.id)},excludeCredentials:(w=t.excludeCredentials)==null?void 0:w.map(m)},i={};n&&(i.mediation="conditional"),i.publicKey=a,i.signal=_.createNewAbortSignal();let o;try{o=await navigator.credentials.create(i)}catch(l){throw I({error:l,options:i})}if(!o)throw new Error("Registration was not completed");const{id:c,rawId:s,response:u,type:b}=o;let f;typeof u.getTransports=="function"&&(f=u.getTransports());let p;if(typeof u.getPublicKeyAlgorithm=="function")try{p=u.getPublicKeyAlgorithm()}catch(l){g("getPublicKeyAlgorithm()",l)}let h;if(typeof u.getPublicKey=="function")try{const l=u.getPublicKey();l!==null&&(h=d(l))}catch(l){g("getPublicKey()",l)}let R;if(typeof u.getAuthenticatorData=="function")try{R=d(u.getAuthenticatorData())}catch(l){g("getAuthenticatorData()",l)}return{id:c,rawId:d(s),response:{attestationObject:d(u.attestationObject),clientDataJSON:d(u.clientDataJSON),transports:f,publicKeyAlgorithm:p,publicKey:h,authenticatorData:R},type:b,clientExtensionResults:o.getClientExtensionResults(),authenticatorAttachment:O(o.authenticatorAttachment)}}function g(e,t){console.warn(`The browser extension that intercepted this WebAuthn API call incorrectly implemented ${e}. You should report this error to them.
`,t)}function C(){if(!A())return new Promise(t=>t(!1));const e=window.PublicKeyCredential;return e.isConditionalMediationAvailable===void 0?new Promise(t=>t(!1)):e.isConditionalMediationAvailable()}function T({error:e,options:t}){const{publicKey:n}=t;if(!n)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new r({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new r({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const a=window.location.hostname;if(y(a)){if(n.rpId!==a)return new r({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new r({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new r({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return e}async function D(e){var R,w;const{optionsJSON:t,useBrowserAutofill:n=!1,verifyBrowserAutofillInput:a=!0}=e;if(!A())throw new Error("WebAuthn is not supported in this browser");let i;((R=t.allowCredentials)==null?void 0:R.length)!==0&&(i=(w=t.allowCredentials)==null?void 0:w.map(m));const o={...t,challenge:E(t.challenge),allowCredentials:i},c={};if(n){if(!await C())throw Error("Browser does not support WebAuthn autofill");if(document.querySelectorAll("input[autocomplete$='webauthn']").length<1&&a)throw Error('No <input> with "webauthn" as the only or last value in its `autocomplete` attribute was detected');c.mediation="conditional",o.allowCredentials=[]}c.publicKey=o,c.signal=_.createNewAbortSignal();let s;try{s=await navigator.credentials.get(c)}catch(l){throw T({error:l,options:c})}if(!s)throw new Error("Authentication was not completed");const{id:u,rawId:b,response:f,type:p}=s;let h;return f.userHandle&&(h=d(f.userHandle)),{id:u,rawId:d(b),response:{authenticatorData:d(f.authenticatorData),clientDataJSON:d(f.clientDataJSON),signature:d(f.signature),userHandle:h},type:p,clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:O(s.authenticatorAttachment)}}export{N as a,A as b,D as s};
