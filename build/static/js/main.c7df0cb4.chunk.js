(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(46)},23:function(e,n,t){},25:function(e,n,t){},46:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(10),s=t.n(o),u=(t(23),t(16)),c=t(11),l=t(12),i=t(14),m=t(13),h=t(15),d=(t(25),function(e){var n=e.person,t=e.handleClick;return r.a.createElement("div",{className:"person"},r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t,id:"delete"},"Delete")))}),f=function(e){var n=e.persons,t=e.handleDelete;return r.a.createElement("div",{className:"personList"},r.a.createElement("h2",{className:"sectionHeader"},"Numerot"),n.map(function(e){return r.a.createElement(d,{key:e.name,person:e,handleClick:t(e.name,e.id)})}))},p=function(e){var n=e.message;return r.a.createElement("div",{id:"errorMessage"},r.a.createElement("p",null,n))},w=function(e){var n=e.message,t=e.addPerson,a=e.nameValue,o=e.handlePersonChange,s=e.numberValue,u=e.handleNumberChange;return r.a.createElement("div",{className:"addForm"},r.a.createElement("h2",{className:"sectionHeader"},"Lisaa Uusi"),null!=n?r.a.createElement(p,{message:n}):null,r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:a,onChange:o}),"numero: ",r.a.createElement("input",{value:s,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},b=function(e){var n=e.searchTerm,t=e.handleChange;return r.a.createElement("div",{className:"searchForm"},"Rajaa tuloksia: ",r.a.createElement("input",{value:n,onChange:t}))},N=t(2),v=t.n(N),g="/api/persons",E={getAll:function(){return v.a.get(g).then(function(e){return e.data})},createNew:function(e){return v.a.post(g,e).then(function(e){return e.data})},deleteNumber:function(e){return v.a.delete("".concat(g,"\\").concat(e))},changeNumber:function(e,n){return v.a.put("".concat(g,"\\").concat(e),n).then(function(e){return e.data})}},C=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(i.a)(this,Object(m.a)(n).call(this,e))).addPerson=function(e){if(e.preventDefault(),-1!==t.state.persons.map(function(e){return e.name}).indexOf(t.state.newName)){if(window.confirm("".concat(t.state.newName," is already in the phone book, do you want to replace the phone number?"))){var n=t.state.persons.find(function(e){return e.name===t.state.newName}),a=Object(u.a)({},n,{number:t.state.newNumber});E.changeNumber(a.id,a).then(function(e){return t.setState({persons:t.state.persons.map(function(n){return n.name!==a.name?n:e}),newName:"",newNumber:"",error:"Numero vaihdettiin onnistuneesti"})}).catch(function(e){t.setState({error:e.response.data,persons:t.state.persons.filter(function(e){return e.name!==a.name})})}),setTimeout(function(){t.setState({error:null})},5e3)}}else{var r={name:t.state.newName,number:t.state.newNumber};E.createNew(r).then(function(e){t.setState({persons:t.state.persons.concat(e),newName:"",newNumber:"",searchTerm:"",error:"Succesfully added a new person!"})}).catch(function(e){t.setState({error:e.response.data.error})}),setTimeout(function(){t.setState({error:null})},5e3)}},t.deletePerson=function(e,n){return function(){window.confirm("Do you want to delete: '".concat(e,"'"))&&(E.deleteNumber(n).then(function(e){t.setState({persons:t.state.persons.filter(function(e){return e.id!==n}),error:"The person has been succesfully deleted!"})}),setTimeout(function(){t.setState({error:null})},5e3))}},t.handlePersonChange=function(e){t.setState({newName:e.target.value})},t.handleNumberChange=function(e){t.setState({newNumber:e.target.value})},t.handleSearchChange=function(e){t.setState({searchTerm:e.target.value})},t.state={persons:[],newName:"Add a new person...",newNumber:"Add phone number...",error:null,searchTerm:""},t}return Object(h.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;E.getAll().then(function(n){return e.setState({persons:n})})}},{key:"render",value:function(){var e=this,n=this.state.persons.filter(function(n){return n.name.toLowerCase().includes(e.state.searchTerm.toLowerCase())});return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement("div",{className:"flex-container"},r.a.createElement(b,{searchTerm:this.state.searchTerm,handleChange:this.handleSearchChange}),r.a.createElement(f,{persons:n,handleDelete:this.deletePerson}),r.a.createElement(w,{message:this.state.error,addPerson:this.addPerson,nameValue:this.state.newName,handlePersonChange:this.handlePersonChange,numberValue:this.state.newNumber,handleNumberChange:this.handleNumberChange})))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.c7df0cb4.chunk.js.map