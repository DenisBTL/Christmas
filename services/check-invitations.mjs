import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
const { default: worker } = await import(process.argv[2] || "./replies-relay.mjs");
const database = new DatabaseSync(":memory:");
for(const file of readdirSync(new URL("../drizzle/",import.meta.url)).filter(name=>name.endsWith(".sql")).sort())database.exec(readFileSync(new URL("../drizzle/"+file,import.meta.url),"utf8"));
const DB={prepare(sql){return{async all(){return{results:database.prepare(sql).all()}},bind(...args){return{async run(){return database.prepare(sql).run(...args)}}}}}};
const secret="a".repeat(64),env={DB,ORGANIZER_KEY:secret},origin="https://denisbtl.github.io";
function request(path,body,{method="POST",key,source=origin}={}){return new Request("https://replies.test"+path,{method,headers:{Origin:source,...(key?{Authorization:"Bearer "+key}:{}),...(body!==undefined?{"Content-Type":"application/json"}:{})},...(body!==undefined?{body:typeof body==="string"?body:JSON.stringify(body)}:{})});}
async function call(path,body,options){return worker.fetch(request(path,body,options),env);}
const payload={guestId:"marie",token:"a6ac4de1-9b0b-4de1-8a3e-1694b9235067",attendance:"both",films:["Klaus","The Holiday"],allergyStatus:"yes",allergyDetail:"Arachides, traces à éviter",note:"Arrivée à 15h30"};
assert.equal((await call("/api/invitations",payload,{source:"https://evil.test"})).status,403);
assert.equal((await call("/api/invitations",undefined,{method:"GET"})).status,405);
assert.equal((await call("/api/invitations","x".repeat(8193))).status,413);
assert.equal((await call("/api/invitations","broken")).status,400);
assert.equal((await call("/api/invitations",{...payload,guestId:"laura"})).status,400);
assert.equal((await call("/api/invitations",{...payload,allergyDetail:""})).status,400);
assert.equal((await call("/api/invitations",{...payload,films:Array(9).fill("Klaus")})).status,400);
assert.equal((await call("/api/invitations",{...payload,token:"bad"})).status,400);
assert.equal((await call("/api/invitations",payload)).status,200);
assert.equal((await call("/api/invitations",{...payload,note:"Nouveau petit mot",date:"2026-12-22"})).status,200);
assert.equal(database.prepare("SELECT count(*) AS n FROM invitation_responses").get().n,1);
assert.equal((await call("/api/invitations",{...payload,token:"b6ac4de1-9b0b-4de1-8a3e-1694b9235067",allergyDetail:"Effacement"})).status,409);
assert.equal(database.prepare("SELECT allergy_detail FROM invitation_responses").get().allergy_detail,payload.allergyDetail);
assert.equal((await call("/api/organizer",undefined)).status,401);
assert.equal((await call("/api/organizer",undefined,{key:"b".repeat(64)})).status,401);
assert.equal((await call("/api/organizer",undefined,{method:"GET",key:secret})).status,405);
const response=await call("/api/organizer",undefined,{key:secret}),data=await response.json();
assert.equal(response.headers.get("Cache-Control"),"no-store");assert.equal(response.headers.get("Access-Control-Allow-Origin"),origin);
assert.equal(data.guests.length,8);assert.equal(data.guests.filter(guest=>guest.date==="2026-12-12").length,4);assert.equal(data.guests.filter(guest=>guest.date==="2026-12-22").length,4);
assert.equal(data.guests[0].date,"2026-12-12");assert.equal(data.guests[0].allergyDetail,payload.allergyDetail);assert.equal(data.guests[0].note,"Nouveau petit mot");
assert.equal(JSON.stringify(data).includes(payload.token),false);
const publicResponse=await(await call("/api/replies",undefined,{method:"GET"})).json();assert.equal(JSON.stringify(publicResponse).includes("Arachides"),false);assert.equal(JSON.stringify(publicResponse).includes("Klaus"),false);
const preflight=await call("/api/organizer",undefined,{method:"OPTIONS"});assert.equal(preflight.status,204);assert.match(preflight.headers.get("Access-Control-Allow-Headers"),/Authorization/);
const clear=await call("/api/invitations",{...payload,allergyStatus:"none",allergyDetail:"old sensitive value",films:[]});assert.equal(clear.status,200);assert.equal(database.prepare("SELECT allergy_detail FROM invitation_responses").get().allergy_detail,"");
database.close();
console.log("PASS: invitations persist in SQLite; canonical dates; owner-only recap; no public dietary data; device-token updates; conflict protection; validation; CORS.");

