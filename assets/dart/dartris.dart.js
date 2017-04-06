(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="m"){processStatics(init.statics[b1]=b2.m,b3)
delete b2.m}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bI"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bI"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bI(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.t=function(){}
var dart=[["","",,H,{"^":"",iw:{"^":"a;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
b9:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b6:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bN==null){H.hx()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.cR("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bi()]
if(v!=null)return v
v=H.hF(a)
if(v!=null)return v
if(typeof a=="function")return C.D
y=Object.getPrototypeOf(a)
if(y==null)return C.o
if(y===Object.prototype)return C.o
if(typeof w=="function"){Object.defineProperty(w,$.$get$bi(),{value:C.j,enumerable:false,writable:true,configurable:true})
return C.j}return C.j},
e:{"^":"a;",
p:function(a,b){return a===b},
gq:function(a){return H.R(a)},
i:["ck",function(a){return H.aW(a)}],
"%":"CanvasGradient|CanvasPattern|MediaError|MediaKeyError|PositionError|PushMessageData|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLRenderingContext"},
el:{"^":"e;",
i:function(a){return String(a)},
gq:function(a){return a?519018:218159},
$ishn:1},
en:{"^":"e;",
p:function(a,b){return null==b},
i:function(a){return"null"},
gq:function(a){return 0}},
bj:{"^":"e;",
gq:function(a){return 0},
i:["cl",function(a){return String(a)}],
$iseo:1},
eC:{"^":"bj;"},
b0:{"^":"bj;"},
ax:{"^":"bj;",
i:function(a){var z=a[$.$get$c_()]
return z==null?this.cl(a):J.P(z)},
$isbh:1,
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
av:{"^":"e;$ti",
bM:function(a,b){if(!!a.immutable$list)throw H.c(new P.r(b))},
aV:function(a,b){if(!!a.fixed$length)throw H.c(new P.r(b))},
B:function(a,b){this.aV(a,"add")
a.push(b)},
as:function(a){this.aV(a,"removeLast")
if(a.length===0)throw H.c(H.o(a,-1))
return a.pop()},
F:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.a2(a))}},
a0:function(a,b){return new H.bp(a,b,[null,null])},
dB:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.d(y,x)
y[x]=w}return y.join(b)},
E:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
gI:function(a){if(a.length>0)return a[0]
throw H.c(H.aP())},
bd:function(a,b,c,d,e){var z,y,x
this.bM(a,"set range")
P.cw(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.ej())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.d(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.d(d,x)
a[b+y]=d[x]}},
dt:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.O(a[z],b))return z
return-1},
ds:function(a,b){return this.dt(a,b,0)},
i:function(a){return P.aO(a,"[","]")},
gC:function(a){return new J.dF(a,a.length,0,null)},
gq:function(a){return H.R(a)},
gj:function(a){return a.length},
sj:function(a,b){this.aV(a,"set length")
if(b<0)throw H.c(P.ai(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
return a[b]},
u:function(a,b,c){this.bM(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
a[b]=c},
$isH:1,
$asH:I.t,
$isi:1,
$asi:null,
$ish:1,
$ash:null},
iv:{"^":"av;$ti"},
dF:{"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ds(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aw:{"^":"e;",
b6:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(new P.r(""+a+".toInt()"))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gq:function(a){return a&0x1FFFFFFF},
t:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a+b},
O:function(a,b){return(a|0)===a?a/b|0:this.d1(a,b)},
d1:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.r("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
aS:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
d_:function(a,b){return b>31?0:a>>>b},
T:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a<b},
S:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a>b},
ae:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a>=b},
$isaH:1},
cd:{"^":"aw;",$isaH:1,$isj:1},
em:{"^":"aw;",$isaH:1},
aQ:{"^":"e;",
d7:function(a,b){if(b<0)throw H.c(H.o(a,b))
if(b>=a.length)throw H.c(H.o(a,b))
return a.charCodeAt(b)},
t:function(a,b){if(typeof b!=="string")throw H.c(P.bU(b,null,null))
return a+b},
cj:function(a,b,c){var z
if(c>a.length)throw H.c(P.ai(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
ci:function(a,b){return this.cj(a,b,0)},
bf:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.p(H.L(c))
if(b<0)throw H.c(P.aX(b,null,null))
if(typeof c!=="number")return H.N(c)
if(b>c)throw H.c(P.aX(b,null,null))
if(c>a.length)throw H.c(P.aX(c,null,null))
return a.substring(b,c)},
be:function(a,b){return this.bf(a,b,null)},
c7:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.t)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dP:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.c7(c,z)+a},
dF:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
dE:function(a,b){return this.dF(a,b,null)},
d9:function(a,b,c){if(c>a.length)throw H.c(P.ai(c,0,a.length,null,null))
return H.hN(a,b,c)},
i:function(a){return a},
gq:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
return a[b]},
$isH:1,
$asH:I.t,
$isT:1}}],["","",,H,{"^":"",
aP:function(){return new P.a5("No element")},
ej:function(){return new P.a5("Too few elements")},
h:{"^":"G;$ti",$ash:null},
ay:{"^":"h;$ti",
gC:function(a){return new H.cf(this,this.gj(this),0,null)},
a0:function(a,b){return new H.bp(this,b,[H.v(this,"ay",0),null])},
b8:function(a,b){var z,y,x
z=H.q([],[H.v(this,"ay",0)])
C.a.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.E(0,y)
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
b7:function(a){return this.b8(a,!0)}},
cf:{"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.a2(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.E(z,w);++this.c
return!0}},
ci:{"^":"G;a,b,$ti",
gC:function(a){return new H.ey(null,J.bd(this.a),this.b,this.$ti)},
gj:function(a){return J.C(this.a)},
E:function(a,b){return this.b.$1(J.bc(this.a,b))},
$asG:function(a,b){return[b]},
m:{
aV:function(a,b,c,d){if(!!J.m(a).$ish)return new H.c4(a,b,[c,d])
return new H.ci(a,b,[c,d])}}},
c4:{"^":"ci;a,b,$ti",$ish:1,
$ash:function(a,b){return[b]}},
ey:{"^":"ek;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gA())
return!0}this.a=null
return!1},
gA:function(){return this.a}},
bp:{"^":"ay;a,b,$ti",
gj:function(a){return J.C(this.a)},
E:function(a,b){return this.b.$1(J.bc(this.a,b))},
$asay:function(a,b){return[b]},
$ash:function(a,b){return[b]},
$asG:function(a,b){return[b]}},
c9:{"^":"a;$ti",
sj:function(a,b){throw H.c(new P.r("Cannot change the length of a fixed-length list"))},
B:function(a,b){throw H.c(new P.r("Cannot add to a fixed-length list"))},
as:function(a){throw H.c(new P.r("Cannot remove from a fixed-length list"))}}}],["","",,H,{"^":"",
aF:function(a,b){var z=a.a7(b)
if(!init.globalState.d.cy)init.globalState.f.a1()
return z},
dq:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isi)throw H.c(P.aI("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.fT(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cb()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.fs(P.bm(null,H.aE),0)
x=P.j
y.z=new H.I(0,null,null,null,null,null,0,[x,H.bB])
y.ch=new H.I(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.fS()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ec,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.fU)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.I(0,null,null,null,null,null,0,[x,H.aY])
x=P.ah(null,null,null,x)
v=new H.aY(0,null,!1)
u=new H.bB(y,w,x,init.createNewIsolate(),v,new H.a1(H.bb()),new H.a1(H.bb()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
x.B(0,0)
u.bj(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aG()
if(H.ab(y,[y]).V(a))u.a7(new H.hL(z,a))
else if(H.ab(y,[y,y]).V(a))u.a7(new H.hM(z,a))
else u.a7(a)
init.globalState.f.a1()},
eg:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eh()
return},
eh:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.r("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.r('Cannot extract URI from "'+H.b(z)+'"'))},
ec:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b1(!0,[]).W(b.data)
y=J.A(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b1(!0,[]).W(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b1(!0,[]).W(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.j
p=new H.I(0,null,null,null,null,null,0,[q,H.aY])
q=P.ah(null,null,null,q)
o=new H.aY(0,null,!1)
n=new H.bB(y,p,q,init.createNewIsolate(),o,new H.a1(H.bb()),new H.a1(H.bb()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
q.B(0,0)
n.bj(0,o)
init.globalState.f.a.H(new H.aE(n,new H.ed(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.a1()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").U(y.h(z,"msg"))
init.globalState.f.a1()
break
case"close":init.globalState.ch.ac(0,$.$get$cc().h(0,a))
a.terminate()
init.globalState.f.a1()
break
case"log":H.eb(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a4(["command","print","msg",z])
q=new H.a7(!0,P.al(null,P.j)).D(q)
y.toString
self.postMessage(q)}else P.ba(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
eb:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a4(["command","log","msg",a])
x=new H.a7(!0,P.al(null,P.j)).D(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.y(w)
throw H.c(P.aN(z))}},
ee:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cs=$.cs+("_"+y)
$.ct=$.ct+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.U(["spawned",new H.b3(y,x),w,z.r])
x=new H.ef(a,b,c,d,z)
if(e===!0){z.bK(w,w)
init.globalState.f.a.H(new H.aE(z,x,"start isolate"))}else x.$0()},
ha:function(a){return new H.b1(!0,[]).W(new H.a7(!1,P.al(null,P.j)).D(a))},
hL:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hM:{"^":"f:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
fT:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",m:{
fU:function(a){var z=P.a4(["command","print","msg",a])
return new H.a7(!0,P.al(null,P.j)).D(z)}}},
bB:{"^":"a;a,b,c,dA:d<,da:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bK:function(a,b){if(!this.f.p(0,a))return
if(this.Q.B(0,b)&&!this.y)this.y=!0
this.aT()},
dT:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ac(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.d(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.d(v,w)
v[w]=x
if(w===y.c)y.bu();++y.d}this.y=!1}this.aT()},
d3:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.d(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
dS:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.r("removeRange"))
P.cw(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cf:function(a,b){if(!this.r.p(0,a))return
this.db=b},
dl:function(a,b,c){var z=J.m(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){a.U(c)
return}z=this.cx
if(z==null){z=P.bm(null,null)
this.cx=z}z.H(new H.fM(a,c))},
dk:function(a,b){var z
if(!this.r.p(0,a))return
z=J.m(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.aX()
return}z=this.cx
if(z==null){z=P.bm(null,null)
this.cx=z}z.H(this.gdD())},
dm:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ba(a)
if(b!=null)P.ba(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.P(a)
y[1]=b==null?null:J.P(b)
for(x=new P.bC(z,z.r,null,null),x.c=z.e;x.v();)x.d.U(y)},
a7:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.y(u)
this.dm(w,v)
if(this.db===!0){this.aX()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gdA()
if(this.cx!=null)for(;t=this.cx,!t.gR(t);)this.cx.bW().$0()}return y},
bU:function(a){return this.b.h(0,a)},
bj:function(a,b){var z=this.b
if(z.aW(a))throw H.c(P.aN("Registry: ports must be registered only once."))
z.u(0,a,b)},
aT:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.aX()},
aX:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a_(0)
for(z=this.b,y=z.gc3(z),y=y.gC(y);y.v();)y.gA().cF()
z.a_(0)
this.c.a_(0)
init.globalState.z.ac(0,this.a)
this.dx.a_(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.d(z,v)
w.U(z[v])}this.ch=null}},"$0","gdD",0,0,1]},
fM:{"^":"f:1;a,b",
$0:function(){this.a.U(this.b)}},
fs:{"^":"a;a,b",
dc:function(){var z=this.a
if(z.b===z.c)return
return z.bW()},
bZ:function(){var z,y,x
z=this.dc()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aW(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gR(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.aN("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gR(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a4(["command","close"])
x=new H.a7(!0,new P.d0(0,null,null,null,null,null,0,[null,P.j])).D(x)
y.toString
self.postMessage(x)}return!1}z.dQ()
return!0},
bE:function(){if(self.window!=null)new H.ft(this).$0()
else for(;this.bZ(););},
a1:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bE()
else try{this.bE()}catch(x){w=H.B(x)
z=w
y=H.y(x)
w=init.globalState.Q
v=P.a4(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.a7(!0,P.al(null,P.j)).D(v)
w.toString
self.postMessage(v)}}},
ft:{"^":"f:1;a",
$0:function(){if(!this.a.bZ())return
P.f5(C.k,this)}},
aE:{"^":"a;a,b,c",
dQ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.a7(this.b)}},
fS:{"^":"a;"},
ed:{"^":"f:0;a,b,c,d,e,f",
$0:function(){H.ee(this.a,this.b,this.c,this.d,this.e,this.f)}},
ef:{"^":"f:1;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aG()
if(H.ab(x,[x,x]).V(y))y.$2(this.b,this.c)
else if(H.ab(x,[x]).V(y))y.$1(this.b)
else y.$0()}z.aT()}},
cT:{"^":"a;"},
b3:{"^":"cT;b,a",
U:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbx())return
x=H.ha(a)
if(z.gda()===y){y=J.A(x)
switch(y.h(x,0)){case"pause":z.bK(y.h(x,1),y.h(x,2))
break
case"resume":z.dT(y.h(x,1))
break
case"add-ondone":z.d3(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.dS(y.h(x,1))
break
case"set-errors-fatal":z.cf(y.h(x,1),y.h(x,2))
break
case"ping":z.dl(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.dk(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.B(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ac(0,y)
break}return}init.globalState.f.a.H(new H.aE(z,new H.fW(this,x),"receive"))},
p:function(a,b){if(b==null)return!1
return b instanceof H.b3&&J.O(this.b,b.b)},
gq:function(a){return this.b.gaK()}},
fW:{"^":"f:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbx())z.cB(this.b)}},
bE:{"^":"cT;b,c,a",
U:function(a){var z,y,x
z=P.a4(["command","message","port",this,"msg",a])
y=new H.a7(!0,P.al(null,P.j)).D(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.bE&&J.O(this.b,b.b)&&J.O(this.a,b.a)&&J.O(this.c,b.c)},
gq:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cg()
y=this.a
if(typeof y!=="number")return y.cg()
x=this.c
if(typeof x!=="number")return H.N(x)
return(z<<16^y<<8^x)>>>0}},
aY:{"^":"a;aK:a<,b,bx:c<",
cF:function(){this.c=!0
this.b=null},
cB:function(a){if(this.c)return
this.b.$1(a)},
$iseF:1},
f1:{"^":"a;a,b,c",
Z:function(){if(self.setTimeout!=null){if(this.b)throw H.c(new P.r("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
self.clearTimeout(z)
this.c=null}else throw H.c(new P.r("Canceling a timer."))},
cv:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.H(new H.aE(y,new H.f3(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ac(new H.f4(this,b),0),a)}else throw H.c(new P.r("Timer greater than 0."))},
m:{
f2:function(a,b){var z=new H.f1(!0,!1,null)
z.cv(a,b)
return z}}},
f3:{"^":"f:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
f4:{"^":"f:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
a1:{"^":"a;aK:a<",
gq:function(a){var z=this.a
if(typeof z!=="number")return z.dZ()
z=C.h.aS(z,0)^C.h.O(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a1){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a7:{"^":"a;a,b",
D:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isck)return["buffer",a]
if(!!z.$isbs)return["typed",a]
if(!!z.$isH)return this.cb(a)
if(!!z.$isea){x=this.gc8()
w=a.gbT()
w=H.aV(w,x,H.v(w,"G",0),null)
w=P.bn(w,!0,H.v(w,"G",0))
z=z.gc3(a)
z=H.aV(z,x,H.v(z,"G",0),null)
return["map",w,P.bn(z,!0,H.v(z,"G",0))]}if(!!z.$iseo)return this.cc(a)
if(!!z.$ise)this.c1(a)
if(!!z.$iseF)this.ad(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb3)return this.cd(a)
if(!!z.$isbE)return this.ce(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.ad(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa1)return["capability",a.a]
if(!(a instanceof P.a))this.c1(a)
return["dart",init.classIdExtractor(a),this.ca(init.classFieldsExtractor(a))]},"$1","gc8",2,0,2],
ad:function(a,b){throw H.c(new P.r(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
c1:function(a){return this.ad(a,null)},
cb:function(a){var z=this.c9(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ad(a,"Can't serialize indexable: ")},
c9:function(a){var z,y,x
z=[]
C.a.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.D(a[y])
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
ca:function(a){var z
for(z=0;z<a.length;++z)C.a.u(a,z,this.D(a[z]))
return a},
cc:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ad(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.D(a[z[x]])
if(x>=y.length)return H.d(y,x)
y[x]=w}return["js-object",z,y]},
ce:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cd:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaK()]
return["raw sendport",a]}},
b1:{"^":"a;a,b",
W:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aI("Bad serialized message: "+H.b(a)))
switch(C.a.gI(a)){case"ref":if(1>=a.length)return H.d(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.d(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
y=H.q(this.a6(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return H.q(this.a6(x),[null])
case"mutable":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return this.a6(x)
case"const":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
y=H.q(this.a6(x),[null])
y.fixed$length=Array
return y
case"map":return this.df(a)
case"sendport":return this.dg(a)
case"raw sendport":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.de(a)
case"function":if(1>=a.length)return H.d(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.d(a,1)
return new H.a1(a[1])
case"dart":y=a.length
if(1>=y)return H.d(a,1)
w=a[1]
if(2>=y)return H.d(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.a6(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gdd",2,0,2],
a6:function(a){var z,y,x
z=J.A(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.N(x)
if(!(y<x))break
z.u(a,y,this.W(z.h(a,y)));++y}return a},
df:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
w=P.ev()
this.b.push(w)
y=J.dC(y,this.gdd()).b7(0)
for(z=J.A(y),v=J.A(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.d(y,u)
w.u(0,y[u],this.W(v.h(x,u)))}return w},
dg:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
if(3>=z)return H.d(a,3)
w=a[3]
if(J.O(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bU(w)
if(u==null)return
t=new H.b3(u,x)}else t=new H.bE(y,w,x)
this.b.push(t)
return t},
de:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.A(y)
v=J.A(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.N(t)
if(!(u<t))break
w[z.h(y,u)]=this.W(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
dN:function(){throw H.c(new P.r("Cannot modify unmodifiable Map"))},
dm:function(a){return init.getTypeFromName(a)},
hs:function(a){return init.types[a]},
dk:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isW},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.P(a)
if(typeof z!=="string")throw H.c(H.L(a))
return z},
R:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cr:function(a,b){throw H.c(new P.dX(a,null,null))},
eD:function(a,b,c){var z,y
H.ho(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.cr(a,c)
if(3>=z.length)return H.d(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.cr(a,c)},
cu:function(a){var z,y,x,w,v,u,t,s
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.w||!!J.m(a).$isb0){v=C.m(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.d.d7(w,0)===36)w=C.d.be(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dl(H.bL(a),0,null),init.mangledGlobalNames)},
aW:function(a){return"Instance of '"+H.cu(a)+"'"},
x:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bt:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.L(a))
return a[b]},
cv:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.L(a))
a[b]=c},
N:function(a){throw H.c(H.L(a))},
d:function(a,b){if(a==null)J.C(a)
throw H.c(H.o(a,b))},
o:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a0(!0,b,"index",null)
z=J.C(a)
if(!(b<0)){if(typeof z!=="number")return H.N(z)
y=b>=z}else y=!0
if(y)return P.au(b,a,"index",null,z)
return P.aX(b,"index",null)},
L:function(a){return new P.a0(!0,a,null,null)},
ho:function(a){if(typeof a!=="string")throw H.c(H.L(a))
return a},
c:function(a){var z
if(a==null)a=new P.cq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dt})
z.name=""}else z.toString=H.dt
return z},
dt:function(){return J.P(this.dartException)},
p:function(a){throw H.c(a)},
ds:function(a){throw H.c(new P.a2(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hP(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aS(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bk(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cp(v,null))}}if(a instanceof TypeError){u=$.$get$cG()
t=$.$get$cH()
s=$.$get$cI()
r=$.$get$cJ()
q=$.$get$cN()
p=$.$get$cO()
o=$.$get$cL()
$.$get$cK()
n=$.$get$cQ()
m=$.$get$cP()
l=u.G(y)
if(l!=null)return z.$1(H.bk(y,l))
else{l=t.G(y)
if(l!=null){l.method="call"
return z.$1(H.bk(y,l))}else{l=s.G(y)
if(l==null){l=r.G(y)
if(l==null){l=q.G(y)
if(l==null){l=p.G(y)
if(l==null){l=o.G(y)
if(l==null){l=r.G(y)
if(l==null){l=n.G(y)
if(l==null){l=m.G(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cp(y,l==null?null:l.method))}}return z.$1(new H.f8(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cA()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a0(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cA()
return a},
y:function(a){var z
if(a==null)return new H.d1(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d1(a,null)},
hI:function(a){if(a==null||typeof a!='object')return J.E(a)
else return H.R(a)},
dg:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
hz:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aF(b,new H.hA(a))
case 1:return H.aF(b,new H.hB(a,d))
case 2:return H.aF(b,new H.hC(a,d,e))
case 3:return H.aF(b,new H.hD(a,d,e,f))
case 4:return H.aF(b,new H.hE(a,d,e,f,g))}throw H.c(P.aN("Unsupported number of arguments for wrapped closure"))},
ac:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hz)
a.$identity=z
return z},
dL:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isi){z.$reflectionInfo=c
x=H.eH(z).r}else x=c
w=d?Object.create(new H.eV().constructor.prototype):Object.create(new H.be(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.F
$.F=J.ar(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bY(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.hs,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bX:H.bf
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bY(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
dI:function(a,b,c,d){var z=H.bf
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bY:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dK(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dI(y,!w,z,b)
if(y===0){w=$.F
$.F=J.ar(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.af
if(v==null){v=H.aK("self")
$.af=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.F
$.F=J.ar(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.af
if(v==null){v=H.aK("self")
$.af=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
dJ:function(a,b,c,d){var z,y
z=H.bf
y=H.bX
switch(b?-1:a){case 0:throw H.c(new H.eI("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dK:function(a,b){var z,y,x,w,v,u,t,s
z=H.dH()
y=$.bW
if(y==null){y=H.aK("receiver")
$.bW=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dJ(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.F
$.F=J.ar(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.F
$.F=J.ar(u,1)
return new Function(y+H.b(u)+"}")()},
bI:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.dL(a,b,z,!!d,e,f)},
hO:function(a){throw H.c(new P.dO(a))},
hq:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ab:function(a,b,c){return new H.eJ(a,b,c,null)},
de:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.eL(z)
return new H.eK(z,b,null)},
aG:function(){return C.r},
bb:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
dh:function(a){return init.getIsolateTag(a)},
q:function(a,b){a.$ti=b
return a},
bL:function(a){if(a==null)return
return a.$ti},
di:function(a,b){return H.dr(a["$as"+H.b(b)],H.bL(a))},
v:function(a,b,c){var z=H.di(a,b)
return z==null?null:z[c]},
ad:function(a,b){var z=H.bL(a)
return z==null?null:z[b]},
ae:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dl(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.ae(z,b)
return H.hb(a,b)}return"unknown-reified-type"},
hb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.ae(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.ae(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.ae(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.bJ(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.ae(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bw("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.w=v+", "
u=a[y]
if(u!=null)w=!1
v=z.w+=H.ae(u,c)}return w?"":"<"+z.i(0)+">"},
dr:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
hi:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.z(a[y],b[y]))return!1
return!0},
b4:function(a,b,c){return a.apply(b,H.di(b,c))},
z:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="eA")return!0
if('func' in b)return H.dj(a,b)
if('func' in a)return b.builtin$cls==="bh"||b.builtin$cls==="a"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.ae(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hi(H.dr(u,z),x)},
db:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.z(z,v)||H.z(v,z)))return!1}return!0},
hh:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.z(v,u)||H.z(u,v)))return!1}return!0},
dj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.z(z,y)||H.z(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.db(x,w,!1))return!1
if(!H.db(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.z(o,n)||H.z(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.z(o,n)||H.z(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.z(o,n)||H.z(n,o)))return!1}}return H.hh(a.named,b.named)},
jm:function(a){var z=$.bM
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jk:function(a){return H.R(a)},
jj:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hF:function(a){var z,y,x,w,v,u
z=$.bM.$1(a)
y=$.b5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.da.$2(a,z)
if(z!=null){y=$.b5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bP(x)
$.b5[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b8[z]=x
return x}if(v==="-"){u=H.bP(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dn(a,x)
if(v==="*")throw H.c(new P.cR(z))
if(init.leafTags[z]===true){u=H.bP(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dn(a,x)},
dn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b9(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bP:function(a){return J.b9(a,!1,null,!!a.$isW)},
hH:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b9(z,!1,null,!!z.$isW)
else return J.b9(z,c,null,null)},
hx:function(){if(!0===$.bN)return
$.bN=!0
H.hy()},
hy:function(){var z,y,x,w,v,u,t,s
$.b5=Object.create(null)
$.b8=Object.create(null)
H.ht()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dp.$1(v)
if(u!=null){t=H.hH(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ht:function(){var z,y,x,w,v,u,t
z=C.A()
z=H.aa(C.x,H.aa(C.C,H.aa(C.l,H.aa(C.l,H.aa(C.B,H.aa(C.y,H.aa(C.z(C.m),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bM=new H.hu(v)
$.da=new H.hv(u)
$.dp=new H.hw(t)},
aa:function(a,b){return a(b)||b},
hN:function(a,b,c){return a.indexOf(b,c)>=0},
dM:{"^":"a;",
i:function(a){return P.cj(this)},
u:function(a,b,c){return H.dN()}},
e0:{"^":"dM;a,$ti",
aJ:function(){var z=this.$map
if(z==null){z=new H.I(0,null,null,null,null,null,0,this.$ti)
H.dg(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aJ().h(0,b)},
F:function(a,b){this.aJ().F(0,b)},
gj:function(a){var z=this.aJ()
return z.gj(z)}},
eG:{"^":"a;a,b,c,d,e,f,r,x",m:{
eH:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.eG(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
f6:{"^":"a;a,b,c,d,e,f",
G:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
m:{
K:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.f6(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
b_:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cM:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cp:{"^":"w;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eq:{"^":"w;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
m:{
bk:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eq(a,y,z?null:b.receiver)}}},
f8:{"^":"w;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hP:{"^":"f:2;a",
$1:function(a){if(!!J.m(a).$isw)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d1:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hA:{"^":"f:0;a",
$0:function(){return this.a.$0()}},
hB:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hC:{"^":"f:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hD:{"^":"f:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hE:{"^":"f:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"a;",
i:function(a){return"Closure '"+H.cu(this)+"'"},
gc4:function(){return this},
$isbh:1,
gc4:function(){return this}},
cD:{"^":"f;"},
eV:{"^":"cD;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
be:{"^":"cD;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.be))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gq:function(a){var z,y
z=this.c
if(z==null)y=H.R(this.a)
else y=typeof z!=="object"?J.E(z):H.R(z)
z=H.R(this.b)
if(typeof y!=="number")return y.e_()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aW(z)},
m:{
bf:function(a){return a.a},
bX:function(a){return a.c},
dH:function(){var z=$.af
if(z==null){z=H.aK("self")
$.af=z}return z},
aK:function(a){var z,y,x,w,v
z=new H.be("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eI:{"^":"w;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
aZ:{"^":"a;"},
eJ:{"^":"aZ;a,b,c,d",
V:function(a){var z=H.hq(a)
return z==null?!1:H.dj(z,this.L())},
L:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isj3)z.v=true
else if(!x.$isc3)z.ret=y.L()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cx(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cx(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.bJ(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].L()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.bJ(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].L())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
m:{
cx:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].L())
return z}}},
c3:{"^":"aZ;",
i:function(a){return"dynamic"},
L:function(){return}},
eL:{"^":"aZ;a",
L:function(){var z,y
z=this.a
y=H.dm(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
eK:{"^":"aZ;a,b,c",
L:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.dm(z)]
if(0>=y.length)return H.d(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.ds)(z),++w)y.push(z[w].L())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.a).dB(z,", ")+">"}},
I:{"^":"a;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
gR:function(a){return this.a===0},
gbT:function(){return new H.es(this,[H.ad(this,0)])},
gc3:function(a){return H.aV(this.gbT(),new H.ep(this),H.ad(this,0),H.ad(this,1))},
aW:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bo(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bo(y,a)}else return this.dv(a)},
dv:function(a){var z=this.d
if(z==null)return!1
return this.a9(this.ah(z,this.a8(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a4(z,b)
return y==null?null:y.gX()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a4(x,b)
return y==null?null:y.gX()}else return this.dw(b)},
dw:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ah(z,this.a8(a))
x=this.a9(y,a)
if(x<0)return
return y[x].gX()},
u:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aM()
this.b=z}this.bi(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aM()
this.c=y}this.bi(y,b,c)}else{x=this.d
if(x==null){x=this.aM()
this.d=x}w=this.a8(b)
v=this.ah(x,w)
if(v==null)this.aR(x,w,[this.aN(b,c)])
else{u=this.a9(v,b)
if(u>=0)v[u].sX(c)
else v.push(this.aN(b,c))}}},
dR:function(a,b){var z
if(this.aW(a))return this.h(0,a)
z=b.$0()
this.u(0,a,z)
return z},
ac:function(a,b){if(typeof b==="string")return this.bB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bB(this.c,b)
else return this.dz(b)},
dz:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ah(z,this.a8(a))
x=this.a9(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bI(w)
return w.gX()},
a_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.a2(this))
z=z.c}},
bi:function(a,b,c){var z=this.a4(a,b)
if(z==null)this.aR(a,b,this.aN(b,c))
else z.sX(c)},
bB:function(a,b){var z
if(a==null)return
z=this.a4(a,b)
if(z==null)return
this.bI(z)
this.bp(a,b)
return z.gX()},
aN:function(a,b){var z,y
z=new H.er(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bI:function(a){var z,y
z=a.gcS()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
a8:function(a){return J.E(a)&0x3ffffff},
a9:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.O(a[y].gbR(),b))return y
return-1},
i:function(a){return P.cj(this)},
a4:function(a,b){return a[b]},
ah:function(a,b){return a[b]},
aR:function(a,b,c){a[b]=c},
bp:function(a,b){delete a[b]},
bo:function(a,b){return this.a4(a,b)!=null},
aM:function(){var z=Object.create(null)
this.aR(z,"<non-identifier-key>",z)
this.bp(z,"<non-identifier-key>")
return z},
$isea:1},
ep:{"^":"f:2;a",
$1:function(a){return this.a.h(0,a)}},
er:{"^":"a;bR:a<,X:b@,c,cS:d<"},
es:{"^":"h;a,$ti",
gj:function(a){return this.a.a},
gC:function(a){var z,y
z=this.a
y=new H.et(z,z.r,null,null)
y.c=z.e
return y}},
et:{"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.a2(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hu:{"^":"f:2;a",
$1:function(a){return this.a(a)}},
hv:{"^":"f:6;a",
$2:function(a,b){return this.a(a,b)}},
hw:{"^":"f:7;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
bJ:function(a){var z=H.q(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
hJ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",ck:{"^":"e;",$isck:1,"%":"ArrayBuffer"},bs:{"^":"e;",$isbs:1,"%":"DataView;ArrayBufferView;bq|cl|cn|br|cm|co|X"},bq:{"^":"bs;",
gj:function(a){return a.length},
$isW:1,
$asW:I.t,
$isH:1,
$asH:I.t},br:{"^":"cn;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c}},cl:{"^":"bq+bl;",$asW:I.t,$asH:I.t,
$asi:function(){return[P.M]},
$ash:function(){return[P.M]},
$isi:1,
$ish:1},cn:{"^":"cl+c9;",$asW:I.t,$asH:I.t,
$asi:function(){return[P.M]},
$ash:function(){return[P.M]}},X:{"^":"co;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]}},cm:{"^":"bq+bl;",$asW:I.t,$asH:I.t,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]},
$isi:1,
$ish:1},co:{"^":"cm+c9;",$asW:I.t,$asH:I.t,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]}},iD:{"^":"br;",$isi:1,
$asi:function(){return[P.M]},
$ish:1,
$ash:function(){return[P.M]},
"%":"Float32Array"},iE:{"^":"br;",$isi:1,
$asi:function(){return[P.M]},
$ish:1,
$ash:function(){return[P.M]},
"%":"Float64Array"},iF:{"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int16Array"},iG:{"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int32Array"},iH:{"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int8Array"},iI:{"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint16Array"},iJ:{"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint32Array"},iK:{"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"CanvasPixelArray|Uint8ClampedArray"},iL:{"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
fe:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hj()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ac(new P.fg(z),1)).observe(y,{childList:true})
return new P.ff(z,y,x)}else if(self.setImmediate!=null)return P.hk()
return P.hl()},
j4:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ac(new P.fh(a),0))},"$1","hj",2,0,3],
j5:[function(a){++init.globalState.f.b
self.setImmediate(H.ac(new P.fi(a),0))},"$1","hk",2,0,3],
j6:[function(a){P.bx(C.k,a)},"$1","hl",2,0,3],
d3:function(a,b){var z=H.aG()
if(H.ab(z,[z,z]).V(a)){b.toString
return a}else{b.toString
return a}},
hd:function(){var z,y
for(;z=$.a8,z!=null;){$.an=null
y=z.b
$.a8=y
if(y==null)$.am=null
z.a.$0()}},
ji:[function(){$.bF=!0
try{P.hd()}finally{$.an=null
$.bF=!1
if($.a8!=null)$.$get$by().$1(P.dd())}},"$0","dd",0,0,1],
d9:function(a){var z=new P.cS(a,null)
if($.a8==null){$.am=z
$.a8=z
if(!$.bF)$.$get$by().$1(P.dd())}else{$.am.b=z
$.am=z}},
hg:function(a){var z,y,x
z=$.a8
if(z==null){P.d9(a)
$.an=$.am
return}y=new P.cS(a,null)
x=$.an
if(x==null){y.b=z
$.an=y
$.a8=y}else{y.b=x.b
x.b=y
$.an=y
if(y.b==null)$.am=y}},
bQ:function(a){var z=$.k
if(C.c===z){P.a9(null,null,C.c,a)
return}z.toString
P.a9(null,null,z,z.aU(a,!0))},
d8:function(a){return},
he:[function(a,b){var z=$.k
z.toString
P.ao(null,null,z,a,b)},function(a){return P.he(a,null)},"$2","$1","hm",2,2,4,0],
jh:[function(){},"$0","dc",0,0,1],
h8:function(a,b,c){var z=a.Z()
if(!!J.m(z).$isV&&z!==$.$get$ag())z.bb(new P.h9(b,c))
else b.a3(c)},
h7:function(a,b,c){$.k.toString
a.aw(b,c)},
f5:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bx(a,b)}return P.bx(a,z.aU(b,!0))},
bx:function(a,b){var z=C.b.O(a.a,1000)
return H.f2(z<0?0:z,b)},
fd:function(){return $.k},
ao:function(a,b,c,d,e){var z={}
z.a=d
P.hg(new P.hf(z,e))},
d5:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
d7:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
d6:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
a9:function(a,b,c,d){var z=C.c!==c
if(z)d=c.aU(d,!(!z||!1))
P.d9(d)},
fg:{"^":"f:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ff:{"^":"f:8;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fh:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
fi:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
fj:{"^":"cV;a,$ti"},
fk:{"^":"fn;y,cR:z<,Q,x,a,b,c,d,e,f,r,$ti",
ak:[function(){},"$0","gaj",0,0,1],
am:[function(){},"$0","gal",0,0,1]},
cU:{"^":"a;Y:c<,$ti",
gai:function(){return this.c<4},
bC:function(a){var z,y
z=a.Q
y=a.z
if(z==null)this.d=y
else z.z=y
if(y==null)this.e=z
else y.Q=z
a.Q=a
a.z=a},
d0:function(a,b,c,d){var z,y,x,w
if((this.c&4)!==0){if(c==null)c=P.dc()
z=new P.fr($.k,0,c)
z.bF()
return z}z=$.k
y=d?1:0
x=new P.fk(0,null,null,this,null,null,null,z,y,null,null,this.$ti)
x.bh(a,b,c,d,H.ad(this,0))
x.Q=x
x.z=x
x.y=this.c&1
w=this.e
this.e=x
x.z=null
x.Q=w
if(w==null)this.d=x
else w.z=x
if(this.d===x)P.d8(this.a)
return x},
cT:function(a){var z
if(a.gcR()===a)return
z=a.y
if((z&2)!==0)a.y=z|4
else{this.bC(a)
if((this.c&2)===0&&this.d==null)this.aA()}return},
cU:function(a){},
cV:function(a){},
ax:["cm",function(){if((this.c&4)!==0)return new P.a5("Cannot add new events after calling close")
return new P.a5("Cannot add new events while doing an addStream")}],
B:function(a,b){if(!this.gai())throw H.c(this.ax())
this.a5(b)},
cK:function(a){var z,y,x,w
z=this.c
if((z&2)!==0)throw H.c(new P.a5("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.y
if((z&1)===x){y.y=z|2
a.$1(y)
z=y.y^=1
w=y.z
if((z&4)!==0)this.bC(y)
y.y&=4294967293
y=w}else y=y.z}this.c&=4294967293
if(this.d==null)this.aA()},
aA:function(){if((this.c&4)!==0&&this.r.a===0)this.r.bk(null)
P.d8(this.b)}},
d2:{"^":"cU;a,b,c,d,e,f,r,$ti",
gai:function(){return P.cU.prototype.gai.call(this)&&(this.c&2)===0},
ax:function(){if((this.c&2)!==0)return new P.a5("Cannot fire new event. Controller is already firing an event")
return this.cm()},
a5:function(a){var z,y
z=this.d
if(z==null)return
y=this.e
if(z==null?y==null:z===y){this.c|=2
z.a2(a)
this.c&=4294967293
if(this.d==null)this.aA()
return}this.cK(new P.h4(this,a))}},
h4:{"^":"f;a,b",
$1:function(a){a.a2(this.b)},
$signature:function(){return H.b4(function(a){return{func:1,args:[[P.ak,a]]}},this.a,"d2")}},
V:{"^":"a;$ti"},
cY:{"^":"a;aO:a<,b,c,d,e",
gd2:function(){return this.b.b},
gbQ:function(){return(this.c&1)!==0},
gdr:function(){return(this.c&2)!==0},
gbP:function(){return this.c===8},
dn:function(a){return this.b.b.b4(this.d,a)},
dK:function(a){if(this.c!==6)return!0
return this.b.b.b4(this.d,J.as(a))},
dj:function(a){var z,y,x,w
z=this.e
y=H.aG()
x=J.u(a)
w=this.b.b
if(H.ab(y,[y,y]).V(z))return w.dW(z,x.gP(a),a.gN())
else return w.b4(z,x.gP(a))},
dq:function(){return this.b.b.bY(this.d)}},
Z:{"^":"a;Y:a<,b,cY:c<,$ti",
gcP:function(){return this.a===2},
gaL:function(){return this.a>=4},
c_:function(a,b){var z,y
z=$.k
if(z!==C.c){z.toString
if(b!=null)b=P.d3(b,z)}y=new P.Z(0,z,null,[null])
this.ay(new P.cY(null,y,b==null?1:3,a,b))
return y},
dY:function(a){return this.c_(a,null)},
bb:function(a){var z,y
z=$.k
y=new P.Z(0,z,null,this.$ti)
if(z!==C.c)z.toString
this.ay(new P.cY(null,y,8,a,null))
return y},
ay:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gaL()){y.ay(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.a9(null,null,z,new P.fz(this,a))}},
bz:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gaO()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gaL()){v.bz(a)
return}this.a=v.a
this.c=v.c}z.a=this.ao(a)
y=this.b
y.toString
P.a9(null,null,y,new P.fG(z,this))}},
an:function(){var z=this.c
this.c=null
return this.ao(z)},
ao:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gaO()
z.a=y}return y},
a3:function(a){var z
if(!!J.m(a).$isV)P.b2(a,this)
else{z=this.an()
this.a=4
this.c=a
P.a6(this,z)}},
aF:[function(a,b){var z=this.an()
this.a=8
this.c=new P.aJ(a,b)
P.a6(this,z)},function(a){return this.aF(a,null)},"cH","$2","$1","gaE",2,2,4,0],
bk:function(a){var z
if(!!J.m(a).$isV){if(a.a===8){this.a=1
z=this.b
z.toString
P.a9(null,null,z,new P.fA(this,a))}else P.b2(a,this)
return}this.a=1
z=this.b
z.toString
P.a9(null,null,z,new P.fB(this,a))},
cA:function(a,b){this.bk(a)},
$isV:1,
m:{
fC:function(a,b){var z,y,x,w
b.a=1
try{a.c_(new P.fD(b),new P.fE(b))}catch(x){w=H.B(x)
z=w
y=H.y(x)
P.bQ(new P.fF(b,z,y))}},
b2:function(a,b){var z,y,x
for(;a.gcP();)a=a.c
z=a.gaL()
y=b.c
if(z){b.c=null
x=b.ao(y)
b.a=a.a
b.c=a.c
P.a6(b,x)}else{b.a=2
b.c=a
a.bz(y)}},
a6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.as(v)
x=v.gN()
z.toString
P.ao(null,null,z,y,x)}return}for(;b.gaO()!=null;b=u){u=b.a
b.a=null
P.a6(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gbQ()||b.gbP()){s=b.gd2()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.as(v)
r=v.gN()
y.toString
P.ao(null,null,y,x,r)
return}q=$.k
if(q==null?s!=null:q!==s)$.k=s
else q=null
if(b.gbP())new P.fJ(z,x,w,b).$0()
else if(y){if(b.gbQ())new P.fI(x,b,t).$0()}else if(b.gdr())new P.fH(z,x,b).$0()
if(q!=null)$.k=q
y=x.b
r=J.m(y)
if(!!r.$isV){p=b.b
if(!!r.$isZ)if(y.a>=4){o=p.c
p.c=null
b=p.ao(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.b2(y,p)
else P.fC(y,p)
return}}p=b.b
b=p.an()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
fz:{"^":"f:0;a,b",
$0:function(){P.a6(this.a,this.b)}},
fG:{"^":"f:0;a,b",
$0:function(){P.a6(this.b,this.a.a)}},
fD:{"^":"f:2;a",
$1:function(a){var z=this.a
z.a=0
z.a3(a)}},
fE:{"^":"f:9;a",
$2:function(a,b){this.a.aF(a,b)},
$1:function(a){return this.$2(a,null)}},
fF:{"^":"f:0;a,b,c",
$0:function(){this.a.aF(this.b,this.c)}},
fA:{"^":"f:0;a,b",
$0:function(){P.b2(this.b,this.a)}},
fB:{"^":"f:0;a,b",
$0:function(){var z,y
z=this.a
y=z.an()
z.a=4
z.c=this.b
P.a6(z,y)}},
fJ:{"^":"f:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.dq()}catch(w){v=H.B(w)
y=v
x=H.y(w)
if(this.c){v=J.as(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.aJ(y,x)
u.a=!0
return}if(!!J.m(z).$isV){if(z instanceof P.Z&&z.gY()>=4){if(z.gY()===8){v=this.b
v.b=z.gcY()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.dY(new P.fK(t))
v.a=!1}}},
fK:{"^":"f:2;a",
$1:function(a){return this.a}},
fI:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.dn(this.c)}catch(x){w=H.B(x)
z=w
y=H.y(x)
w=this.a
w.b=new P.aJ(z,y)
w.a=!0}}},
fH:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.dK(z)===!0&&w.e!=null){v=this.b
v.b=w.dj(z)
v.a=!1}}catch(u){w=H.B(u)
y=w
x=H.y(u)
w=this.a
v=J.as(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.aJ(y,x)
s.a=!0}}},
cS:{"^":"a;a,b"},
S:{"^":"a;$ti",
a0:function(a,b){return new P.fV(b,this,[H.v(this,"S",0),null])},
gj:function(a){var z,y
z={}
y=new P.Z(0,$.k,null,[P.j])
z.a=0
this.K(new P.eY(z),!0,new P.eZ(z,y),y.gaE())
return y},
b7:function(a){var z,y,x
z=H.v(this,"S",0)
y=H.q([],[z])
x=new P.Z(0,$.k,null,[[P.i,z]])
this.K(new P.f_(this,y),!0,new P.f0(y,x),x.gaE())
return x},
E:function(a,b){var z,y
z={}
y=new P.Z(0,$.k,null,[H.v(this,"S",0)])
z.a=null
z.b=0
z.a=this.K(new P.eW(z,this,b,y),!0,new P.eX(z,this,b,y),y.gaE())
return y}},
eY:{"^":"f:2;a",
$1:function(a){++this.a.a}},
eZ:{"^":"f:0;a,b",
$0:function(){this.b.a3(this.a.a)}},
f_:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b4(function(a){return{func:1,args:[a]}},this.a,"S")}},
f0:{"^":"f:0;a,b",
$0:function(){this.b.a3(this.a)}},
eW:{"^":"f;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=z.b
if(this.c===y){P.h8(z.a,this.d,a)
return}z.b=y+1},
$signature:function(){return H.b4(function(a){return{func:1,args:[a]}},this.b,"S")}},
eX:{"^":"f:0;a,b,c,d",
$0:function(){this.d.cH(P.au(this.c,this.b,"index",null,this.a.b))}},
cB:{"^":"a;"},
cV:{"^":"h2;a,$ti",
gq:function(a){return(H.R(this.a)^892482866)>>>0},
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cV))return!1
return b.a===this.a}},
fn:{"^":"ak;$ti",
aP:function(){return this.x.cT(this)},
ak:[function(){this.x.cU(this)},"$0","gaj",0,0,1],
am:[function(){this.x.cV(this)},"$0","gal",0,0,1]},
fu:{"^":"a;"},
ak:{"^":"a;Y:e<,$ti",
ab:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bL()
if((z&4)===0&&(this.e&32)===0)this.bv(this.gaj())},
b0:function(a){return this.ab(a,null)},
b2:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gR(z)}else z=!1
if(z)this.r.at(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bv(this.gal())}}}},
Z:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.aB()
z=this.f
return z==null?$.$get$ag():z},
aB:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bL()
if((this.e&32)===0)this.r=null
this.f=this.aP()},
a2:["cn",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.a5(a)
else this.az(new P.fo(a,null,[H.v(this,"ak",0)]))}],
aw:["co",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bG(a,b)
else this.az(new P.fq(a,b,null))}],
cD:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.aQ()
else this.az(C.u)},
ak:[function(){},"$0","gaj",0,0,1],
am:[function(){},"$0","gal",0,0,1],
aP:function(){return},
az:function(a){var z,y
z=this.r
if(z==null){z=new P.h3(null,null,0,[H.v(this,"ak",0)])
this.r=z}z.B(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.at(this)}},
a5:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.b5(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aC((z&4)!==0)},
bG:function(a,b){var z,y,x
z=this.e
y=new P.fm(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aB()
z=this.f
if(!!J.m(z).$isV){x=$.$get$ag()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.bb(y)
else y.$0()}else{y.$0()
this.aC((z&4)!==0)}},
aQ:function(){var z,y,x
z=new P.fl(this)
this.aB()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isV){x=$.$get$ag()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.bb(z)
else z.$0()},
bv:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aC((z&4)!==0)},
aC:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gR(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gR(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ak()
else this.am()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.at(this)},
bh:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.d3(b==null?P.hm():b,z)
this.c=c==null?P.dc():c},
$isfu:1},
fm:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ab(H.aG(),[H.de(P.a),H.de(P.aD)]).V(y)
w=z.d
v=this.b
u=z.b
if(x)w.dX(u,v,this.c)
else w.b5(u,v)
z.e=(z.e&4294967263)>>>0}},
fl:{"^":"f:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.b3(z.c)
z.e=(z.e&4294967263)>>>0}},
h2:{"^":"S;$ti",
K:function(a,b,c,d){return this.a.d0(a,d,c,!0===b)},
dG:function(a){return this.K(a,null,null,null)},
aZ:function(a,b,c){return this.K(a,null,b,c)}},
cW:{"^":"a;aq:a@"},
fo:{"^":"cW;b,a,$ti",
b1:function(a){a.a5(this.b)}},
fq:{"^":"cW;P:b>,N:c<,a",
b1:function(a){a.bG(this.b,this.c)}},
fp:{"^":"a;",
b1:function(a){a.aQ()},
gaq:function(){return},
saq:function(a){throw H.c(new P.a5("No events after a done."))}},
fX:{"^":"a;Y:a<",
at:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.bQ(new P.fY(this,a))
this.a=1},
bL:function(){if(this.a===1)this.a=3}},
fY:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaq()
z.b=w
if(w==null)z.c=null
x.b1(this.b)}},
h3:{"^":"fX;b,c,a,$ti",
gR:function(a){return this.c==null},
B:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saq(b)
this.c=b}}},
fr:{"^":"a;a,Y:b<,c",
bF:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.a9(null,null,z,this.gcZ())
this.b=(this.b|2)>>>0},
ab:function(a,b){this.b+=4},
b0:function(a){return this.ab(a,null)},
b2:function(){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.bF()}},
Z:function(){return $.$get$ag()},
aQ:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.b3(this.c)},"$0","gcZ",0,0,1]},
h9:{"^":"f:0;a,b",
$0:function(){return this.a.a3(this.b)}},
bA:{"^":"S;$ti",
K:function(a,b,c,d){return this.cJ(a,d,c,!0===b)},
aZ:function(a,b,c){return this.K(a,null,b,c)},
cJ:function(a,b,c,d){return P.fy(this,a,b,c,d,H.v(this,"bA",0),H.v(this,"bA",1))},
bw:function(a,b){b.a2(a)},
cO:function(a,b,c){c.aw(a,b)},
$asS:function(a,b){return[b]}},
cX:{"^":"ak;x,y,a,b,c,d,e,f,r,$ti",
a2:function(a){if((this.e&2)!==0)return
this.cn(a)},
aw:function(a,b){if((this.e&2)!==0)return
this.co(a,b)},
ak:[function(){var z=this.y
if(z==null)return
z.b0(0)},"$0","gaj",0,0,1],
am:[function(){var z=this.y
if(z==null)return
z.b2()},"$0","gal",0,0,1],
aP:function(){var z=this.y
if(z!=null){this.y=null
return z.Z()}return},
e1:[function(a){this.x.bw(a,this)},"$1","gcL",2,0,function(){return H.b4(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"cX")}],
e3:[function(a,b){this.x.cO(a,b,this)},"$2","gcN",4,0,10],
e2:[function(){this.cD()},"$0","gcM",0,0,1],
cz:function(a,b,c,d,e,f,g){this.y=this.x.a.aZ(this.gcL(),this.gcM(),this.gcN())},
$asak:function(a,b){return[b]},
m:{
fy:function(a,b,c,d,e,f,g){var z,y
z=$.k
y=e?1:0
y=new P.cX(a,null,null,null,null,z,y,null,null,[f,g])
y.bh(b,c,d,e,g)
y.cz(a,b,c,d,e,f,g)
return y}}},
fV:{"^":"bA;b,a,$ti",
bw:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.B(w)
y=v
x=H.y(w)
P.h7(b,y,x)
return}b.a2(z)}},
aJ:{"^":"a;P:a>,N:b<",
i:function(a){return H.b(this.a)},
$isw:1},
h6:{"^":"a;"},
hf:{"^":"f:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cq()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.P(y)
throw x}},
fZ:{"^":"h6;",
b3:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.d5(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.ao(null,null,this,z,y)}},
b5:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.d7(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.ao(null,null,this,z,y)}},
dX:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.d6(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.ao(null,null,this,z,y)}},
aU:function(a,b){if(b)return new P.h_(this,a)
else return new P.h0(this,a)},
d4:function(a,b){return new P.h1(this,a)},
h:function(a,b){return},
bY:function(a){if($.k===C.c)return a.$0()
return P.d5(null,null,this,a)},
b4:function(a,b){if($.k===C.c)return a.$1(b)
return P.d7(null,null,this,a,b)},
dW:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.d6(null,null,this,a,b,c)}},
h_:{"^":"f:0;a,b",
$0:function(){return this.a.b3(this.b)}},
h0:{"^":"f:0;a,b",
$0:function(){return this.a.bY(this.b)}},
h1:{"^":"f:2;a,b",
$1:function(a){return this.a.b5(this.b,a)}}}],["","",,P,{"^":"",
eu:function(a,b){return new H.I(0,null,null,null,null,null,0,[a,b])},
ev:function(){return new H.I(0,null,null,null,null,null,0,[null,null])},
a4:function(a){return H.dg(a,new H.I(0,null,null,null,null,null,0,[null,null]))},
ei:function(a,b,c){var z,y
if(P.bG(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ap()
y.push(a)
try{P.hc(a,z)}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=P.cC(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aO:function(a,b,c){var z,y,x
if(P.bG(a))return b+"..."+c
z=new P.bw(b)
y=$.$get$ap()
y.push(a)
try{x=z
x.w=P.cC(x.gw(),a,", ")}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
bG:function(a){var z,y
for(z=0;y=$.$get$ap(),z<y.length;++z)if(a===y[z])return!0
return!1},
hc:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gC(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.b(z.gA())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.d(b,-1)
v=b.pop()
if(0>=b.length)return H.d(b,-1)
u=b.pop()}else{t=z.gA();++x
if(!z.v()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.d(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gA();++x
for(;z.v();t=s,s=r){r=z.gA();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ah:function(a,b,c,d){return new P.fP(0,null,null,null,null,null,0,[d])},
cj:function(a){var z,y,x
z={}
if(P.bG(a))return"{...}"
y=new P.bw("")
try{$.$get$ap().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.F(0,new P.ez(z,y))
z=y
z.w=z.gw()+"}"}finally{z=$.$get$ap()
if(0>=z.length)return H.d(z,-1)
z.pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
d0:{"^":"I;a,b,c,d,e,f,r,$ti",
a8:function(a){return H.hI(a)&0x3ffffff},
a9:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbR()
if(x==null?b==null:x===b)return y}return-1},
m:{
al:function(a,b){return new P.d0(0,null,null,null,null,null,0,[a,b])}}},
fP:{"^":"fL;a,b,c,d,e,f,r,$ti",
gC:function(a){var z=new P.bC(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
d8:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cI(b)},
cI:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
bU:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.d8(0,a)?a:null
else return this.cQ(a)},
cQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return
return J.D(y,x).gbq()},
B:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bD()
this.b=z}return this.bl(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bD()
this.c=y}return this.bl(y,b)}else return this.H(b)},
H:function(a){var z,y,x
z=this.d
if(z==null){z=P.bD()
this.d=z}y=this.af(a)
x=z[y]
if(x==null)z[y]=[this.aD(a)]
else{if(this.ag(x,a)>=0)return!1
x.push(this.aD(a))}return!0},
ac:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bm(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bm(this.c,b)
else return this.cW(b)},
cW:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return!1
this.bn(y.splice(x,1)[0])
return!0},
a_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bl:function(a,b){if(a[b]!=null)return!1
a[b]=this.aD(b)
return!0},
bm:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bn(z)
delete a[b]
return!0},
aD:function(a){var z,y
z=new P.fQ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bn:function(a){var z,y
z=a.gcG()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
af:function(a){return J.E(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.O(a[y].gbq(),b))return y
return-1},
$ish:1,
$ash:null,
m:{
bD:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fQ:{"^":"a;bq:a<,b,cG:c<"},
bC:{"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.a2(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
fL:{"^":"eM;$ti"},
bl:{"^":"a;$ti",
gC:function(a){return new H.cf(a,this.gj(a),0,null)},
E:function(a,b){return this.h(a,b)},
a0:function(a,b){return new H.bp(a,b,[H.v(a,"bl",0),null])},
B:function(a,b){var z=this.gj(a)
this.sj(a,z+1)
if(z>=a.length)return H.d(a,z)
a[z]=b},
as:function(a){var z,y
if(this.gj(a)===0)throw H.c(H.aP())
z=a.length
y=z-1
if(y<0)return H.d(a,y)
this.sj(a,y)},
i:function(a){return P.aO(a,"[","]")},
$isi:1,
$asi:null,
$ish:1,
$ash:null},
h5:{"^":"a;",
u:function(a,b,c){throw H.c(new P.r("Cannot modify unmodifiable map"))}},
ex:{"^":"a;",
h:function(a,b){return this.a.h(0,b)},
u:function(a,b,c){this.a.u(0,b,c)},
gj:function(a){var z=this.a
return z.gj(z)},
i:function(a){return this.a.i(0)}},
f9:{"^":"ex+h5;a,$ti"},
ez:{"^":"f:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.b(a)
z.w=y+": "
z.w+=H.b(b)}},
ew:{"^":"ay;a,b,c,d,$ti",
gC:function(a){return new P.fR(this,this.c,this.d,this.b,null)},
gR:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
E:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.p(P.au(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.d(y,w)
return y[w]},
B:function(a,b){this.H(b)},
a_:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.d(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aO(this,"{","}")},
bW:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aP());++this.d
y=this.a
x=y.length
if(z>=x)return H.d(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
as:function(a){var z,y,x,w
z=this.b
y=this.c
if(z===y)throw H.c(H.aP());++this.d
z=this.a
x=z.length
y=(y-1&x-1)>>>0
this.c=y
if(y<0||y>=x)return H.d(z,y)
w=z[y]
z[y]=null
return w},
H:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.d(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bu();++this.d},
bu:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.q(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.bd(y,0,w,z,x)
C.a.bd(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cu:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.q(z,[b])},
$ash:null,
m:{
bm:function(a,b){var z=new P.ew(null,0,0,0,[b])
z.cu(a,b)
return z}}},
fR:{"^":"a;a,b,c,d,e",
gA:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.p(new P.a2(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.d(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
eN:{"^":"a;$ti",
a0:function(a,b){return new H.c4(this,b,[H.ad(this,0),null])},
i:function(a){return P.aO(this,"{","}")},
E:function(a,b){var z,y,x
for(z=new P.bC(this,this.r,null,null),z.c=this.e,y=0;z.v();){x=z.d
if(b===y)return x;++y}throw H.c(P.au(b,this,"index",null,y))},
$ish:1,
$ash:null},
eM:{"^":"eN;$ti"}}],["","",,P,{"^":"",
c6:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.P(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dV(a)},
dV:function(a){var z=J.m(a)
if(!!z.$isf)return z.i(a)
return H.aW(a)},
aN:function(a){return new P.fx(a)},
bn:function(a,b,c){var z,y
z=H.q([],[c])
for(y=J.bd(a);y.v();)z.push(y.gA())
return z},
ba:function(a){var z=H.b(a)
H.hJ(z)},
hn:{"^":"a;"},
"+bool":0,
bg:{"^":"a;a,b",
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.bg))return!1
return this.a===b.a&&this.b===b.b},
gq:function(a){var z=this.a
return(z^C.b.aS(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.dQ(z?H.x(this).getUTCFullYear()+0:H.x(this).getFullYear()+0)
x=P.at(z?H.x(this).getUTCMonth()+1:H.x(this).getMonth()+1)
w=P.at(z?H.x(this).getUTCDate()+0:H.x(this).getDate()+0)
v=P.at(z?H.x(this).getUTCHours()+0:H.x(this).getHours()+0)
u=P.at(z?H.x(this).getUTCMinutes()+0:H.x(this).getMinutes()+0)
t=P.at(z?H.x(this).getUTCSeconds()+0:H.x(this).getSeconds()+0)
s=P.dR(z?H.x(this).getUTCMilliseconds()+0:H.x(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
B:function(a,b){return P.dP(C.b.t(this.a,b.ge4()),this.b)},
gdL:function(){return this.a},
cr:function(a,b){var z=Math.abs(this.a)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)throw H.c(P.aI(this.gdL()))},
m:{
dP:function(a,b){var z=new P.bg(a,b)
z.cr(a,b)
return z},
dQ:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
dR:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
at:function(a){if(a>=10)return""+a
return"0"+a}}},
M:{"^":"aH;"},
"+double":0,
aL:{"^":"a;a",
t:function(a,b){return new P.aL(C.b.t(this.a,b.gaG()))},
T:function(a,b){return C.b.T(this.a,b.gaG())},
S:function(a,b){return C.b.S(this.a,b.gaG())},
ae:function(a,b){return C.b.ae(this.a,b.gaG())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.aL))return!1
return this.a===b.a},
gq:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.dU()
y=this.a
if(y<0)return"-"+new P.aL(-y).i(0)
x=z.$1(C.b.O(y,6e7)%60)
w=z.$1(C.b.O(y,1e6)%60)
v=new P.dT().$1(y%1e6)
return""+C.b.O(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
dT:{"^":"f:5;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dU:{"^":"f:5;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
w:{"^":"a;",
gN:function(){return H.y(this.$thrownJsError)}},
cq:{"^":"w;",
i:function(a){return"Throw of null."}},
a0:{"^":"w;a,b,n:c>,d",
gaI:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaH:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaI()+y+x
if(!this.a)return w
v=this.gaH()
u=P.c6(this.b)
return w+v+": "+H.b(u)},
m:{
aI:function(a){return new P.a0(!1,null,null,a)},
bU:function(a,b,c){return new P.a0(!0,a,b,c)}}},
bu:{"^":"a0;e,f,a,b,c,d",
gaI:function(){return"RangeError"},
gaH:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.S()
if(typeof z!=="number")return H.N(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
m:{
eE:function(a){return new P.bu(null,null,!1,null,null,a)},
aX:function(a,b,c){return new P.bu(null,null,!0,a,b,"Value not in range")},
ai:function(a,b,c,d,e){return new P.bu(b,c,!0,a,d,"Invalid value")},
cw:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.ai(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.ai(b,a,c,"end",f))
return b}}},
e9:{"^":"a0;e,j:f>,a,b,c,d",
gaI:function(){return"RangeError"},
gaH:function(){if(J.du(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
m:{
au:function(a,b,c,d,e){var z=e!=null?e:J.C(b)
return new P.e9(b,z,!0,a,c,"Index out of range")}}},
r:{"^":"w;a",
i:function(a){return"Unsupported operation: "+this.a}},
cR:{"^":"w;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
a5:{"^":"w;a",
i:function(a){return"Bad state: "+this.a}},
a2:{"^":"w;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.c6(z))+"."}},
eB:{"^":"a;",
i:function(a){return"Out of Memory"},
gN:function(){return},
$isw:1},
cA:{"^":"a;",
i:function(a){return"Stack Overflow"},
gN:function(){return},
$isw:1},
dO:{"^":"w;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
fx:{"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
dX:{"^":"a;a,b,c",
i:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
return y}},
dW:{"^":"a;n:a>,by",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.by
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.bU(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bt(b,"expando$values")
return y==null?null:H.bt(y,z)},
u:function(a,b,c){var z,y
z=this.by
if(typeof z!=="string")z.set(b,c)
else{y=H.bt(b,"expando$values")
if(y==null){y=new P.a()
H.cv(b,"expando$values",y)}H.cv(y,z,c)}}},
j:{"^":"aH;"},
"+int":0,
G:{"^":"a;$ti",
a0:function(a,b){return H.aV(this,b,H.v(this,"G",0),null)},
b8:function(a,b){return P.bn(this,!0,H.v(this,"G",0))},
b7:function(a){return this.b8(a,!0)},
gj:function(a){var z,y
z=this.gC(this)
for(y=0;z.v();)++y
return y},
E:function(a,b){var z,y,x
if(b<0)H.p(P.ai(b,0,null,"index",null))
for(z=this.gC(this),y=0;z.v();){x=z.gA()
if(b===y)return x;++y}throw H.c(P.au(b,this,"index",null,y))},
i:function(a){return P.ei(this,"(",")")}},
ek:{"^":"a;"},
i:{"^":"a;$ti",$asi:null,$ish:1,$ash:null},
"+List":0,
eA:{"^":"a;",
gq:function(a){return P.a.prototype.gq.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
aH:{"^":"a;"},
"+num":0,
a:{"^":";",
p:function(a,b){return this===b},
gq:function(a){return H.R(this)},
i:function(a){return H.aW(this)},
toString:function(){return this.i(this)}},
aD:{"^":"a;"},
T:{"^":"a;"},
"+String":0,
bw:{"^":"a;w<",
gj:function(a){return this.w.length},
i:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
m:{
cC:function(a,b,c){var z=J.bd(b)
if(!z.v())return a
if(c.length===0){do a+=H.b(z.gA())
while(z.v())}else{a+=H.b(z.gA())
for(;z.v();)a=a+c+H.b(z.gA())}return a}}}}],["","",,W,{"^":"",
a_:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d_:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
bH:function(a){var z=$.k
if(z===C.c)return a
return z.d4(a,!0)},
n:{"^":"c5;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLImageElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
hR:{"^":"n;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
hT:{"^":"n;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
dG:{"^":"e;","%":";Blob"},
hU:{"^":"n;",$ise:1,"%":"HTMLBodyElement"},
hV:{"^":"n;n:name=","%":"HTMLButtonElement"},
hW:{"^":"n;",
c6:function(a,b,c){return a.getContext(b)},
c5:function(a,b){return this.c6(a,b,null)},
"%":"HTMLCanvasElement"},
hX:{"^":"e;",
d6:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
"%":"CanvasRenderingContext2D"},
hY:{"^":"az;j:length=",$ise:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hZ:{"^":"az;",$ise:1,"%":"DocumentFragment|ShadowRoot"},
i_:{"^":"e;n:name=","%":"DOMError|FileError"},
i0:{"^":"e;",
gn:function(a){var z=a.name
if(P.c2()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.c2()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
i:function(a){return String(a)},
"%":"DOMException"},
dS:{"^":"e;",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gM(a))+" x "+H.b(this.gJ(a))},
p:function(a,b){var z
if(b==null)return!1
z=J.m(b)
if(!z.$isaA)return!1
return a.left===z.gaY(b)&&a.top===z.gb9(b)&&this.gM(a)===z.gM(b)&&this.gJ(a)===z.gJ(b)},
gq:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gM(a)
w=this.gJ(a)
return W.d_(W.a_(W.a_(W.a_(W.a_(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gJ:function(a){return a.height},
gaY:function(a){return a.left},
gb9:function(a){return a.top},
gM:function(a){return a.width},
gk:function(a){return a.x},
gl:function(a){return a.y},
$isaA:1,
$asaA:I.t,
"%":";DOMRectReadOnly"},
c5:{"^":"az;",
i:function(a){return a.localName},
bN:function(a){return a.focus()},
$ise:1,
"%":";Element"},
i1:{"^":"n;n:name=","%":"HTMLEmbedElement"},
i2:{"^":"aM;P:error=","%":"ErrorEvent"},
aM:{"^":"e;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
c7:{"^":"e;",
cC:function(a,b,c,d){return a.addEventListener(b,H.ac(c,1),!1)},
cX:function(a,b,c,d){return a.removeEventListener(b,H.ac(c,1),!1)},
"%":"CrossOriginServiceWorkerClient|MediaStream;EventTarget"},
im:{"^":"n;n:name=","%":"HTMLFieldSetElement"},
io:{"^":"dG;n:name=","%":"File"},
ir:{"^":"n;j:length=,n:name=","%":"HTMLFormElement"},
is:{"^":"n;n:name=","%":"HTMLIFrameElement"},
iu:{"^":"n;n:name=",$ise:1,"%":"HTMLInputElement"},
ce:{"^":"f7;",
gdC:function(a){return a.keyCode},
"%":"KeyboardEvent"},
ix:{"^":"n;n:name=","%":"HTMLKeygenElement"},
iy:{"^":"n;n:name=","%":"HTMLMapElement"},
iB:{"^":"n;P:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
iC:{"^":"n;n:name=","%":"HTMLMetaElement"},
iM:{"^":"e;",$ise:1,"%":"Navigator"},
iN:{"^":"e;n:name=","%":"NavigatorUserMediaError"},
az:{"^":"c7;",
i:function(a){var z=a.nodeValue
return z==null?this.ck(a):z},
"%":"Document|HTMLDocument|XMLDocument;Node"},
iO:{"^":"n;n:name=","%":"HTMLObjectElement"},
iP:{"^":"n;n:name=","%":"HTMLOutputElement"},
iQ:{"^":"n;n:name=","%":"HTMLParamElement"},
iU:{"^":"n;j:length=,n:name=","%":"HTMLSelectElement"},
iV:{"^":"aM;P:error=","%":"SpeechRecognitionError"},
iW:{"^":"aM;n:name=","%":"SpeechSynthesisEvent"},
iZ:{"^":"n;n:name=","%":"HTMLTextAreaElement"},
f7:{"^":"aM;","%":"CompositionEvent|DragEvent|FocusEvent|MouseEvent|PointerEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent;UIEvent"},
fc:{"^":"c7;n:name=",
bD:function(a,b){return a.requestAnimationFrame(H.ac(b,1))},
br:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ise:1,
"%":"DOMWindow|Window"},
j7:{"^":"az;n:name=","%":"Attr"},
j8:{"^":"e;J:height=,aY:left=,b9:top=,M:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isaA)return!1
y=a.left
x=z.gaY(b)
if(y==null?x==null:y===x){y=a.top
x=z.gb9(b)
if(y==null?x==null:y===x){y=a.width
x=z.gM(b)
if(y==null?x==null:y===x){y=a.height
z=z.gJ(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){var z,y,x,w
z=J.E(a.left)
y=J.E(a.top)
x=J.E(a.width)
w=J.E(a.height)
return W.d_(W.a_(W.a_(W.a_(W.a_(0,z),y),x),w))},
$isaA:1,
$asaA:I.t,
"%":"ClientRect"},
j9:{"^":"az;",$ise:1,"%":"DocumentType"},
ja:{"^":"dS;",
gJ:function(a){return a.height},
gM:function(a){return a.width},
gk:function(a){return a.x},
gl:function(a){return a.y},
"%":"DOMRect"},
jd:{"^":"n;",$ise:1,"%":"HTMLFrameSetElement"},
jb:{"^":"S;a,b,c,$ti",
K:function(a,b,c,d){return W.bz(this.a,this.b,a,!1,H.ad(this,0))},
aZ:function(a,b,c){return this.K(a,null,b,c)}},
fv:{"^":"cB;a,b,c,d,e,$ti",
Z:function(){if(this.b==null)return
this.bJ()
this.b=null
this.d=null
return},
ab:function(a,b){if(this.b==null)return;++this.a
this.bJ()},
b0:function(a){return this.ab(a,null)},
b2:function(){if(this.b==null||this.a<=0)return;--this.a
this.bH()},
bH:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dv(x,this.c,z,!1)}},
bJ:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dw(x,this.c,z,!1)}},
cw:function(a,b,c,d,e){this.bH()},
m:{
bz:function(a,b,c,d,e){var z=W.bH(new W.fw(c))
z=new W.fv(0,a,b,z,!1,[e])
z.cw(a,b,c,!1,e)
return z}}},
fw:{"^":"f:2;a",
$1:function(a){return this.a.$1(a)}}}],["","",,P,{"^":"",
c2:function(){var z=$.c1
if(z==null){z=$.c0
if(z==null){z=J.bS(window.navigator.userAgent,"Opera",0)
$.c0=z}z=z!==!0&&J.bS(window.navigator.userAgent,"WebKit",0)
$.c1=z}return z}}],["","",,P,{"^":""}],["","",,P,{"^":"",
cZ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fO:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
fN:{"^":"a;",
ar:function(a){if(a<=0||a>4294967296)throw H.c(P.eE("max must be in range 0 < max \u2264 2^32, was "+H.b(a)))
return Math.random()*a>>>0}},
Q:{"^":"a;k:a>,l:b>,$ti",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.Q))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gq:function(a){var z,y
z=J.E(this.a)
y=J.E(this.b)
return P.fO(P.cZ(P.cZ(0,z),y))},
t:function(a,b){var z,y,x
z=this.a
y=J.u(b)
x=y.gk(b)
if(typeof z!=="number")return z.t()
x=C.h.t(z,x)
z=this.b
y=y.gl(b)
if(typeof z!=="number")return z.t()
return new P.Q(x,C.h.t(z,y),this.$ti)}}}],["","",,P,{"^":"",hQ:{"^":"a3;",$ise:1,"%":"SVGAElement"},hS:{"^":"l;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},i3:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEBlendElement"},i4:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEColorMatrixElement"},i5:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEComponentTransferElement"},i6:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFECompositeElement"},i7:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEConvolveMatrixElement"},i8:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEDiffuseLightingElement"},i9:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEDisplacementMapElement"},ia:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEFloodElement"},ib:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEGaussianBlurElement"},ic:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEImageElement"},id:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEMergeElement"},ie:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEMorphologyElement"},ig:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFEOffsetElement"},ih:{"^":"l;k:x=,l:y=","%":"SVGFEPointLightElement"},ii:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFESpecularLightingElement"},ij:{"^":"l;k:x=,l:y=","%":"SVGFESpotLightElement"},ik:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFETileElement"},il:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFETurbulenceElement"},ip:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGFilterElement"},iq:{"^":"a3;k:x=,l:y=","%":"SVGForeignObjectElement"},e1:{"^":"a3;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},a3:{"^":"l;",$ise:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},it:{"^":"a3;k:x=,l:y=",$ise:1,"%":"SVGImageElement"},iz:{"^":"l;",$ise:1,"%":"SVGMarkerElement"},iA:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGMaskElement"},iR:{"^":"l;k:x=,l:y=",$ise:1,"%":"SVGPatternElement"},iS:{"^":"e1;k:x=,l:y=","%":"SVGRectElement"},iT:{"^":"l;",$ise:1,"%":"SVGScriptElement"},l:{"^":"c5;",
bN:function(a){return a.focus()},
$ise:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},iX:{"^":"a3;k:x=,l:y=",$ise:1,"%":"SVGSVGElement"},iY:{"^":"l;",$ise:1,"%":"SVGSymbolElement"},cE:{"^":"a3;","%":";SVGTextContentElement"},j_:{"^":"cE;",$ise:1,"%":"SVGTextPathElement"},j0:{"^":"cE;k:x=,l:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},j1:{"^":"a3;k:x=,l:y=",$ise:1,"%":"SVGUseElement"},j2:{"^":"l;",$ise:1,"%":"SVGViewElement"},jc:{"^":"l;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},je:{"^":"l;",$ise:1,"%":"SVGCursorElement"},jf:{"^":"l;",$ise:1,"%":"SVGFEDropShadowElement"},jg:{"^":"l;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,S,{"^":"",bZ:{"^":"a;",
gq:function(a){return 65536*C.b.b6(this.a)+256*C.b.b6(this.b)+C.b.b6(this.c)},
p:function(a,b){var z
if(b==null)return!1
z=J.m(b)
return!!z.$isbZ&&this.gq(this)===z.gq(b)},
h:function(a,b){return P.a4(["r",this.a,"g",this.b,"b",this.c]).h(0,b)}},aB:{"^":"bZ;a,b,c",
i:function(a){return"r: "+this.a+", g: "+this.b+", b: "+this.c}}}],["","",,N,{"^":"",bo:{"^":"a;n:a>,b,c,cE:d>,e,f",
gbO:function(){var z,y,x
z=this.b
y=z==null||J.O(J.dA(z),"")
x=this.a
return y?x:z.gbO()+"."+x},
gaa:function(){if($.b7){var z=this.c
if(z!=null)return z
z=this.b
if(z!=null)return z.gaa()}return $.d4},
saa:function(a){if($.b7&&this.b!=null)this.c=a
else{if(this.b!=null)throw H.c(new P.r('Please set "hierarchicalLoggingEnabled" to true if you want to change the level on a non-root logger.'))
$.d4=a}},
gdN:function(){return this.bt()},
dI:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gaa().b){if(!!J.m(b).$isbh)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.P(b)}else v=null
if(d==null&&x>=$.hK.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.b(b)
throw H.c(x)}catch(u){x=H.B(u)
z=x
y=H.y(u)
d=y
if(c==null)c=z}e=$.k
x=b
w=this.gbO()
t=c
s=d
r=Date.now()
q=$.cg
$.cg=q+1
p=new N.aS(a,x,v,w,new P.bg(r,!1),q,t,s,e)
if($.b7)for(o=this;o!=null;){o.bA(p)
o=o.b}else $.$get$aU().bA(p)}},
dH:function(a,b,c,d){return this.dI(a,b,c,d,null)},
du:function(a,b,c){return this.dH(C.n,a,b,c)},
bS:function(a){return this.du(a,null,null)},
bt:function(){if($.b7||this.b==null){var z=this.f
if(z==null){z=new P.d2(null,null,0,null,null,null,null,[N.aS])
this.f=z}z.toString
return new P.fj(z,[H.ad(z,0)])}else return $.$get$aU().bt()},
bA:function(a){var z=this.f
if(z!=null){if(!z.gai())H.p(z.ax())
z.a5(a)}},
m:{
aT:function(a){return $.$get$ch().dR(a,new N.hp(a))}}},hp:{"^":"f:0;a",
$0:function(){var z,y,x,w
z=this.a
if(C.d.ci(z,"."))H.p(P.aI("name shouldn't start with a '.'"))
y=C.d.dE(z,".")
if(y===-1)x=z!==""?N.aT(""):null
else{x=N.aT(C.d.bf(z,0,y))
z=C.d.be(z,y+1)}w=new H.I(0,null,null,null,null,null,0,[P.T,N.bo])
w=new N.bo(z,x,null,w,new P.f9(w,[null,null]),null)
if(x!=null)J.dz(x).u(0,z,w)
return w}},aR:{"^":"a;n:a>,ba:b>",
p:function(a,b){if(b==null)return!1
return b instanceof N.aR&&this.b===b.b},
T:function(a,b){return C.b.T(this.b,C.b.gba(b))},
S:function(a,b){return C.b.S(this.b,C.b.gba(b))},
ae:function(a,b){return this.b>=J.dB(b)},
gq:function(a){return this.b},
i:function(a){return this.a}},aS:{"^":"a;aa:a<,b,c,dJ:d<,c0:e<,f,P:r>,N:x<,y",
i:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,D,{"^":"",
jl:[function(){var z,y
z=$.$get$aU()
z.saa(C.E)
z.gdN().dG(new D.hG())
y=document.querySelector("#tetris")
if(y!=null){z=J.u(y)
z.bN(y)
z=new D.dY(y,z.c5(y,"2d"),0,null)
y.focus()
z.d=D.e_(y.width,y.height)
P.bQ(z.gdV())}},"$0","df",0,0,1],
fa:function(a,b,c){var z,y,x,w,v,u
z=C.b.d_(a&b,c)
if(z===0)return[0,0,0,0]
for(y=1;y<z;)y*=2
for(x=!1,w="";y>=1;){v=z-y
if(v>=0){w+=x?"|1":"1"
z=v
x=!0}else if(x)w+="|0"
y=C.b.O(y,2)}for(u=w.length;u<7;u+=2)w="0|"+w
return D.fb(w.split("|"))},
fb:function(a){var z,y,x
z=H.q([],[P.j])
for(y=0;y<a.length;++y){z.push(0)
if(y>=a.length)return H.d(a,y)
x=H.eD(a[y],null,null)
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
hG:{"^":"f:12;",
$1:function(a){P.ba("["+H.b(a.gc0())+"]["+a.gdJ()+"] "+a.a.a+": "+H.b(a.b))}},
dY:{"^":"a;a,b,c,d",
a1:[function(){var z=window
C.i.br(z)
C.i.bD(z,W.bH(this.gbs()))},"$0","gdV",0,0,1],
e0:[function(a){var z,y,x
z=Date.now()
y=this.c
x=y!==0?(z-y)/1000:0
this.c=z
this.d.d.c2(x)
z=this.b
y=this.d
J.dy(z,0,0,y.a,y.b)
y.d.bX(z)
z=window
C.i.br(z)
C.i.bD(z,W.bH(this.gbs()))},"$1","gbs",2,0,13]},
dZ:{"^":"a;a,b,c,d,e",
av:function(a){var z=this.c.length
if(z>0&&a<z){z=this.d
if(z!=null)z.dO()
z=this.c
if(a>=z.length)return H.d(z,a)
z=z[a]
this.d=z
z.b_()
$.$get$bO().bS("Changed state to "+J.P(this.d))}},
cs:function(a,b){var z,y,x
z=H.q([],[D.Y])
z.push(new D.Y([3840,8738,240,17476]))
z.push(new D.Y([17600,36352,25664,3616]))
z.push(new D.Y([17504,3712,50240,11776]))
z.push(new D.Y([52224,52224,52224,52224]))
z.push(new D.Y([1728,35904,27648,17952]))
z.push(new D.Y([3648,19520,19968,17984]))
z.push(new D.Y([3168,19584,50688,9792]))
this.e=new D.eO(z)
z=H.q([],[D.bv])
this.c=z
y=new D.eT(this,null)
x=[P.cB]
y.b=H.q([],x)
z.push(y)
y=this.c
z=new D.eR(null,null,null,!1,0,0,this,null)
z.b=H.q([],x)
z.c=D.e3()
x=this.a
if(typeof x!=="number")return x.cp()
z.d=C.b.O(x,10)
x=this.b
if(typeof x!=="number")return x.cp()
z.e=C.b.O(x,16)
y.push(z)
this.av(0)
this.av(1)},
m:{
e_:function(a,b){var z=new D.dZ(a,b,null,null,null)
z.cs(a,b)
return z}}},
bv:{"^":"a;",
dO:function(){C.a.F(this.b,new D.eQ())
C.a.sj(this.b,0)},
b_:["bg",function(){}]},
eQ:{"^":"f:2;",
$1:function(a){return a.Z()}},
eT:{"^":"bv;a,b",
b_:function(){this.bg()
this.b.push(W.bz(window,"keydown",new D.eU(this),!1,W.ce))},
c2:function(a){},
bX:function(a){}},
eU:{"^":"f:2;a",
$1:function(a){if(J.bT(a)===32)this.a.a.av(1)}},
eR:{"^":"bv;c,d,e,f,r,x,a,b",
c2:function(a){var z
if(this.f){z=this.r+=a
if(z>1){this.r=0
if(this.c.ap(0,1)===C.f){if(this.c.d5()===C.q)this.sau(this.x+100)
this.bV()}}}},
bX:function(a){var z,y,x,w,v,u,t,s
a.fillStyle="rgba(0, 0, 0, 1)"
for(z=0;z<10;++z)for(y=0;y<16;++y){x=this.c.a.a
if(z>=x.length)return H.d(x,z)
w=J.D(x[z],y)
x=this.d
v=2+z*x
u=this.e
t=2+y*u
x-=4
u-=4
if(x<0)x=-x*0
if(u<0)u=-u*0
if(w==null){a.fillStyle="rgba(220, 220, 220, 1)"
a.fillRect(v,t,x,u)}else{s=D.cF(w).a
a.fillStyle="rgba("+s.a+", "+s.b+", "+s.c+", 1)"
a.fillRect(v,t,x,u)}}},
bV:function(){var z=this.c.dM(this.a.e)
if(z===C.e){this.f=!1
$.$get$bO().bS("GAME ENDED")}else if(z===C.f)this.sau(this.x+10)},
b_:function(){this.bg()
this.b.push(W.bz(window,"keydown",new D.eS(this),!1,W.ce))
this.f=!0
this.bV()
this.sau(0)},
sau:function(a){this.x=a
document.querySelector("#score").textContent=C.d.dP(C.b.i(a),3,"0")},
gc0:function(){return this.r}},
eS:{"^":"f:2;a",
$1:function(a){var z,y,x
z=J.bT(a)===65||a.keyCode===37?this.a.c.ap(-1,0):C.e
y=a.keyCode
if(y===68||y===39)z=this.a.c.ap(1,0)
y=a.keyCode
if(y===83||y===40)z=this.a.c.ap(0,1)
y=a.keyCode
if(y===87||y===38)z=this.a.c.dU()
if(z!==C.e){a.preventDefault()
if(z===C.p){y=this.a
x=y.r
if(x<0.5)y.r=0.8
else y.r=x+0.25}}}},
aC:{"^":"a;a",
i:function(a){return C.G.h(0,this.a)}},
e2:{"^":"a;a,b,c,d",
dM:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
this.b=null
y=$.$get$ca()
x=a.di(y.ar(a.a.length))
this.c=x
w=D.cF(y.ar($.$get$J().length))
v=$.$get$J()
u=(v&&C.a).ds(v,w)
t=3+y.ar(4)
y=y.ar(4)
this.d=y
s=x.bc(y)
r=H.q([],[P.Q])
z.a=!1
C.a.F(r,new D.e6(z,this))
if(z.a)return C.e
for(z=[null],q=0;q<4;++q)for(y=t+q,p=0;p<4;++p){w=s.a
if(q>=w.length)return H.d(w,q)
if(J.bR(J.D(w[q],p),0)){w=this.a.a
if(y>>>0!==y||y>=w.length)return H.d(w,y)
J.U(w[y],p,u)
r.push(new P.Q(y,p,z))}}this.b=new D.eP(new P.Q(t,0,z),r)
return C.f},
d5:function(){var z,y,x,w
for(z=0;z<16;++z){for(y=!0,x=0;x<10;++x){w=this.a.a
if(x>=w.length)return H.d(w,x)
if(J.D(w[x],z)==null)y=!1}if(y){this.dh(z)
return C.q}}return},
dU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.d+1
if(z>=4)z=0
y=this.c.bc(z)
x=this.b
w=x.b
v=x.a
for(x=v.a,u=v.b,t=!1,s=0;s<y.a.length;++s){r=0
while(!0){q=J.C(C.a.gI(y.a))
if(typeof q!=="number")return H.N(q)
if(!(r<q))break
c$1:{q={}
if(typeof u!=="number")return u.t()
p=u+r
if(p>=16)t=!0
if(typeof x!=="number")return x.t()
o=x+s
if(o<0||o>=10)t=!0
if(!t){n=this.a.a
if(o>>>0!==o||o>=n.length)return H.d(n,o)
if(J.D(n[o],p)!=null){q.a=!1
C.a.F(w,new D.e7(q,v,s,r))
if(q.a)break c$1
t=!0}else t=!1}}++r}}if(t)return C.e
this.d=z
m=C.a.gI(this.b.b)
q=m.a
p=this.a.a
if(q>>>0!==q||q>=p.length)return H.d(p,q)
l=J.D(p[q],m.b)
C.a.F(this.b.b,new D.e8(this))
for(q=[null],k=0,s=0;s<y.a.length;++s){r=0
while(!0){p=J.C(C.a.gI(y.a))
if(typeof p!=="number")return H.N(p)
if(!(r<p))break
p=y.a
if(s>=p.length)return H.d(p,s)
if(J.bR(J.D(p[s],r),0)){p=this.a
if(typeof x!=="number")return x.t()
o=x+s
p=p.a
if(o>>>0!==o||o>=p.length)return H.d(p,o)
p=p[o]
if(typeof u!=="number")return u.t()
n=u+r
J.U(p,n,l)
p=this.b.b
j=k+1
if(k<0||k>=p.length)return H.d(p,k)
p[k]=new P.Q(o,n,q)
k=j}++r}}return C.H},
ap:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b.b
for(y=[null],x=!1,w=!1,v=0;v<z.length;++v){u={}
t=z[v]
s=t.a
if(typeof s!=="number")return s.t()
s+=a
r=t.b
if(typeof r!=="number")return r.t()
r+=b
if(r>=16){x=!0
w=!0}if(s<0||s>=10)x=!0
if(!x){q=this.a.a
if(s>>>0!==s||s>=q.length)return H.d(q,s)
if(J.D(q[s],r)!=null){u.a=!1
C.a.F(z,new D.e4(u,new P.Q(s,r,y)))
if(u.a)continue
x=!0
w=!0}else x=!1}if(x)break}if(x){if(w)return C.f
return C.e}p=C.a.gI(z)
u=p.a
s=this.a.a
if(u>>>0!==u||u>=s.length)return H.d(s,u)
o=J.D(s[u],p.b)
C.a.F(z,new D.e5(this))
for(v=0;v<z.length;++v){t=z[v]
u=t.a
if(typeof u!=="number")return u.t()
u+=a
s=t.b
if(typeof s!=="number")return s.t()
s+=b
r=this.a.a
if(u>>>0!==u||u>=r.length)return H.d(r,u)
J.U(r[u],s,o)
if(v>=z.length)return H.d(z,v)
z[v]=new P.Q(u,s,y)}u=this.b
u.b=z
n=u.a
s=n.a
if(typeof s!=="number")return s.t()
r=n.b
if(typeof r!=="number")return r.t()
u.a=new P.Q(s+a,r+b,y)
if(w)return C.f
else return C.p},
dh:function(a){var z,y,x,w,v
for(z=0;z<10;++z){y=this.a.a
if(z>=y.length)return H.d(y,z)
J.U(y[z],a,null)}for(x=a-1,z=0;z<10;++z)for(w=x;w>=0;--w){y=this.a.a
if(z>=y.length)return H.d(y,z)
y=y[z]
v=J.A(y)
v.u(y,w+1,v.h(y,w))
y=this.a.a
if(z>=y.length)return H.d(y,z)
J.U(y[z],w,null)}},
ct:function(){this.a=D.bV(10,16,null,P.j)
$.$get$J().push(new D.aj(new S.aB(255,0,0)))
$.$get$J().push(new D.aj(new S.aB(255,255,0)))
$.$get$J().push(new D.aj(new S.aB(0,255,0)))
$.$get$J().push(new D.aj(new S.aB(0,0,255)))
$.$get$J().push(new D.aj(new S.aB(255,0,255)))},
m:{
e3:function(){var z=new D.e2(null,null,null,0)
z.ct()
return z}}},
e6:{"^":"f:2;a,b",
$1:function(a){var z,y,x
z=this.b.a
y=J.u(a)
x=y.gk(a)
z=z.a
if(x>>>0!==x||x>=z.length)return H.d(z,x)
if(J.D(z[x],y.gl(a))!=null)this.a.a=!0}},
e7:{"^":"f:2;a,b,c,d",
$1:function(a){var z,y,x,w
z=J.u(a)
y=z.gk(a)
x=this.b
w=x.a
if(typeof w!=="number")return w.t()
if(y===w+this.c){z=z.gl(a)
x=x.b
if(typeof x!=="number")return x.t()
x=z===x+this.d
z=x}else z=!1
if(z)this.a.a=!0}},
e8:{"^":"f:2;a",
$1:function(a){var z,y,x
z=this.a.a
y=J.u(a)
x=y.gk(a)
z=z.a
if(x>>>0!==x||x>=z.length)return H.d(z,x)
J.U(z[x],y.gl(a),null)
return}},
e4:{"^":"f:2;a,b",
$1:function(a){var z,y,x,w
z=J.u(a)
y=z.gk(a)
x=this.b
w=x.a
if(y==null?w==null:y===w){z=z.gl(a)
x=x.b
x=z==null?x==null:z===x
z=x}else z=!1
if(z)this.a.a=!0}},
e5:{"^":"f:2;a",
$1:function(a){var z,y,x
z=this.a.a
y=J.u(a)
x=y.gk(a)
z=z.a
if(x>>>0!==x||x>=z.length)return H.d(z,x)
J.U(z[x],y.gl(a),null)
return}},
aj:{"^":"a;a",m:{
cF:function(a){var z=J.bK(a)
if(z.T(a,0)||z.ae(a,$.$get$J().length))return
z=$.$get$J()
if(a>>>0!==a||a>=z.length)return H.d(z,a)
return z[a]}}},
eO:{"^":"a;a",
di:function(a){var z
if(a<0||a>=this.a.length)return
z=this.a
if(a>>>0!==a||a>=z.length)return H.d(z,a)
return z[a]}},
Y:{"^":"a;a",
bc:function(a){var z,y,x,w,v,u
z=D.bV(4,4,0,P.j)
for(y=this.a,x=0;x<4;++x){if(a>>>0!==a||a>=4)return H.d(y,a)
w=D.fa(y[a],$.$get$cy()[x],$.$get$cz()[x])
for(v=0;v<4;++v){u=z.a
if(v>=u.length)return H.d(u,v)
u=u[v]
if(v>=w.length)return H.d(w,v)
J.U(u,x,w[v])}}return z}},
eP:{"^":"a;a,b"},
dE:{"^":"a;a,b,$ti",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
sM:function(a,b){var z,y,x,w,v
for(;z=this.a,z.length>b;)z.pop()
for(z=this.$ti,y=this.b;this.a.length<b;){x=H.q([],z)
if(this.a.length>0){w=0
while(!0){v=J.C(C.a.gI(this.a))
if(typeof v!=="number")return H.N(v)
if(!(w<v))break
x.push(y);++w}}this.a.push(x)}},
sJ:function(a,b){var z,y,x
while(!0){z=J.C(C.a.gI(this.a))
if(typeof z!=="number")return z.S()
if(!(z>b))break
for(y=0;z=this.a,y<z.length;++y)J.dD(z[y])}z=this.b
while(!0){x=J.C(C.a.gI(this.a))
if(typeof x!=="number")return x.T()
if(!(x<b))break
for(y=0;x=this.a,y<x.length;++y)J.dx(x[y],z)}},
i:function(a){var z,y,x,w
z=""
y=0
while(!0){x=J.C(C.a.gI(this.a))
if(typeof x!=="number")return H.N(x)
if(!(y<x))break
for(w=0;x=this.a,w<x.length;++w)z+="|"+H.b(J.bc(x[w],y))
z+="|\n";++y}return z},
cq:function(a,b,c,d){this.a=H.q([],[[P.i,d]])
this.sM(0,a)
this.sJ(0,b)},
m:{
bV:function(a,b,c,d){var z=new D.dE(null,c,[d])
z.cq(a,b,c,d)
return z}}}},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cd.prototype
return J.em.prototype}if(typeof a=="string")return J.aQ.prototype
if(a==null)return J.en.prototype
if(typeof a=="boolean")return J.el.prototype
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.A=function(a){if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.aq=function(a){if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.bK=function(a){if(typeof a=="number")return J.aw.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.b0.prototype
return a}
J.hr=function(a){if(typeof a=="number")return J.aw.prototype
if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.b0.prototype
return a}
J.u=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.ar=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hr(a).t(a,b)}
J.O=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).p(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bK(a).S(a,b)}
J.du=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bK(a).T(a,b)}
J.D=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.dk(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).h(a,b)}
J.U=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.dk(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aq(a).u(a,b,c)}
J.dv=function(a,b,c,d){return J.u(a).cC(a,b,c,d)}
J.dw=function(a,b,c,d){return J.u(a).cX(a,b,c,d)}
J.dx=function(a,b){return J.aq(a).B(a,b)}
J.dy=function(a,b,c,d,e){return J.u(a).d6(a,b,c,d,e)}
J.bS=function(a,b,c){return J.A(a).d9(a,b,c)}
J.bc=function(a,b){return J.aq(a).E(a,b)}
J.dz=function(a){return J.u(a).gcE(a)}
J.as=function(a){return J.u(a).gP(a)}
J.E=function(a){return J.m(a).gq(a)}
J.bd=function(a){return J.aq(a).gC(a)}
J.bT=function(a){return J.u(a).gdC(a)}
J.C=function(a){return J.A(a).gj(a)}
J.dA=function(a){return J.u(a).gn(a)}
J.dB=function(a){return J.u(a).gba(a)}
J.dC=function(a,b){return J.aq(a).a0(a,b)}
J.dD=function(a){return J.aq(a).as(a)}
J.P=function(a){return J.m(a).i(a)}
var $=I.p
C.w=J.e.prototype
C.a=J.av.prototype
C.b=J.cd.prototype
C.h=J.aw.prototype
C.d=J.aQ.prototype
C.D=J.ax.prototype
C.o=J.eC.prototype
C.j=J.b0.prototype
C.i=W.fc.prototype
C.r=new H.c3()
C.t=new P.eB()
C.u=new P.fp()
C.v=new P.fN()
C.c=new P.fZ()
C.k=new P.aL(0)
C.x=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.y=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.l=function(hooks) { return hooks; }

C.z=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.A=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.B=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.C=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.m=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.E=new N.aR("ALL",0)
C.n=new N.aR("INFO",800)
C.F=new N.aR("OFF",2000)
C.G=new H.e0([0,"ShapeResult.FAILED",1,"ShapeResult.SPAWN",2,"ShapeResult.ROTATED",3,"ShapeResult.MOVED",4,"ShapeResult.ROW"],[null,null])
C.e=new D.aC(0)
C.f=new D.aC(1)
C.H=new D.aC(2)
C.p=new D.aC(3)
C.q=new D.aC(4)
$.cs="$cachedFunction"
$.ct="$cachedInvocation"
$.F=0
$.af=null
$.bW=null
$.bM=null
$.da=null
$.dp=null
$.b5=null
$.b8=null
$.bN=null
$.a8=null
$.am=null
$.an=null
$.bF=!1
$.k=C.c
$.c8=0
$.c0=null
$.c1=null
$.b7=!1
$.hK=C.F
$.d4=C.n
$.cg=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["c_","$get$c_",function(){return H.dh("_$dart_dartClosure")},"bi","$get$bi",function(){return H.dh("_$dart_js")},"cb","$get$cb",function(){return H.eg()},"cc","$get$cc",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.c8
$.c8=z+1
z="expando$key$"+z}return new P.dW(null,z)},"cG","$get$cG",function(){return H.K(H.b_({
toString:function(){return"$receiver$"}}))},"cH","$get$cH",function(){return H.K(H.b_({$method$:null,
toString:function(){return"$receiver$"}}))},"cI","$get$cI",function(){return H.K(H.b_(null))},"cJ","$get$cJ",function(){return H.K(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cN","$get$cN",function(){return H.K(H.b_(void 0))},"cO","$get$cO",function(){return H.K(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cL","$get$cL",function(){return H.K(H.cM(null))},"cK","$get$cK",function(){return H.K(function(){try{null.$method$}catch(z){return z.message}}())},"cQ","$get$cQ",function(){return H.K(H.cM(void 0))},"cP","$get$cP",function(){return H.K(function(){try{(void 0).$method$}catch(z){return z.message}}())},"by","$get$by",function(){return P.fe()},"ag","$get$ag",function(){var z=new P.Z(0,P.fd(),null,[null])
z.cA(null,null)
return z},"ap","$get$ap",function(){return[]},"aU","$get$aU",function(){return N.aT("")},"ch","$get$ch",function(){return P.eu(P.T,N.bo)},"bO","$get$bO",function(){return N.aT("Dartris")},"ca","$get$ca",function(){return C.v},"J","$get$J",function(){return H.q([],[D.aj])},"cy","$get$cy",function(){return[61440,3840,240,15]},"cz","$get$cz",function(){return[12,8,4,0]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.aD]},{func:1,ret:P.T,args:[P.j]},{func:1,args:[,P.T]},{func:1,args:[P.T]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.aD]},{func:1,args:[,,]},{func:1,args:[N.aS]},{func:1,v:true,args:[P.M]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.hO(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.t=a.t
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dq(D.df(),b)},[])
else (function(b){H.dq(D.df(),b)})([])})})()