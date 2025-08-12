import constructure from "../utility/constructure";
import { RequestFunction } from "../utility/function";

export async function FetchMenu() {
  let url = constructure.url;
  return RequestFunction(`${url}/menu`, );
}

export async function FetchAbout() {
  let url = constructure.url;
  return RequestFunction(`${url}/about`, );
}

export async function FetchAsset(typeasset:string) {
  let url = constructure.url;
  return RequestFunction(`${url}/asset/${typeasset}`, );
}

export async function FetchContact() {
  let url = constructure.url;
  return RequestFunction(`${url}/contact`, );
}

export async function FetchAssetDetail(id: Number) {
  let url = constructure.url;
  return RequestFunction(`${url}/asset/detail/${id}`, );
}