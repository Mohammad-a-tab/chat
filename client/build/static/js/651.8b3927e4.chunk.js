"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[651],{84697:(r,e,n)=>{n.d(e,{Z:()=>E});var t=n(63366),o=n(87462),a=n(72791),i=n(28182);const l=r=>{const e=a.useRef({});return a.useEffect((()=>{e.current=r})),e.current};var s=n(94419);var c=n(75878),g=n(21217);function d(r){return(0,g.Z)("MuiBadge",r)}(0,c.Z)("MuiBadge",["root","badge","invisible"]);var u=n(57271),m=n(80184);const h=["badgeContent","component","children","invisible","max","slotProps","slots","showZero"],p=a.forwardRef((function(r,e){const{component:n,children:a,max:i=99,slotProps:c={},slots:g={},showZero:p=!1}=r,f=(0,t.Z)(r,h),{badgeContent:v,max:b,displayValue:O,invisible:Z}=function(r){const{badgeContent:e,invisible:n=!1,max:t=99,showZero:o=!1}=r,a=l({badgeContent:e,max:t});let i=n;!1!==n||0!==e||o||(i=!0);const{badgeContent:s,max:c=t}=i?a:r;return{badgeContent:s,invisible:i,max:c,displayValue:s&&Number(s)>c?`${c}+`:s}}((0,o.Z)({},r,{max:i})),k=(0,o.Z)({},r,{badgeContent:v,invisible:Z,max:b,showZero:p}),x=(r=>{const{invisible:e}=r,n={root:["root"],badge:["badge",e&&"invisible"]};return(0,s.Z)(n,d,void 0)})(k),y=n||g.root||"span",L=(0,u.Z)({elementType:y,externalSlotProps:c.root,externalForwardedProps:f,additionalProps:{ref:e},ownerState:k,className:x.root}),w=g.badge||"span",R=(0,u.Z)({elementType:w,externalSlotProps:c.badge,ownerState:k,className:x.badge});return(0,m.jsxs)(y,(0,o.Z)({},L,{children:[a,(0,m.jsx)(w,(0,o.Z)({},R,{children:O}))]}))})),f=p;var v=n(66934),b=n(31402),O=n(20627);const Z=r=>!r||!(0,O.Z)(r);var k=n(14036);function x(r){return(0,g.Z)("MuiBadge",r)}const y=(0,c.Z)("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),L=["anchorOrigin","className","component","components","componentsProps","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],w=(0,v.ZP)("span",{name:"MuiBadge",slot:"Root",overridesResolver:(r,e)=>e.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),R=(0,v.ZP)("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(r,e)=>{const{ownerState:n}=r;return[e.badge,e[n.variant],e[`anchorOrigin${(0,k.Z)(n.anchorOrigin.vertical)}${(0,k.Z)(n.anchorOrigin.horizontal)}${(0,k.Z)(n.overlap)}`],"default"!==n.color&&e[`color${(0,k.Z)(n.color)}`],n.invisible&&e.invisible]}})((r=>{let{theme:e,ownerState:n}=r;return(0,o.Z)({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,zIndex:1,transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen})},"default"!==n.color&&{backgroundColor:(e.vars||e).palette[n.color].main,color:(e.vars||e).palette[n.color].contrastText},"dot"===n.variant&&{borderRadius:4,height:8,minWidth:8,padding:0},"top"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},n.invisible&&{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen})})})),E=a.forwardRef((function(r,e){var n,a,c,g,d,u;const h=(0,b.Z)({props:r,name:"MuiBadge"}),{anchorOrigin:p={vertical:"top",horizontal:"right"},className:v,component:O="span",components:y={},componentsProps:E={},overlap:$="rectangular",color:C="default",invisible:S=!1,max:W,badgeContent:j,slots:z,slotProps:B,showZero:P=!1,variant:M="standard"}=h,N=(0,t.Z)(h,L),T=l({anchorOrigin:p,color:C,overlap:$,variant:M});let F=S;!1===S&&(0===j&&!P||null==j&&"dot"!==M)&&(F=!0);const{color:A=C,overlap:I=$,anchorOrigin:V=p,variant:D=M}=F?T:h,G=(r=>{const{color:e,anchorOrigin:n,invisible:t,overlap:o,variant:a,classes:i={}}=r,l={root:["root"],badge:["badge",a,t&&"invisible",`anchorOrigin${(0,k.Z)(n.vertical)}${(0,k.Z)(n.horizontal)}`,`anchorOrigin${(0,k.Z)(n.vertical)}${(0,k.Z)(n.horizontal)}${(0,k.Z)(o)}`,`overlap${(0,k.Z)(o)}`,"default"!==e&&`color${(0,k.Z)(e)}`]};return(0,s.Z)(l,x,i)})((0,o.Z)({},h,{anchorOrigin:V,invisible:F,color:A,overlap:I,variant:D}));let H;"dot"!==D&&(H=j&&Number(j)>W?`${W}+`:j);const _=null!=(n=null!=(a=null==z?void 0:z.root)?a:y.Root)?n:w,q=null!=(c=null!=(g=null==z?void 0:z.badge)?g:y.Badge)?c:R,J=null!=(d=null==B?void 0:B.root)?d:E.root,K=null!=(u=null==B?void 0:B.badge)?u:E.badge;return(0,m.jsx)(f,(0,o.Z)({invisible:S,badgeContent:H,showZero:P,max:W},N,{slots:{root:_,badge:q},className:(0,i.Z)(null==J?void 0:J.className,G.root,v),slotProps:{root:(0,o.Z)({},J,Z(_)&&{as:O,ownerState:(0,o.Z)({},null==J?void 0:J.ownerState,{anchorOrigin:V,color:A,overlap:I,variant:D})}),badge:(0,o.Z)({},K,{className:(0,i.Z)(G.badge,null==K?void 0:K.className)},Z(q)&&{ownerState:(0,o.Z)({},null==K?void 0:K.ownerState,{anchorOrigin:V,color:A,overlap:I,variant:D})})},ref:e}))}))},40703:(r,e,n)=>{n.d(e,{Z:()=>c});var t=n(72791),o=n(92602),a=n(87120),i=new Map;i.set("bold",(function(r){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"116",cy:"116",r:"84",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"175.4",y1:"175.4",x2:"224",y2:"224",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))})),i.set("duotone",(function(r){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"116",cy:"116",r:"84",opacity:"0.2"}),t.createElement("circle",{cx:"116",cy:"116",r:"84",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"175.4",y1:"175.4",x2:"224",y2:"224",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))})),i.set("fill",(function(){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M176,116a60,60,0,1,1-60-60A60,60,0,0,1,176,116Zm53.6,113.7A8,8,0,0,1,224,232a8.3,8.3,0,0,1-5.7-2.3l-43.2-43.3a92.2,92.2,0,1,1,11.3-11.3l43.2,43.2A8,8,0,0,1,229.6,229.7ZM116,192a76,76,0,1,0-76-76A76.1,76.1,0,0,0,116,192Z"}))})),i.set("light",(function(r){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"116",cy:"116",r:"84",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("line",{x1:"175.4",y1:"175.4",x2:"224",y2:"224",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))})),i.set("thin",(function(r){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"116",cy:"116",r:"84",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("line",{x1:"175.4",y1:"175.4",x2:"224",y2:"224",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))})),i.set("regular",(function(r){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"116",cy:"116",r:"84",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"175.4",y1:"175.4",x2:"224",y2:"224",fill:"none",stroke:r,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))}));var l=function(r,e){return(0,o._)(r,e,i)},s=(0,t.forwardRef)((function(r,e){return t.createElement(a.Z,Object.assign({ref:e},r,{renderPath:l}))}));s.displayName="MagnifyingGlass";const c=s}}]);
//# sourceMappingURL=651.8b3927e4.chunk.js.map