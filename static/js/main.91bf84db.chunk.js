(this["webpackJsonphelth-fe"]=this["webpackJsonphelth-fe"]||[]).push([[0],{52:function(e,t,n){},53:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),s=n(41),i=n.n(s),c=(n(52),n(53),n(13)),l=n(6),o=n(7),u=n(11),h=n(10),d=n(9),b=n(84);function p(){var e=localStorage.getItem("accessToken");if(void 0===e||null==e)return!1;var t=e.split("."),n=JSON.parse(atob(t[1]));return!Object(b.a)(new Date,new Date(n.exp.date.year,n.exp.date.month,n.exp.date.day,n.exp.time.hour,n.exp.time.minute))||(localStorage.removeItem("accessToken"),!1)}var j=n(17),v=n(2),m=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(v.jsxs)("div",{className:"navbar-item has-dropdown is-hoverable",children:[Object(v.jsx)("a",{className:"navbar-link",href:"#/",children:"Menu"}),Object(v.jsxs)("div",{className:"navbar-dropdown",children:[Object(v.jsx)(j.b,{to:"/",className:"navbar-item",children:"Activities"}),Object(v.jsx)(j.b,{to:"/challenges",className:"navbar-item",children:"Challenges"}),Object(v.jsx)(j.b,{to:"/",className:"navbar-item is-hidden",children:"Account"}),Object(v.jsx)("hr",{className:"navbar-divider"}),Object(v.jsx)(j.b,{to:"/logout",className:"navbar-item",children:"Logout"})]})]})}}]),n}(a.Component),O=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(v.jsx)("nav",{className:"navbar",role:"navigation",children:Object(v.jsx)("div",{className:"navbar-brand",children:Object(v.jsx)(m,{})})})}}]),n}(a.Component),f=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).authPath="/login",e}return Object(o.a)(n,[{key:"render",value:function(){var e=this;if(p())return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(O,{}),Object(v.jsx)(d.b,Object(c.a)({},this.props))]});return Object(v.jsx)(d.b,Object(c.a)(Object(c.a)({},this.props),{},{component:function(){return Object(v.jsx)(d.a,{to:e.authPath})}}))}}]),n}(d.b),y=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).homePath="/",e}return Object(o.a)(n,[{key:"render",value:function(){var e=this;if(p()){return Object(v.jsx)(d.b,Object(c.a)(Object(c.a)({},this.props),{},{component:function(){return Object(v.jsx)(d.a,{to:e.homePath})}}))}return Object(v.jsx)(d.b,Object(c.a)({},this.props))}}]),n}(d.b),g=n(23),x=n(12),w=n.n(x),N=n(15),k=n(31),D=n.n(k),C=new(function(){function e(){Object(l.a)(this,e),this.apiClient=D.a.create({baseURL:"http://localhost:8080/api",headers:{"Content-Type":"application/json"},responseType:"json"})}return Object(o.a)(e,[{key:"get",value:function(){var e=Object(N.a)(w.a.mark((function e(t){var n,a=arguments;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!(a.length>1&&void 0!==a[1])||a[1],e.prev=1,e.next=4,this.apiClient.get(t,n?{headers:this.getAuthHeaderFromStorage()}:{});case 4:return e.abrupt("return",e.sent);case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",this.handleError(e.t0));case 10:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=Object(N.a)(w.a.mark((function e(t){var n,a,r=arguments;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!(r.length>1&&void 0!==r[1])||r[1],a=r.length>2?r[2]:void 0,e.prev=2,e.next=5,this.apiClient.post(t,a,n?{headers:this.getAuthHeaderFromStorage()}:{});case 5:return e.abrupt("return",e.sent);case 8:return e.prev=8,e.t0=e.catch(2),e.abrupt("return",this.handleError(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(N.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.apiClient.delete(t,{headers:this.getAuthHeaderFromStorage()});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",this.handleError(e.t0));case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()},{key:"handleError",value:function(e){if(D.a.isAxiosError(e)){var t=e;console.error(t.response)}else console.error(e);return Promise.reject(e)}},{key:"getAuthHeaderFromStorage",value:function(){var e=localStorage.getItem("accessToken");if(void 0===e||null==e)throw new Error("No Auth header found in localStorage");return{Authorization:"Bearer "+e}}}]),e}());var S=new(function(){function e(){Object(l.a)(this,e)}return Object(o.a)(e,[{key:"registerUser",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.post("/users",!1,{username:t,password:n}).then((function(e){return{id:(t=e.data).id,username:t.username,score:t.score,creationDate:new Date(t.creationDate)};var t}));case 3:return a=e.sent,e.abrupt("return",Promise.resolve(a));case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()},{key:"loginUser",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n){var a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.post("/tokens",!1,{username:t,password:n});case 3:return a=e.sent,r=a.data.token,localStorage.setItem("accessToken",r),e.abrupt("return",Promise.resolve(a.data));case 9:return e.prev=9,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}()}]),e}()),A=function(e){return function(t){var n=Object(d.g)();return Object(v.jsx)(e,Object(c.a)({history:n},t))}},F=n(43);n(82);function T(e,t){F.toast({message:e,type:t,animate:{in:"fadeIn",out:"fadeOut"},position:"top-right",duration:4e3})}var _=A(function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e}return Object(o.a)(n,[{key:"changeHandler",value:function(e){this.setState(Object(g.a)({},e.currentTarget.name,e.currentTarget.value))}},{key:"submitHandler",value:function(e){var t=this;e.preventDefault(),S.registerUser(this.state.username,this.state.password).then((function(e){void 0!==e&&void 0!==e.id&&(T("Successfully Registered","is-success"),t.props.history.push("/login"))}))}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"hero is-fullpage is-clipped",children:Object(v.jsx)("div",{className:"hero-body columns is-vcentered is-centered",children:Object(v.jsx)("div",{className:"column is-one-quarter",children:Object(v.jsxs)("form",{className:"box",onSubmit:this.submitHandler.bind(this),children:[Object(v.jsx)("p",{className:"title is-4",children:"Register"}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"username",children:"Username:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input",type:"text",name:"username",onChange:this.changeHandler.bind(this),minLength:4,required:!0})})]}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"password",children:"Password:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input",type:"password",name:"password",placeholder:"min. 8 characters",onChange:this.changeHandler.bind(this),minLength:8,required:!0})}),Object(v.jsxs)("div",{className:"level",children:[Object(v.jsx)("div",{className:"level-left",children:Object(v.jsx)("p",{className:"subtitle is-6 mt-5",children:Object(v.jsx)(j.b,{to:"/login",children:"Already have an Account? Login!"})})}),Object(v.jsx)("input",{className:"level-right button is-link mt-5",type:"submit",value:"Submit"})]})]})]})})})})}}]),n}(r.a.Component)),I=A(function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e}return Object(o.a)(n,[{key:"changeHandler",value:function(e){this.setState(Object(g.a)({},e.currentTarget.name,e.currentTarget.value))}},{key:"submitHandler",value:function(e){var t=this;e.preventDefault(),S.loginUser(this.state.username,this.state.password).then((function(e){void 0!==e&&(console.log(e),""!==e.token&&(T("Successfully Logged in","is-success"),t.props.history.push("/")))}))}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"hero is-fullpage is-clipped",children:Object(v.jsx)("div",{className:"hero-body columns is-vcentered is-centered",children:Object(v.jsx)("div",{className:"column is-one-quarter",children:Object(v.jsxs)("form",{className:"box",onSubmit:this.submitHandler.bind(this),children:[Object(v.jsx)("p",{className:"title is-4",children:"Login"}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"username",children:"Username:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input",type:"text",name:"username",onChange:this.changeHandler.bind(this),minLength:4,required:!0})})]}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"password",children:"Password:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input",type:"password",name:"password",onChange:this.changeHandler.bind(this),minLength:8,required:!0})})]}),Object(v.jsxs)("div",{className:"level",children:[Object(v.jsx)("div",{className:"level-left",children:Object(v.jsx)("p",{className:"subtitle is-6 mt-5",children:Object(v.jsx)(j.b,{to:"/register",children:"New? Register Here!"})})}),Object(v.jsx)("input",{className:"level-right button is-link mt-5",type:"submit",value:"Submit"})]})]})})})})}}]),n}(a.Component)),W=n(95),E=n(93),L=n(90),P=n(94),G=n(24),U=n(44),B=n(45),R=n(0),H=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"setIconForActivityType",value:function(e){switch(e.typeText){case"DRINK_WATER":return Object(v.jsx)(U.a,{});case"WALKING":return Object(v.jsx)(G.e,{});case"RUNNING":return Object(v.jsx)(G.c,{});case"CYCLING":return Object(v.jsx)(G.a,{});case"SWIMMING":return Object(v.jsx)(G.d,{});case"CALISTHENICS":return Object(v.jsx)(G.b,{});default:return Object(v.jsx)(B.a,{})}}},{key:"render",value:function(){return Object(v.jsx)(R.b.Provider,{value:{className:"icon is-medium"},children:Object(v.jsx)("div",{"data-testid":"activity_entry_icon",children:this.setIconForActivityType(this.props)})})}}]),n}(a.Component),M=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"field row","data-testid":"activity_entry",children:Object(v.jsxs)("div",{className:"box level is-grouped",children:[Object(v.jsxs)("div",{className:"level-left",children:[Object(v.jsx)(H,Object(c.a)({},this.props.activityType)),Object(v.jsx)("p",{className:"title is-5 ml-3","data-testid":"activity_entry_type",children:this.props.activityType.typeDescriptionPast})]}),Object(v.jsx)("button",{className:"level-right button is-danger",children:"-"})]})})}}]),n}(a.Component),V={DRINK_WATER:{typeText:"DRINK_WATER",typeDescription:"Drink Water",typeDescriptionPast:"Drank Water"},WALKING:{typeText:"WALKING",typeDescription:"Walking",typeDescriptionPast:"Walked"},RUNNING:{typeText:"RUNNING",typeDescription:"Running",typeDescriptionPast:"Ran"},CYCLING:{typeText:"CYCLING",typeDescription:"Cycling",typeDescriptionPast:"Cycled"},SWIMMING:{typeText:"SWIMMING",typeDescription:"Swimming",typeDescriptionPast:"Swam"},CALISTHENICS:{typeText:"CALISTHENICS",typeDescription:"Calisthenics",typeDescriptionPast:"Done Calisthenics"}},q=V;function K(e){return{id:e.id,activityType:V[e.activityType.toString()],creationDate:new Date(e.creationDate.toString()),userID:e.userID}}var Y=n(18),J=n(85),z=n(46),Q=n(86),X=n(87),Z=n(88),$=n(89);function ee(e){var t=e.getDate(),n=e.getMonth()+1;return e.getFullYear()+"-"+(n<=9?"0"+n:n)+"-"+(t<=9?"0"+t:t)}function te(e){for(var t=[],n=Object(Y.a)(e,{weekStartsOn:1}),a=Object(J.a)(e,{weekStartsOn:1}),r=n;r<a;)t.push(r),r=Object(z.a)(r,1);return t}function ne(e){for(var t=Object(Q.a)(e),n=Object(X.a)(e),a=[];Object(Z.a)(t,n);)a.push({calendarWeek:Object(P.a)(t,{weekStartsOn:1}),startingOfWeek:Object(Y.a)(t,{weekStartsOn:1}),endingOfWeek:Object(J.a)(t,{weekStartsOn:1})}),t=Object($.a)(t,1);return a}var ae=new(function(){function e(){Object(l.a)(this,e)}return Object(o.a)(e,[{key:"getAllActivitiesForUserBetweenDates",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n){var a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.get("/activities?startDate=".concat(ee(t),"&endDate=").concat(ee(n)));case 3:return a=e.sent,r=a.data.map((function(e){return K(e)})),e.abrupt("return",Promise.resolve(r));case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()},{key:"saveNewActivityForUser",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n){var a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.post("/activities",!0,{textType:t,creationDate:ee(n)});case 3:return a=e.sent,r=K(a.data),e.abrupt("return",Promise.resolve(r));case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()}]),e}());function re(e){return void 0!==e&&(null!==e&&(""!==String(e)&&("DEFAULT"!==String(e)&&("number"!==typeof e||0!==e))))}var se=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={currentNewActivityFormSelection:"",newActivityDialogueButtonText:"+",newActivityDialogueVisible:!1},e}return Object(o.a)(n,[{key:"createDropdownOptionsForActivityTypes",value:function(){var e=[];for(var t in V)e.push(Object(v.jsx)("option",{"data-testid":"activity_add_dialogue_type_dropdown_option",value:V[t].typeText,children:V[t].typeDescription},"type_".concat(V[t].typeText)));return e}},{key:"handleSelectDropDownChange",value:function(e){this.setState({currentNewActivityFormSelection:e.target.value})}},{key:"handleCreateNewActivityButton",value:function(){var e=Object(N.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),console.log(this.state.currentNewActivityFormSelection),re(this.state.currentNewActivityFormSelection)){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,ae.saveNewActivityForUser(this.state.currentNewActivityFormSelection,this.props.currentDate);case 6:this.props.updateListFunction();case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleShowNewActivityDialogueButton",value:function(e){e.preventDefault(),this.state.newActivityDialogueVisible?this.setState({newActivityDialogueVisible:!1,newActivityDialogueButtonText:"+"}):this.setState({newActivityDialogueVisible:!0,newActivityDialogueButtonText:"x"})}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"is-flex is-position-fixed-bottom-right is-justify-content-flex-end is-flex-direction-row",children:[Object(v.jsx)("div",{"data-testid":"activity_add_flexparent",className:"is-align-self-flex-end mb-5 ".concat(this.state.newActivityDialogueVisible?"":"is-invisible"),children:Object(v.jsxs)("form",{className:"box","data-testid":"activity_add_dialogue",onSubmit:this.handleCreateNewActivityButton.bind(this),children:[Object(v.jsx)("p",{className:"title is-5",children:"New Activity"}),Object(v.jsx)("div",{className:"control select",children:Object(v.jsxs)("select",{name:"activity_type","data-testid":"activity_add_dialogue_type_dropdown",onChange:this.handleSelectDropDownChange.bind(this),defaultValue:"DEFAULT",children:[Object(v.jsx)("option",{"data-testid":"activity_add_dialogue_type_dropdown_option",value:"DEFAULT",children:"Select an activity type..."},"type_DEFAULT"),this.createDropdownOptionsForActivityTypes()]})}),Object(v.jsx)("input",{className:"button is-link","data-testid":"activity_add_dialogue_submit_button",type:"submit",value:"Submit"})]})}),Object(v.jsx)("button",{onClick:this.handleShowNewActivityDialogueButton.bind(this),"data-testid":"activity_add_button",className:"button is-dark is-medium is-align-self-flex-end mb-5 mr-5 ml-5",children:this.state.newActivityDialogueButtonText})]})}}]),n}(a.Component),ie=n(47),ce=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={currentDate:new Date,activities:[],calendarVisible:!1},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.updateActivitiesInState()}},{key:"updateActivitiesInState",value:function(){var e=this,t=te(this.state.currentDate);ae.getAllActivitiesForUserBetweenDates(t[0],t[t.length-1]).then((function(t){e.setState({activities:t})}))}},{key:"createDayClustersForActivitiesInWeekForStateCurrentDate",value:function(){var e=this;return te(this.state.currentDate).map((function(t,n){var r=e.state.activities.filter((function(e){return Object(W.a)(e.creationDate,t)}));return r.length>0?Object(v.jsxs)("div",{className:"row","data-testid":"activities_list_day",children:[Object(v.jsx)("p",{className:"subtitle is-6 mt-6",children:"".concat(Object(E.a)(r[0].creationDate,"MMMM do",{weekStartsOn:1}))}),r.map((function(e,t){return Object(a.createElement)(M,Object(c.a)(Object(c.a)({},e),{},{key:"batch_no_".concat(t.toString())}))}))]},"week_day_".concat(n.toString())):null}))}},{key:"changeCurrentDate",value:function(e){Array.isArray(e)||(this.setState({currentDate:e}),this.setState({calendarVisible:!1}))}},{key:"showCalendar",value:function(e){e.preventDefault(),this.setState({calendarVisible:!this.state.calendarVisible})}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"is-fullpage",children:[Object(v.jsx)("div",{className:"columns is-centered",children:Object(v.jsxs)("div",{className:"column is-two-fifths","data-testid":"activities_list",children:[Object(v.jsx)("p",{className:"title is-1",children:"".concat(Object(L.a)(this.state.currentDate))}),Object(v.jsxs)("div",{className:"is-flex is-flex-direction-row",children:[Object(v.jsx)("button",{className:"button is-justify-content-start",onClick:this.showCalendar.bind(this),children:"CW ".concat(Object(P.a)(this.state.currentDate,{weekStartsOn:1}))}),Object(v.jsx)(ie.a,{className:"ml-6 calendar box is-justify-content-end ".concat(this.state.calendarVisible?"":"is-hidden"),minDetail:"year",showWeekNumbers:!0,onChange:this.changeCurrentDate.bind(this),value:this.state.currentDate})]}),Object(v.jsx)("div",{className:"rows",children:this.createDayClustersForActivitiesInWeekForStateCurrentDate()})]})}),Object(v.jsx)(se,{currentDate:this.state.currentDate,updateListFunction:this.updateActivitiesInState.bind(this)})]})}}]),n}(a.Component),le=n(92),oe=n(91),ue=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"getColorCSSClassForChallengeStatus",value:function(e){switch(e){case"IN_PROGRESS":return"";case"SUCCEEDED":return"has-background-success-light";case"FAILED":return"has-background-danger-light";default:return"has-background-danger-dark"}}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"field row",children:Object(v.jsxs)("div",{className:"box is-grouped level ".concat(this.getColorCSSClassForChallengeStatus(this.props.challengeStatus.statusText)),"data-testid":"challenge",children:[Object(v.jsxs)("div",{className:"level-left",children:[Object(v.jsx)(H,Object(c.a)({},this.props.activityType)),Object(v.jsx)("p",{className:"title is-5 ml-3",children:this.props.activityType.typeDescription})]}),Object(v.jsx)("div",{className:"level-right level-item",children:Object(v.jsxs)("div",{children:[Object(v.jsxs)("p",{className:"subtitle is-6",children:[this.props.timesAWeekCurrent,"/",Object(oe.a)(this.props.expirationDate,this.props.startDate,{weekStartsOn:1})*this.props.timesAWeekGoal]}),Object(v.jsxs)("p",{className:"subtitle is-6",children:["Until CW",Object(P.a)(this.props.expirationDate,{weekStartsOn:1})]})]})})]})})}}]),n}(a.Component),he={IN_PROGRESS:{statusText:"IN_PROGRESS",statusDescription:"In Progress"},SUCCEEDED:{statusText:"SUCCEEDED",statusDescription:"Succeeded"},FAILED:{statusText:"FAILED",statusDescription:"Failed"}};function de(e){return{id:e.id,activityType:V[e.activityType],timesAWeekGoal:Number(e.timesAWeekGoal),timesAWeekCurrent:Number(e.timesAWeekCurrent),startDate:new Date(e.startDate),expirationDate:new Date(e.expirationDate),challengeStatus:he[e.challengeStatus],userID:e.userID}}var be=new(function(){function e(){Object(l.a)(this,e)}return Object(o.a)(e,[{key:"getAllChallengesForUserBetweenDates",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n){var a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.get("/challenges?startDate=".concat(ee(t),"&endDate=").concat(ee(n)));case 3:return a=e.sent,r=a.data.map((function(e){return de(e)})),e.abrupt("return",Promise.resolve(r));case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()},{key:"saveNewChallengeForUser",value:function(){var e=Object(N.a)(w.a.mark((function e(t,n,a){var r,s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.post("/challenges",!0,{activityTypeText:t,timesAWeekGoal:n,weeksDuration:a});case 3:return r=e.sent,s=de(r.data),e.abrupt("return",Promise.resolve(s));case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n,a){return e.apply(this,arguments)}}()}]),e}()),pe=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={currentNewChallengeFormSelections:{activityType:"",weeklyGoal:0,amountOfWeeks:0},newChallengeDialogueButtonText:"+",newChallengeDialogueVisible:!1},e}return Object(o.a)(n,[{key:"handleNewChallengeActivityTypeChange",value:function(e){this.setState({currentNewChallengeFormSelections:{activityType:e.target.value,weeklyGoal:this.state.currentNewChallengeFormSelections.weeklyGoal,amountOfWeeks:this.state.currentNewChallengeFormSelections.amountOfWeeks}})}},{key:"handleNewChallengeWeeklyGoalChange",value:function(e){this.setState({currentNewChallengeFormSelections:{activityType:this.state.currentNewChallengeFormSelections.activityType,weeklyGoal:Number(e.currentTarget.value),amountOfWeeks:this.state.currentNewChallengeFormSelections.amountOfWeeks}})}},{key:"handleNewChallengeAmountOfWeeksChange",value:function(e){this.setState({currentNewChallengeFormSelections:{activityType:this.state.currentNewChallengeFormSelections.activityType,weeklyGoal:this.state.currentNewChallengeFormSelections.weeklyGoal,amountOfWeeks:Number(e.currentTarget.value)}})}},{key:"createDropwDownOptionsForNewChallengeActivityTypes",value:function(){var e=[];for(var t in q)e.push(Object(v.jsx)("option",{value:q[t].typeText,children:q[t].typeDescription},"new_challenge_activity_type_".concat(q[t].typeText)));return e}},{key:"handleSubmitNewChallengeCreationForm",value:function(){var e=Object(N.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),re(this.state.currentNewChallengeFormSelections.activityType)&&re(this.state.currentNewChallengeFormSelections.weeklyGoal)&&re(this.state.currentNewChallengeFormSelections.amountOfWeeks)){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,be.saveNewChallengeForUser(this.state.currentNewChallengeFormSelections.activityType,this.state.currentNewChallengeFormSelections.weeklyGoal,this.state.currentNewChallengeFormSelections.amountOfWeeks);case 5:this.props.updateListFunction();case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleShowNewChallengeDialogueButton",value:function(e){e.preventDefault(),this.state.newChallengeDialogueVisible?this.setState({newChallengeDialogueVisible:!1,newChallengeDialogueButtonText:"+"}):this.setState({newChallengeDialogueVisible:!0,newChallengeDialogueButtonText:"x"})}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"is-flex is-position-fixed-bottom-right is-justify-content-flex-end is-flex-direction-row",children:[Object(v.jsx)("div",{className:"is-align-self-flex-end mb-5 ".concat(this.state.newChallengeDialogueVisible?"":"is-invisible"),children:Object(v.jsxs)("form",{className:"box",onSubmit:this.handleSubmitNewChallengeCreationForm.bind(this),children:[Object(v.jsx)("p",{className:"title is-5",children:"New Challenge"}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"new_challenge_activity_type",children:"Target Activity:"}),Object(v.jsx)("div",{className:"control select",children:Object(v.jsxs)("select",{name:"new_challenge_activity_type",defaultValue:"DEFAULT",onChange:this.handleNewChallengeActivityTypeChange.bind(this),children:[Object(v.jsx)("option",{value:"DEFAULT",children:"Select an Activity Type..."},"type_DEFAULT"),this.createDropwDownOptionsForNewChallengeActivityTypes()]})})]}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"new_challenge_weekly_goal",children:"Weekly Goal Amount:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input mt-3",type:"number",min:"1",max:"21",name:"new_challenge_weekly_goal",placeholder:"max. 21",required:!0,onChange:this.handleNewChallengeWeeklyGoalChange.bind(this)})})]}),Object(v.jsxs)("div",{className:"field",children:[Object(v.jsx)("label",{className:"label",htmlFor:"new_challenge_amount_of_weeks",children:"Amount of Weeks:"}),Object(v.jsx)("div",{className:"control",children:Object(v.jsx)("input",{className:"input mt-3",type:"number",min:"1",name:"new_challenge_amount_of_weeks",required:!0,onChange:this.handleNewChallengeAmountOfWeeksChange.bind(this)})})]}),Object(v.jsx)("input",{className:"button is-link mt-5",type:"submit",value:"Submit"})]})}),Object(v.jsx)("div",{className:"is-align-self-flex-end mb-5 ml-5 mr-5",children:Object(v.jsx)("button",{onClick:this.handleShowNewChallengeDialogueButton.bind(this),className:"button is-dark is-medium",children:this.state.newChallengeDialogueButtonText})})]})}}]),n}(a.Component),je=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={currentDate:new Date,coveredCalendarWeeks:[],challenges:[]},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.updateChallengesInState()}},{key:"updateChallengesInState",value:function(){var e=this,t=ne(this.state.currentDate);be.getAllChallengesForUserBetweenDates(t[0].startingOfWeek,t[t.length-1].endingOfWeek).then((function(t){e.setState({challenges:t})}))}},{key:"createStartWeekClustersForChallengesInMonthForStateCurrentDate",value:function(){var e=this;return ne(this.state.currentDate).map((function(t){var n=e.state.challenges.filter((function(e){return Object(le.a)(e.startDate,t.startingOfWeek,{weekStartsOn:1})}));return n.length>0?Object(v.jsxs)("div",{className:"row","data-testid":"challenges_list_week",children:[Object(v.jsx)("p",{className:"subtitle is-6 mt-6",children:"Started in CW ".concat(Object(P.a)(n[0].startDate,{weekStartsOn:1}))}),n.map((function(e,t){return Object(a.createElement)(ue,Object(c.a)(Object(c.a)({},e),{},{key:"batch_no_".concat(t.toString())}))}))]},"calendar_week_".concat(t.calendarWeek.toString())):null}))}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"is-fullpage",children:[Object(v.jsx)("div",{className:"columns is-centered",children:Object(v.jsxs)("div",{className:"column is-two-fifths","data-testid":"challenges_list",children:[Object(v.jsxs)("div",{className:"level",children:[Object(v.jsx)("p",{className:"title is-1 level-left",children:this.state.currentDate.getFullYear()}),Object(v.jsx)("button",{className:"button level-right",children:"Filter"})]}),Object(v.jsx)("div",{className:"rows",children:this.createStartWeekClustersForChallengesInMonthForStateCurrentDate()})]})}),Object(v.jsx)(pe,{updateListFunction:this.updateChallengesInState.bind(this)})]})}}]),n}(a.Component),ve=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"logoutAccount",value:function(){return localStorage.removeItem("accessToken"),Object(v.jsx)(d.a,{to:"/login"})}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"loader",children:this.logoutAccount()})}}]),n}(a.Component);var me=function(){return Object(v.jsxs)(j.a,{children:[Object(v.jsx)("div",{id:"toast-container"}),Object(v.jsxs)(d.d,{children:[Object(v.jsx)(y,{exact:!0,path:"/register",component:_}),Object(v.jsx)(y,{exact:!0,path:"/login",component:I}),Object(v.jsx)(f,{exact:!0,path:"/",component:ce}),Object(v.jsx)(f,{exact:!0,path:"/challenges",component:je}),Object(v.jsx)(f,{exact:!0,path:"/logout",component:ve})]})]})},Oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,96)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};i.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(me,{})}),document.getElementById("root")),Oe()}},[[83,1,2]]]);
//# sourceMappingURL=main.91bf84db.chunk.js.map